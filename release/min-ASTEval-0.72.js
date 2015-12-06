(function(){var e={},t=function(){!function(e){e.on=function(e,t){return this._ev||(this._ev={}),this._ev[e]||(this._ev[e]=[]),this._ev[e].push(t),this},e.removeListener=function(e,t){if(this._ev&&this._ev[e])for(var r=this._ev[e],i=0;i<r.length;i++)if(r[i]==t)return void r.splice(i,1)},e.trigger=function(e,t,r){if(this._ev&&this._ev[e]){return this._ev[e].forEach(function(e){e(t,r)}),this}}}(this),function(e){var t,i,a,n,s;e.ArrayExpression=function(e,t){var r=this;if(e.elements&&e.elements.length>=0){this.out("[");var i=0;e.elements.forEach(function(e){i++>0&&r.out(","),r.trigger("ArrayElement",e),r.walk(e,t)}),this.out("]"),e.eval_res=[],e.elements.forEach(function(i){var a=i.eval_res||r.evalVariable(i,t);e.eval_res.push(a)})}},e.ArrayPattern=function(e,t){var r=this;if(e.elements&&e.elements.length>0){this.out("[");var i=0;e.elements.forEach(function(e){i++>0&&r.out(","),r.trigger("ArrayElement",e),r.walk(e,t)}),this.out("]")}},e.ArrowExpression=function(){},e.ArrowFunctionExpression=function(e,t){var i=this,a=this.findThis(t);e.eval_res=function(){if(!i.isKilled()){var n=[],s=arguments.length,o=arguments,l={functions:{},vars:{},variables:{},parentCtx:t};l["this"]=a;for(var h=new r,u=0;s>u;u++)n[u]=arguments[u];var u=0;return e.params.forEach(function(r){"undefined"!=typeof o[u]?l.variables[r.name]=o[u]:e.defaults&&e.defaults[u]&&(i.walk(e.defaults[u],t),l.variables[r.name]=e.defaults[u].eval_res),u++}),h.startWalk(e.body,l),e.expression&&(l.return_value=e.body.eval_res),l.return_value}},e.id&&e.id.name&&(t.variables[e.id.name]=e.eval_res)},e.AssignmentExpression=function(e,t){function r(e,t,r){if("MemberExpression"==e.type){var i,a;return i="undefined"!=typeof e.object.eval_res?e.object.eval_res:l.evalVariable(e.object,t),a=e.computed?"undefined"!=typeof e.property.eval_res?l.evalVariable(e.property.eval_res,t):l.evalVariable(e.property.name,t):e.property.name,void(i&&a&&(i[a]=n(r)))}l.assignTo(e.name,t,r)}this.trigger("AssigmentLeft",e.left),this.walk(e.left,t),this.out(" "+e.operator+" "),this.trigger("AssigmentRight",e.right),this.walk(e.right,t);var i=e.right.eval_res;a(i)||(i=this.evalVariable(e.right,t));var o=e.left.eval_res;a(o)||(o=this.evalVariable(e.left,t)),i=s(i),o=s(o);var l=this;"="==e.operator&&r(e.left,t,i),"+="==e.operator&&r(e.left,t,o+i),"-="==e.operator&&r(e.left,t,o-i),"*="==e.operator&&r(e.left,t,o*i),"/="==e.operator&&r(e.left,t,o/i),"%="==e.operator&&r(e.left,t,o%i),"**="==e.operator&&r(e.left,t,Math.pow(o,i)),"<<="==e.operator&&r(e.left,t,o<<i),">>="==e.operator&&r(e.left,t,o>>i),">>>="==e.operator&&r(e.left,t,o>>>i),"&="==e.operator&&r(e.left,t,o&i),"^="==e.operator&&r(e.left,t,o^i),"|="==e.operator&&r(e.left,t,o|i)},e.assignTo=function(e,t,r){var i;if("object"==typeof e){var s=e;"Identifier"==s.type&&(i=s.name),"Literal"==s.type&&(i=s.value)}else i=e;this.findAndSetLet(i,t,r)||(a(t.variables[i])?t.variables[i]=n(r):t.parentCtx&&this.assignTo(i,t.parentCtx,r))},e.BinaryExpression=function(e,t){this.walk(e.left,t),this.walk(e.right,t);var r=e.left.eval_res,i=e.right.eval_res;a(r)||(r=this.evalVariable(e.left,t)),a(i)||(i=this.evalVariable(e.right,t)),r=s(r),i=s(i),"+"==e.operator&&(e.eval_res=r+i),"-"==e.operator&&(e.eval_res=r-i),"*"==e.operator&&(e.eval_res=r*i),"/"==e.operator&&(e.eval_res=r/i),"<"==e.operator&&(e.eval_res=i>r),"<="==e.operator&&(e.eval_res=i>=r),">"==e.operator&&(e.eval_res=r>i),">="==e.operator&&(e.eval_res=r>=i),"&"==e.operator&&(e.eval_res=r&i),"|"==e.operator&&(e.eval_res=r|i),"<<"==e.operator&&(e.eval_res=r<<i),">>"==e.operator&&(e.eval_res=r>>i),">>>"==e.operator&&(e.eval_res=r>>>i),"=="==e.operator&&(e.eval_res=r==i),"!="==e.operator&&(e.eval_res=r!=i),"==="==e.operator&&(e.eval_res=r===i),"!=="==e.operator&&(e.eval_res=r!==i),"%"==e.operator&&(e.eval_res=r%i)},e.BlockStatement=function(e,t){for(var r={block:!0,functions:{},vars:{},letVars:{},constVars:{},parentCtx:t},i=t;i&&i.block;)i=i.parentCtx;Object.defineProperty(r,"variables",{enumerable:!0,configurable:!0,writable:!0,value:i.variables}),this.out(" {",!0),this.indent(1),this.walk(e.body,r,!0),this.indent(-1),this.out("}")},e.BreakStatement=function(e,t){throw this.nlIfNot(),this.out("break "),e.label&&this.walk(e.label,t),this.out("",!0),{type:"break"}},e.breakWalk=function(){this._breakWalk=!0},e.CallExpression=function(e,r){if(e.callee){if("FunctionExpression"==e.callee.type&&this.out("("),this.walk(e.callee,r),"FunctionExpression"==e.callee.type&&this.out(")"),this.out("("),e.arguments){var i=this,a=0;e.arguments.forEach(function(e){a++>0&&i.out(", "),i.walk(e,r)})}this.out(")");var i=this;if(!t(e.callee.eval_res)){var n=[],o=e.callee.eval_res;e.arguments&&e.arguments.forEach(function(e){n.push("undefined"!=typeof e.eval_res?s(e.eval_res):s(i.evalVariable(e,r)))});var l=r["this"];"MemberExpression"==e.callee.type&&(this.walk(e.callee,r),l=e.callee.object.eval_res),"ThisExpression"==e.callee.type&&r.parentCtx&&(l=r.parentCtx["this"]),"function"==typeof o&&(e.eval_res=o.apply(l,n))}}},e.CatchClause=function(e,t){this.out(" catch "),e.param&&(this.out("("),this.walk(e.param,t),this.out(")")),e.body&&this.walk(e.body,t)},e.ClassBody=function(e,t){this.out("{",!0),this.indent(1),this.walk(e.body,t),this.indent(-1),this.out("}",!0)},e.ClassDeclaration=function(e,t){this.out("class "),e.id&&(this.walk(e.id,t),this.out(" ")),e.superClass&&(this.trigger("Extends",e.superClass),this.out(" extends "),this.walk(e.superClass,t)),e.body&&this.walk(e.body,t)},e.ConditionalExpression=function(e,t){this.walk(e.test,t),e.test.eval_res?this.walk(e.consequent,t):this.walk(e.alternate,t)},e.continueAfterBreak=function(){var e=this._breakState;e&&this._break&&(this._break=!1,this._path=[],this.walk(e.node,e.ctx))},e.ContinueStatement=function(){throw{type:"continue"}},e.createContext=function(e,t){for(var r={functions:{},vars:{},parentCtx:e,block:t},i=e;i&&i.block;)i=i.parentCtx;return t?Object.defineProperty(r,"variables",{enumerable:!0,configurable:!0,writable:!0,value:i.variables}):r.variables={},r},e.DebuggerStatement=function(e){throw this.nlIfNot(),this.out("debugger;"),{msg:"debugger",node:e}},e.DoWhileStatement=function(e,t){var r=1e6;do{if(e.body&&this.walk(e.body,t),r--,!e.test)break;if(this.walk(e.test,t),!e.test.eval_res)break}while(r>0)},e.EmptyStatement=function(){},e.endBlock=function(){this.out("}",!0),this.indent(-1)},e.endCollecting=function(){this._collecting=!1},e.evalVariable=function(e,r){var i;if("object"==typeof e){if(e.eval_res)return e.eval_res;var n=e;"Identifier"==n.type&&(i=n.name),"Literal"==n.type&&(i=n.value)}else i=e;var s=this.findLetVar(i,r);if(a(s))return t(s)?void 0:s;var o=this.findConstVar(i,r);return a(o)?t(o)?void 0:o:a(r.variables[i])?t(r.variables[i])?void 0:r.variables[i]:r.parentCtx?this.evalVariable(i,r.parentCtx):window[i]},e.ExpressionStatement=function(e,t){this.nlIfNot(),this.walk(e.expression,t),this.out(";",!0),e.eval_res=e.expression.eval_res},e.findAndSetLet=function(e,t,r){return t.letVars&&a(t.letVars[e])?(t.letVars[e]=n(r),!0):t.parentCtx?this.findAndSetLet(e,t.parentCtx,r):void 0},e.findConstVar=function(e,t){return t.constVars&&a(t.constVars[e])?t.constVars[e]:t.parentCtx?this.findConstVar(e,t.parentCtx):void 0},e.findLetVar=function(e,t){return t.letVars&&a(t.letVars[e])?t.letVars[e]:t.parentCtx?this.findLetVar(e,t.parentCtx):void 0},e.findThis=function(e){return e["this"]?e["this"]:e.parentCtx?this.findThis(e.parentCtx):window},e.ForInStatement=function(e,t){var r=this.createContext(t,!0);if(e.left&&(this.walk(e.left,r),e.right)){this.walk(e.right,r);var i,a,n,s=e.right.eval_res;if("VariableDeclaration"==e.left.type?(a=e.left.declarations[0],n=a.kind,i=a.name||a.id.name):i="Identifier"==e.left.type?e.name:e.left.eval_res,i&&s)for(var o in s)try{a?this.assignTo(i,r,o):this.assignTo(i,r,o),this.walk(e.body,r)}catch(l){if(l&&"continue"==l.type)continue;if(l&&"break"==l.type)break;throw l}}},e.ForOfStatement=function(e,t){var r=this.createContext(t,!0);if(e.left&&(this.walk(e.left,r),e.right)){this.walk(e.right,r);var i,a,n,s=e.right.eval_res;if("VariableDeclaration"==e.left.type?(a=e.left.declarations[0],n=a.kind,i=a.name||a.id.name):i="Identifier"==e.left.type?e.name:e.left.eval_res,i&&s){var o=this;s.every(function(t){try{return a?o.assignTo(i,r,t):o.assignTo(i,r,t),o.walk(e.body,r),!0}catch(n){if(n&&"continue"==n.type)return!0;if(n&&"break"==n.type)return!1;throw n}})}}},e.ForStatement=function(e,t){var r=this.createContext(t,!0);e.init&&this.walk(e.init,r);for(var i=1e6;i>0;)try{if(!e.test)break;if(this.walk(e.test,r),!e.test.eval_res)break;e.body&&this.walk(e.body,r),e.update&&this.walk(e.update,r),i--}catch(a){if(a&&"continue"==a.type)continue;if(a&&"break"==a.type)break;throw a}},e.FunctionDeclaration=function(e,t){var i=this;e.eval_res=function(){if(!i.isKilled()){var a=[],n=arguments.length,s=arguments,o={functions:{},vars:{},variables:{},parentCtx:t};o["this"]=this;for(var l=new r,h=0;n>h;h++)a[h]=arguments[h];var h=0;return e.params.forEach(function(r){"undefined"!=typeof s[h]?o.variables[r.name]=s[h]:e.defaults&&e.defaults[h]&&(i.walk(e.defaults[h],t),o.variables[r.name]=e.defaults[h].eval_res),h++}),l.startWalk(e.body,o),o.return_value}},e.id&&e.id.name&&(t.variables[e.id.name]=e.eval_res)},e.FunctionExpression=function(e,t){var i=this;e.eval_res=function(){if(!i.isKilled()){var a=[],n=arguments.length,s=arguments,o={functions:{},vars:{},variables:{},parentCtx:t};o["this"]=this;for(var l=new r,h=0;n>h;h++)a[h]=arguments[h];var h=0;return e.params.forEach(function(r){"undefined"!=typeof s[h]?o.variables[r.name]=s[h]:e.defaults&&e.defaults[h]&&(i.walk(e.defaults[h],t),o.variables[r.name]=e.defaults[h].eval_res),h++}),l.startWalk(e.body,o),o.return_value}},e.id&&e.id.name&&(t.variables[e.id.name]=e.eval_res)},e.getCode=function(){return this._codeStr},e.getParentProcess=function(){return this._parentProcess},e.getStructures=function(){return this._structures},e.handleException=function(e){for(var t=this._path.length-1;t>=0;t--){var r=this._path[t];if("TryStatement"==r.type){var i=r,a=r._exceptionHandlerCtx;if(a.variables[i.handler.param.name]=e,i.handler)try{this.walk(i.handler.body,a)}catch(e){}i.finalizer&&this.walk(i.finalizer,a);break}}},e.Identifier=function(e,t){return"undefined"==e.name?void(e.eval_res=i):void(e.eval_res=this.evalVariable(e.name,t))},e.IfStatement=function(e,t){this.walk(e.test,t),e.test.eval_res?this.walk(e.consequent,t):this.walk(e.alternate,t)},e.indent=function(e){this._indent+=e,this._indent<0&&(this._indent=0)},e.__traitInit&&!e.hasOwnProperty("__traitInit")&&(e.__traitInit=e.__traitInit.slice()),e.__traitInit||(e.__traitInit=[]),e.__traitInit.push(function(e){this._structures=[],this._tabChar="  ",this._codeStr="",this._currentLine="",this._indent=0,this._options=e||{},t||(i={},t=function(e){return e===i||"undefined"==typeof e},a=function(e){return"undefined"!=typeof e},n=function(e){return e===i?e:void 0===e?i:"undefined"==typeof e?i:e},s=function(e){return e===i?void 0:e})}),e.isKilled=function(){if(this._isKilled)return!0;var e=this.getParentProcess();return e?e.isKilled():void 0},e.isPaused=function(){if(this._isPaused)return!0;var e=this.getParentProcess();return e?e.isPaused():void 0},e.kill=function(){this._isKilled=!0},e.LabeledStatement=function(e,t){this.nlIfNot(),this.walk(e.label,t),this.out(":",!0),this.indent(1),e.body&&this.walk(e.body,t),this.indent(-1)},e.listify=function(e,t){if(e){e._parent=t;for(var r in e)if(e.hasOwnProperty(r)){if("_next"==r)continue;if("_prev"==r)continue;if("_parent"==r)continue;if("range"==r)continue;if("comments"==r)continue;var i=e[r];if(i instanceof Array)for(var a=0;a<i.length;a++){var n=i[a];"object"==typeof n&&(a<i.length-1&&(n._next=i[a+1]),a>0&&(n._prev=i[a-1]),this.listify(n,e))}else"object"==typeof i&&this.listify(i,e)}}},e.Literal=function(e){this.out(e.raw),e.eval_res=e.value,e.eval_type=typeof e.value},e.LogicalExpression=function(e,t){this.walk(e.left,t),this.walk(e.right,t);var r=e.left.eval_res,i=e.right.eval_res;a(r)||(r=this.evalVariable(e.left,t)),a(i)||(i=this.evalVariable(e.right,t)),r=s(r),i=s(i),"&&"==e.operator&&(e.eval_res=r&&i),"||"==e.operator&&(e.eval_res=r||i)},e.MemberExpression=function(e,r){this.walk(e.object,r),e.computed?this.walk(e.property,r):this.walk(e.property,r);var i;i="ThisExpression"==e.object.type?this.findThis(r):this.evalVariable(e.object,r),e.object.eval_res=i;var a;if(e.computed?("Literal"==e.property.type&&(a=e.property.value),"Identifier"==e.property.type&&(a=e.property.name),"undefined"==typeof a&&(a=this.evalVariable(e.property,r))):a=e.property.name,!t(i))try{e.eval_res=i[a]}catch(n){}},e.MethodDefinition=function(e,t){e.key&&(this.__insideMethod=!0,"constructor"==e.kind&&this.trigger("ClassConstructor",e),e.static&&this.out("static "),this.walk(e.key,t),this.walk(e.value,t),this.out("",!0),this.__insideMethod=!1)},e.NewExpression=function(e,r){if(e.arguments){var i=this,a=0;e.arguments.forEach(function(e){a++>0&&i.out(", "),i.walk(e,r)})}if(e.callee&&(this.walk(e.callee,r),!t(e.callee.eval_res))){var n=[];if(e.arguments){var o=e.callee.eval_res;e.arguments.forEach(function(e){n.push("undefined"!=typeof e.eval_res?s(e.eval_res):s(i.evalVariable(e,r)))});var l;0==n.length&&(l=new o),1==n.length&&(l=new o(n[0])),2==n.length&&(l=new o(n[0],n[1])),3==n.length&&(l=new o(n[0],n[1],n[2])),4==n.length&&(l=new o(n[0],n[1],n[2],n[3])),5==n.length&&(l=new o(n[0],n[1],n[2],n[3],n[4])),6==n.length&&(l=new o(n[0],n[1],n[2],n[3],n[4],n[5])),e.eval_res=l}}},e.nlIfNot=function(){var e=this._currentLine.length;e>0&&("{"==this._currentLine[e-1]||";"==this._currentLine[e-1]?this.out("",!0):this.out(";",!0))},e.ObjectExpression=function(e,t){var r=this;try{r.out("{");var i=0;e&&e.properties&&(e.properties.length>1&&r.out("",!0),r.indent(1),e.properties.forEach(function(e){i++>0&&r.out(",",!0),r.trigger("ObjectExpressionProperty",e),r.walk(e,t)}),r.indent(-1)),r.out("}"),e.eval_res={},e.properties&&e.properties.forEach(function(i){var a=i.value.eval_res||r.evalVariable(i.value,t),n=i.key.eval_res;"undefined"==typeof n&&(n=r.evalVariable(i.key,t)),e.eval_res[n]=a})}catch(a){console.error(a.message)}},e.ObjectPattern=function(e,t){var r=this;try{r.out("{");var i=0;e&&e.properties&&e.properties.forEach(function(e){i++>0&&r.out(","),r.trigger("ObjectExpressionProperty",e),r.walk(e,t)}),r.out("}")}catch(a){console.error(a.message)}},e.out=function(){},e.prevChar=function(){var e=this._currentLine.length;return e>0?this._currentLine[e-1]:"\n"},e.Program=function(e,t){this.walk(e.body,t,!0)},e.Property=function(e,t){if(this.trigger("ObjectPropertyKey",e.key),this.walk(e.key,t),e.shorthand||(this.out(":"),this.trigger("ObjectPropertyValue",e.value),this.walk(e.value,t)),e.key.computed){var r=this.evalVariable(e.key,t);"undefined"!=typeof r&&(e.key.eval_res=r)}else e.key.eval_res=e.key.name},e.pushStructure=function(e){this._structures||(this._structures=[]),this._structures.push(e)},e.RestElement=function(e,t){e.argument&&this.trigger("RestArgument",e.argument),this.out(" ..."),this.walk(e.argument,t)},e.ReturnStatement=function(e,t){this.nlIfNot(),this.out("return "),this.trigger("ReturnValue",e.argument),this.walk(e.argument,t),this.out(";");var r=t;if(r.block)for(;r&&r.block;)r=r.parentCtx;r.return_value=e.argument.eval_res},e.SequenceExpression=function(e,t){if(e.expressions){var r=this,i=0;this.out("("),e.expressions.forEach(function(a){i++>0&&r.out(","),r.walk(a,t),e.eval_res=a.eval_res}),this.out(")")}},e.setParentProcess=function(e){this._parentProcess=e,e._childProcess||(e._childProcess=[]),e._childProcess.indexOf(this)<0&&e._childProcess.push(e)},e.setPaused=function(e){this._isPaused=e},e.skip=function(){this._skipWalk=!0},e.startBlock=function(){this.out("{",!0),this.indent(1)},e.startCollecting=function(){this._collecting=!0},e.startWalk=function(e,t){this._breakWalk=!1,this._path=[],this._codeStr="",this._currentLine="";try{this.walk(e,t)}catch(r){console.log("**** got exception from node **** "),console.log(r)}this.out("",!0)},e.Super=function(){this.out("super")},e.SwitchCase=function(e,t){if(e.test&&(this.walk(e.test,t),e.test.eval_res==t._switchTest.eval_res&&(t._switchMatch=!0),t._switchMatch&&e.consequent)){var r=this;e.consequent.forEach(function(e){r.walk(e,t)})}},e.SwitchStatement=function(e,t){this.walk(e.discriminant,t);try{var r=this;t._switchTest=e.discriminant,t._switchMatch=!1,e.cases.forEach(function(e){r.walk(e,t)})}catch(i){if("break"!=i.type)throw i}},e.ThisExpression=function(e,t){this.out("this"),e.eval_res=this.findThis(t)},e.ThrowStatement=function(e,t){this.nlIfNot(),this.out("throw "),this.trigger("ThrowArgument",e.argument),this.walk(e.argument,t);var r=e.argument.eval_res;throw"undefined"==typeof r&&(r=this.evalVariable(e.argument,t)),{type:"throw",node:e,value:r}},e.TryStatement=function(e,t){this.out("try ");try{this.walk(e.block,t)}catch(r){if("throw"!=r.type)throw r;if(e.finalizer&&this.walk(e.finalizer,t),!e.handler)throw r;var i=this.createContext(t);e.handler&&e.handler.param.name&&(i.variables[e.handler.param.name]=r.value),this.walk(e.handler.body,i)}},e.UnaryExpression=function(e,t){var r=!0;("Identifier"==e.argument.type||"Literal"==e.argument.type)&&(r=!1),this.out(e.operator),"!"!=e.operator&&this.out(" "),r&&this.out("("),this.trigger("UnaryExpressionArgument",e.argument),this.walk(e.argument,t),r&&this.out(")");var i=s(e.argument.eval_res||this.evalVariable(e.argument,t));"-"==e.operator&&(e.eval_res=-1*i),"~"==e.operator&&(e.eval_res=~i),"!"==e.operator&&(e.eval_res=!i),"+"==e.operator&&(e.eval_res=+i),"delete"==e.operator&&console.error("Delete unary operator not defined"),"typeof"==e.operator&&(e.eval_res=typeof i),"void"==e.operator&&(e.eval_res=void i)},e.UpdateExpression=function(e,t){this.trigger("UpdateExpressionArgument",e.argument),this.walk(e.argument,t),this.out(e.operator);var r=e.argument.eval_value;"undefined"==typeof r&&(r=this.evalVariable(e.argument,t));var i=this,a=function(e,t,r){if("MemberExpression"==e.type){var a,n;return a="undefined"!=typeof e.object.eval_res?e.object.eval_res:this.evalVariable(e.object,t),n=e.computed?"undefined"!=typeof e.property.eval_res?this.evalVariable(e.property.eval_res,t):this.evalVariable(e.property.name,t):e.property.name,void(a&&n&&(a[n]=r))}i.assignTo(e,t,r)};"++"==e.operator&&"undefined"!=typeof r&&(e.prefix||(e.eval_res=r),r++,e.prefix&&(e.eval_res=r),a(e.argument,t,r)),"--"==e.operator&&"undefined"!=typeof r&&(e.prefix||(e.eval_res=r),r--,e.prefix&&(e.eval_res=r),a(e.argument,t,r))},e.VariableDeclaration=function(e,t){var r=this,i=0;"var"==e.kind&&r.out("var "),"let"==e.kind&&r.out("let "),"const"==e.kind&&r.out("const ");var a=0;t._varKind=e.kind,e.declarations.forEach(function(e){i++>0&&(2==i&&(a+=2,r.indent(a)),r.out(",",!0)),r.walk(e,t)}),this.indent(-1*a)},e.VariableDeclarator=function(e,t){var r=this;e.id&&r.walk(e.id,t),e.init?(this.out(" = "),r.walk(e.init,t),e.id.name&&"undefined"!=typeof e.init.eval_res&&(t.variables||(t.variables={}),"var"==t._varKind&&(t.variables[e.id.name]=n(e.init.eval_res)),"let"==t._varKind&&(t.letVars||(t.letVars={}),t.letVars[e.id.name]=n(e.init.eval_res)),"const"==t._varKind&&(t.constVars||(t.constVars={}),t.constVars[e.id.name]=n(e.init.eval_res)))):e.id.name&&(t.variables||(t.variables={}),"var"==t._varKind&&(t.variables[e.id.name]=i),"let"==t._varKind&&(t.letVars||(t.letVars={}),t.letVars[e.id.name]=i),"const"==t._varKind&&(t.constVars||(t.constVars={}),t.constVars[e.id.name]=i))},e.walk=function(e,t){if(e&&!this.isKilled()&&!this._break){if(!t)return console.log("ERROR: no context defined for ",e),void console.trace();if(e instanceof Array){var r=e[0];if(!r)return;this.walk(r,t)}else if(e.type){this._processingNode=e;var i={node:e,ctx:t};if(this.trigger("node",i),this.trigger(e.type,i),this._skipWalk)return void(this._skipWalk=!1);if(this._break){if(this._breakState){var a=this._breakState.path;this._path.forEach(function(e){a.push(e)}),this._breakState.node=e,this._breakState.ctx=t,this._breakState.process=this}else this._breakState={node:e,ctx:t,process:this,path:this._path};return}if(this._wCb&&this._wCb(e),this[e.type]){if(this._path.push(e),e._activeCtx=t,this[e.type](e,t),this._break)return;this._path.pop();var n=e._next;n?this.walk(n,t):0==this._path.length}else console.log("Did not find "+e.type),console.log(e)}}},e.walkAsString=function(e,t){var r="";try{this.startCollecting(),this._collectStr="",this._collectLine="",this.walk(e,t),r=this._collectStr,this.endCollecting()}catch(i){}return r},e.WhileStatement=function(e,t){for(var r=1e6;r>0;)try{if(!e.test)break;if(this.walk(e.test,t),!e.test.eval_res)break;e.body&&this.walk(e.body,t),r--}catch(i){if(i&&"continue"==i.type)continue;if(i&&"break"==i.type)break;throw i}},e.WithStatement=function(){console.error("With statement is not supported")},e.YieldExpression=function(e,t){this.out("yield "),this.walk(e.argument,t)}}(this)},r=function(e,t,i,a,n,s,o,l){var h,u=this;if(!(u instanceof r))return new r(e,t,i,a,n,s,o,l);var f=[e,t,i,a,n,s,o,l];if(u.__factoryClass)if(u.__factoryClass.forEach(function(e){h=e.apply(u,f)}),"function"==typeof h){if(h._classInfo.name!=r._classInfo.name)return new h(e,t,i,a,n,s,o,l)}else if(h)return h;u.__traitInit?u.__traitInit.forEach(function(e){e.apply(u,f)}):"function"==typeof u.init&&u.init.apply(u,f)};r._classInfo={name:"ASTEval"},r.prototype=new t,function(){"undefined"!=typeof define&&null!==define&&null!=define.amd?(e.ASTEval=r,this.ASTEval=r):"undefined"!=typeof module&&null!==module&&null!=module.exports?module.exports.ASTEval=r:this.ASTEval=r}.call(new Function("return this")()),"undefined"!=typeof define&&null!==define&&null!=define.amd&&define(e)}).call(new Function("return this")());