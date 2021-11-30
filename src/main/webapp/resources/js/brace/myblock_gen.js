
Blockly.JavaScript['start'] = function (block) {
  // TODO: Assemble JavaScript into code variable.

  var code = "\n";
  return code;
};

Blockly.JavaScript['go'] = function (block) {

  var code = "block_forward()\n";
  return code;
};

Blockly.JavaScript['left'] = function (block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'block_leftForward()\n';
  return code;
};

Blockly.JavaScript['right'] = function (block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'block_rightForward()\n';
  return code;
};
Blockly.JavaScript['stay'] = function (block) {

  var code = "block_stay()\n";
  return code;
};

Blockly.JavaScript['repeat'] = function (block) {
  var number_for = block.getFieldValue('for');
  var statements_nextblock = Blockly.JavaScript.statementToCode(block, 'nextblock');
  var code = '\n';
  for (var i = 0; i < number_for; i++) {
    code += statements_nextblock;
  }

  return code;
};

Blockly.JavaScript['if'] = function (block) {
  var dropdown_flag = block.getFieldValue('flag');
  var statements_nextblock = Blockly.JavaScript.statementToCode(block, 'nextblock');

  var code = '\n';
  if (block_frontOfCar(3)) {
    if (block_isRedLight() && (dropdown_flag == 'red')) {
      code += statements_nextblock;
    }
    else if ((!block_isRedLight()) && (dropdown_flag == 'green')) {
      code += statements_nextblock;
    }
    else code = '\n';
  }
  else {
    alert("앞에 신호등이 존재하지 않습니다.");
  }
  return code;
};

var highlightPause = false;

function highlightBlock(id) {
  workspace.highlightBlock(id);
  highlightPause = true;
}
function nextStep() {
  if (myInterpreter.step()) {
    setTimeout(nextStep, 10);
  }
}


var myInterpreter = null;
function interpret() {

  Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
  var code = Blockly.JavaScript.workspaceToCode(workspace);
  myInterpreter = new Interpreter(code, initApi);
  Blockly.JavaScript.addReservedWords('highlightBlock');

  console.log(myInterpreter);
  myInterpreter.run();
}

function initApi(interpreter, scope) {

  var wrapper = function (id) {
    id = id ? id.toString() : '';

    return workspace.highlightBlock(id);
    //return interpreter.createPrimitive(highlightBlock(id));
  };
  interpreter.setProperty(scope, 'highlightBlock',
    interpreter.createNativeFunction(wrapper));
  wrapper = function (id) {
    block_forward()
    nextStep();
  };
  //nextStep();
  interpreter.setProperty(scope, 'block_forward',
    interpreter.createNativeFunction(wrapper));
  wrapper = function (id) {
    block_leftForward();
    // alert("좌회전");
  };
  interpreter.setProperty(scope, 'block_leftForward',
    interpreter.createNativeFunction(wrapper));
  wrapper = function (id) {
    block_rightForward();
  };
  interpreter.setProperty(scope, 'block_rightForward',
    interpreter.createNativeFunction(wrapper));
}
