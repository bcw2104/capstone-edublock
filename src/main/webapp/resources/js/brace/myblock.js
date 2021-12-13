Blockly.Blocks['start'] = {
	init: function() {
		this.appendDummyInput()
			.appendField("시작 버튼을 누르면");
		this.setNextStatement(true, null);
		this.setColour(75);
		this.setTooltip("시작 버튼 누를 시");
		this.setHelpUrl("Blockly-demo");
	}
};

Blockly.Blocks['go'] = {
	init: function() {
		this.appendDummyInput()
			.appendField("앞으로 가기");
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(105);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};

Blockly.Blocks['left'] = {
	init: function() {
		this.appendDummyInput()
			.appendField("좌회전 하기");
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(180);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};

Blockly.Blocks['right'] = {
	init: function() {
		this.appendDummyInput()
			.appendField("우회전 하기");
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(225);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};
Blockly.Blocks['stay'] = {
	init: function() {
		this.appendDummyInput()
			.appendField("대기 하기");
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(105);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};

Blockly.Blocks['repeat'] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldNumber(0, 1, 6), "for")
			.appendField(new Blockly.FieldLabelSerializable("번 반복하기"), "반복");
		this.appendStatementInput("nextblock")
			.setCheck(null)
			.appendField(new Blockly.FieldLabelSerializable(""), "next");
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, "3");
		this.setColour(180);
		this.setTooltip("반복문");
		this.setHelpUrl("Blockly-demo");
	}
};

Blockly.Blocks['if'] = {
	init: function() {
		this.appendDummyInput()
			.setAlign(Blockly.ALIGN_RIGHT)
			.appendField("만약 신호등이 ")
			.appendField(new Blockly.FieldDropdown([["빨간색", "red"], ["초록색", "green"], ["", ""]]), "flag")
			.appendField("이라면");
		this.appendStatementInput("nextblock")
			.setCheck(null)
			.appendField(new Blockly.FieldLabelSerializable(""), "next");
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(105);
		this.setTooltip("");
		this.setHelpUrl("");
	}
}

Blockly.Blocks['honk'] = {
	init: function() {
		this.appendDummyInput()
			.appendField("경적 울리기");
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(140);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};
Blockly.Themes.jys = Blockly.Theme.defineTheme('jys', {
	'base': Blockly.Themes.Classic,
	'blockStyles': {
		'list_blocks': {
			'colourPrimary': "#4a148c",
			'colourSecondary': "#AD7BE9",
			'colourTertiary': "#CDB6E9",
		},
		'logic_blocks': {
			'colourPrimary': "#8b4513",
			'colourSecondary': "#ff0000",
			'colourTertiary': "#C5EAFF"
		},
		'loop_blocks': {
			'colourPrimary': "#85E21F",
			'colourSecondary': "#ff0000",
			'colourTertiary': "#C5EAFF"
		},
		'text_blocks': {
			'colourPrimary': "#FE9B13",
			'colourSecondary': "#ff0000",
			'colourTertiary': "#C5EAFF"
		},
	},
	'componentStyles': {
		'workspaceBackgroundColour': '#E0E0E0',
		'toolboxBackgroundColour': '#F9C10E',
		'toolboxForegroundColour': '#fff',
		'flyoutBackgroundColour': '#C0C0C0',
		'flyoutForegroundColour': '#E0E0E0',
		'flyoutOpacity': 1,
		'scrollbarColour': '#ff0000',
		'insertionMarkerColour': '#fff',
		'insertionMarkerOpacity': 0.3,
		'scrollbarOpacity': 0.4,
		'cursorColour': '#d0d0d0',
		'blackBackground': '#333'
	}
});

