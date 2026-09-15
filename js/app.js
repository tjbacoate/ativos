(() => {
  "use strict";

  const reports = window.RELATORIOS_ATIVOS || {};
  const $ = (selector) => document.querySelector(selector);
  const formatNumber = new Intl.NumberFormat("pt-BR");
  const formatPercent = (value) => `${value.toFixed(1).replace(".", ",")}%`;
  const normalize = (value) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  let currentReport = null;

  function sum(values) { return values.reduce((total, value) => total + Number(value || 0), 0); }

  function validateReport(report) {
    const warnings = [];
    const stockSum = sum(report.estoque.itens.map((item) => item.quantidade));
    const statusSum = sum(report.garantias.status.map((item) => item.quantidade));
    const citySum = sum(Object.values(report.atendimentos.comarcas));
    if (stockSum !== report.estoque.total) warnings.push(`estoque: ${stockSum} ≠ ${report.estoque.total}`);
    report.estoque.itens.forEach((item) => {
      const modelSum = sum(Object.values(item.modelos || {}));
      if (modelSum !== item.quantidade) warnings.push(`${item.nome}: ${modelSum} ≠ ${item.quantidade}`);
    });
    if (statusSum !== report.garantias.total) warnings.push(`garantias: ${statusSum} ≠ ${report.garantias.total}`);
    if (citySum !== report.atendimentos.total) warnings.push(`atendimentos: ${citySum} ≠ ${report.atendimentos.total}`);
    return warnings;
  }

  function renderKpis(report) {
    const overdue = report.garantias.status.find((item) => normalize(item.nome).includes("fora"))?.quantidade || 0;
    const onTime = report.garantias.status.find((item) => normalize(item.nome).includes("dentro"))?.quantidade || 0;
    const compliance = onTime / report.garantias.total * 100;
    const cities = Object.keys(report.atendimentos.comarcas).length;
    const cards = [
      ["Itens em estoque", report.estoque.total, "posição consolidada"],
      ["Chamados de garantia", report.garantias.total, `${formatPercent(compliance)} dentro do prazo`],
      ["Atendimentos realizados", report.atendimentos.total, `${cities} comarcas atendidas`],
      ["Garantias fora do prazo", overdue, `${formatPercent(overdue / report.garantias.total * 100)} do volume`]
    ];
    $("#kpis").innerHTML = cards.map(([label, value, note]) => `
      <article class="kpi-card"><span>${label}</span><strong>${formatNumber.format(value)}</strong><small>${note}</small></article>
    `).join("");
  }

  function renderStock(report) {
    const items = [...report.estoque.itens].sort((a, b) => b.quantidade - a.quantidade);
    const major = items.slice(0, 5);
    const minor = items.slice(5);
    $("#stock-total").textContent = `${formatNumber.format(report.estoque.total)} itens`;
    $("#stock-bars").innerHTML = major.map((item) => {
      const percentage = item.quantidade / report.estoque.total * 100;
      return `<div class="bar-item">
        <div class="bar-item__head"><span>${item.nome}</span><span>${formatNumber.format(item.quantidade)} · ${formatPercent(percentage)}</span></div>
        <div class="bar-track"><div class="bar-fill" style="width:${percentage}%"></div></div>
      </div>`;
    }).join("");
    $("#stock-minor").innerHTML = minor.map((item) => `<div class="minor-item"><span>${item.nome}</span><strong>${formatNumber.format(item.quantidade)}</strong></div>`).join("");

    const topTwo = items[0].quantidade + items[1].quantidade;
    $("#stock-insight").textContent = `${items[0].nome} e ${items[1].nome} concentram ${formatPercent(topTwo / report.estoque.total * 100)} do estoque registrado.`;
    $("#stock-detail").innerHTML = items.filter((item) => Object.keys(item.modelos || {}).length > 1).slice(0, 4).map((item) => `
      <div class="detail-group"><strong>${item.nome}</strong><ul>${Object.entries(item.modelos).map(([name, quantity]) => `<li><span>${name}</span><b>${formatNumber.format(quantity)}</b></li>`).join("")}</ul></div>
    `).join("");
  }

  function renderWarranty(report) {
    const warranty = report.garantias;
    $("#warranty-total").textContent = `${formatNumber.format(warranty.total)} chamados`;
    $("#donut-total").textContent = formatNumber.format(warranty.total);
    let cursor = 0;
    const slices = warranty.status.map((item) => {
      const start = cursor;
      cursor += item.quantidade / warranty.total * 100;
      return `${item.cor} ${start}% ${cursor}%`;
    });
    $("#status-donut").style.background = `conic-gradient(${slices.join(",")})`;
    $("#status-list").innerHTML = warranty.status.map((item) => `
      <div class="status-item"><i class="status-dot" style="background:${item.cor}"></i><span>${item.nome}</span><strong>${formatNumber.format(item.quantidade)} · ${formatPercent(item.quantidade / warranty.total * 100)}</strong></div>
    `).join("");
    const maxFailure = Math.max(...warranty.falhasConsolidadas.map((item) => item.quantidade));
    $("#failures").innerHTML = warranty.falhasConsolidadas.map((item) => `
      <div class="failure-item"><span>${item.nome}</span><div class="failure-track"><div class="failure-fill" style="width:${item.quantidade / maxFailure * 100}%"></div></div><strong>${item.quantidade}</strong></div>
    `).join("") + `<p class="table-note">${warranty.observacao}</p>`;
    $("#supplier-strip").innerHTML = Object.entries(warranty.fornecedores).map(([name, quantity]) => `<span class="supplier-pill">${name}: <strong>${quantity}</strong> (${formatPercent(quantity / warranty.total * 100)})</span>`).join("");
  }

  function renderCities(report, query = "") {
    const cities = Object.entries(report.atendimentos.comarcas).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "pt-BR"));
    const filtered = cities.filter(([name]) => normalize(name).includes(normalize(query.trim())));
    const max = cities[0]?.[1] || 1;
    $("#service-total").textContent = `${formatNumber.format(report.atendimentos.total)} atendimentos`;
    $("#top-cities").innerHTML = cities.slice(0, 4).map(([name, quantity]) => `<div class="top-city"><span>${name}</span><strong>${quantity}</strong></div>`).join("");
    $("#cities-table").innerHTML = filtered.map(([name, quantity]) => `<tr>
      <td><strong>${name}</strong></td><td>${formatNumber.format(quantity)}</td><td>${formatPercent(quantity / report.atendimentos.total * 100)}</td>
      <td><div class="cell-bar"><span style="width:${quantity / max * 100}%"></span></div></td>
    </tr>`).join("");
    $("#city-count").textContent = `${filtered.length} de ${cities.length} comarcas exibidas`;
  }

  function renderReport(key) {
    currentReport = reports[key];
    if (!currentReport) return;
    const warnings = validateReport(currentReport);
    $("#report-meta").textContent = `Competência ${currentReport.competencia} · Atualização ${currentReport.atualizadoEm}${warnings.length ? " · Revisar consistência dos dados" : " · Dados conciliados"}`;
    $("#update-note").textContent = `Atualizado em ${currentReport.atualizadoEm}${currentReport.atualizadoPor ? ` por ${currentReport.atualizadoPor}` : ""}.`;
    renderKpis(currentReport);
    renderStock(currentReport);
    renderWarranty(currentReport);
    renderCities(currentReport, $("#city-search").value);
    document.title = `Relatório de Ativos · ${currentReport.competencia}`;
  }

  const select = $("#competencia");
  Object.entries(reports).sort(([a], [b]) => b.localeCompare(a)).forEach(([key, report]) => {
    select.add(new Option(report.competencia, key));
  });
  select.addEventListener("change", () => renderReport(select.value));
  $("#city-search").addEventListener("input", (event) => renderCities(currentReport, event.target.value));
  $("#print-report").addEventListener("click", () => window.print());
  if (select.options.length) renderReport(select.value);
})();
