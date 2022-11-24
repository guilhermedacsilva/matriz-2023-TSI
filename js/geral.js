$(() => {
	aplicarListeners();
	recalcularDisciplinas();
});

function aplicarListeners() {
	$('.tabela-antiga td').click(evento => {
		let td = evento.target;
		$(td).toggleClass('selecionado');
		recalcularDisciplinas();
	});
	$('.tabela-antiga th').click(evento => {
		let th = evento.target;
		$(th).siblings().addClass('selecionado');
		recalcularDisciplinas();
	});
	$('button.distancia').click(mostrarDisciplinasRemotas);
	$('button.limpar').click(zerarMatrizAntiga);
}

function recalcularDisciplinas() {
	zerarNovaMatriz();
	aplicarEquivalencias();
	gerarLegendas()
}

function zerarNovaMatriz() {
	$('.tabela-nova td').removeClass('selecionado');
}

function aplicarEquivalencias() {
	$('.tabela-antiga .selecionado').each((i, td) => {
		let novasDisciplinas = equivalencias[$(td).attr('name')];
		novasDisciplinas.forEach(novaDisciplina => {
			$(`.tabela-nova [name='${novaDisciplina}']`).addClass('selecionado');
		});
	});
}

function gerarLegendas() {
	let qnt = 0;
	let cargaHorariaTotal = 0;
	let cargaHorariaDistancia = 0;
	$('.tabela-antiga td').each((i, td) => {
		if (!$(td).hasClass('selecionado')) {
			qnt++;
			cargaHorariaTotal += parseInt($(td).attr('data-cht'));
			cargaHorariaDistancia += parseInt($(td).attr('data-chd'));
		}
	});
	let cargaHorariaPresencial = cargaHorariaTotal - cargaHorariaDistancia;
	$('.legenda-matriz-antiga').text(`Faltam ${qnt} disciplinas, ${cargaHorariaPresencial} horas presenciais e ${cargaHorariaDistancia} horas a distância para terminar o curso na antiga matriz.`);

	qnt = 0;
	cargaHorariaTotal = 0;
	cargaHorariaDistancia = 0;
	$('.tabela-nova td').each((i, td) => {
		if (!$(td).hasClass('selecionado')) {
			qnt++;
			cargaHorariaTotal += parseInt($(td).attr('data-cht'));
			cargaHorariaDistancia += parseInt($(td).attr('data-chd'));
		}
	});
	cargaHorariaPresencial = cargaHorariaTotal - cargaHorariaDistancia;
	$('.legenda-matriz-nova').text(`Faltam ${qnt} disciplinas, ${cargaHorariaPresencial} horas presenciais e ${cargaHorariaDistancia} horas a distância para terminar o curso na nova matriz.`);
}

function mostrarDisciplinasRemotas() {
	if ($('button').hasClass('ativo')) {
		$('button').removeClass('ativo');
		$('.tabela-nova td').removeClass(['disciplina-distancia','disciplina-distancia-total']);
	} else {
		$('button').addClass('ativo');
		$('.tabela-nova td').each((i, e) => {
			let td = $(e);
			if (td.attr('data-chd') != '0') {
				let porcentagem = parseInt(td.attr('data-chd')) / parseInt(td.attr('data-cht'));
				if (porcentagem < 0.51) {
					//td.css('background-color', '#d2ffbf');
					td.addClass('disciplina-distancia');
				} else {
					//td.css('background-color', '#4cff00');
					td.addClass('disciplina-distancia-total');
				}
			}
		});
	}
}

function zerarMatrizAntiga() {
	$('.tabela-antiga td').removeClass('selecionado');
	recalcularDisciplinas();
}

equivalencias = {
	DW1: ['DPWHC'],
	PCLP: ['PCLPV', 'FP'],
	IOO: ['PCLPV', 'FP'],
	IOAC: ['FSC'],
	CL: ['CL'],
	DW2: ['DPWFC'],
	ED1: ['POO'],
	LOO: ['POO'],
	BD1: ['BDR'],
	FMC: [],
	DW3: ['DAB'],
	BD2: ['BDN'],
	APOO: ['PS'],
	SO: ['FSC'],
	IHC: [],
	DG: [],
	DW4: ['DABF'],
	ED2: ['RP'],
	ES: ['PS'],
	RCCD: ['FSW'],
	GQ: [],
	MP: [],
	DW5: ['ASW'],
	PDM: ['PDM', 'DPDM'],
	PP: ['POO'],
	RCI: ['DOW', 'DON'],
	EAI: ['EMP'],
	TCC1: ['TCC1'],
	OE: ['TE'],
	SD: ['CN'],
	PN: ['GS'],
	GP: ['GS'],
	IS: ['IS'],
	TCC2: ['TCC2']
};