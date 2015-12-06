(function(){var t={},e=function(){!function(t){t.on=function(t,e){return this._ev||(this._ev={}),this._ev[t]||(this._ev[t]=[]),this._ev[t].push(e),this},t.removeListener=function(t,e){if(this._ev&&this._ev[t])for(var r=this._ev[t],i=0;i<r.length;i++)if(r[i]==e)return void r.splice(i,1)},t.trigger=function(t,e,r){if(this._ev&&this._ev[t]){return this._ev[t].forEach(function(t){t(e,r)}),this}}}(this),function(t){var e,i,a,n,s;t.ArrayExpression=function(t,e){var r=this;if(t.elements&&t.elements.length>=0){this.out("[");var i=0;t.elements.forEach(function(t){i++>0&&r.out(","),r.trigger("ArrayElement",t),r.walk(t,e)}),this.out("]"),t.eval_res=[],t.elements.forEach(function(i){var a=i.eval_res||r.evalVariable(i,e);t.eval_res.push(a)})}},t.ArrayPattern=function(t,e){var r=this;if(t.elements&&t.elements.length>0){this.out("[");var i=0;t.elements.forEach(function(t){i++>0&&r.out(","),r.trigger("ArrayElement",t),r.walk(t,e)}),this.out("]")}},t.ArrowExpression=function(){},t.ArrowFunctionExpression=function(t,e){this.out("function"),t.generator&&(this.trigger("FunctionGenerator",t),this.out("* ")),t.id&&t.id.name?(console.log("ERROR: ArrowFunctionExpression should not have name"),this.trigger("FunctionName",t),this.out(" "+t.id.name+" ")):this.trigger("FunctionAnonymous",t);var r=this;this.out("(");var i=0;t.params.forEach(function(a){if(i++>0&&r.out(","),r.trigger("FunctionParam",a),r.walk(a,e),t.defaults&&t.defaults[i-1]){var n=t.defaults[i-1];r.out("="),r.trigger("FunctionDefaultParam",n),r.walk(n,e)}}),this.out(")"),r.trigger("FunctionBody",t.body),this.walk(t.body,e)},t.AssignmentExpression=function(t,e){function r(t,e,r){if("MemberExpression"==t.type){var i,a;return i="undefined"!=typeof t.object.eval_res?t.object.eval_res:l.evalVariable(t.object,e),a=t.computed?"undefined"!=typeof t.property.eval_res?l.evalVariable(t.property.eval_res,e):l.evalVariable(t.property.name,e):t.property.name,void(i&&a&&(i[a]=n(r)))}l.assignTo(t.name,e,r)}this.trigger("AssigmentLeft",t.left),this.walk(t.left,e),this.out(" "+t.operator+" "),this.trigger("AssigmentRight",t.right),this.walk(t.right,e);var i=t.right.eval_res;a(i)||(i=this.evalVariable(t.right,e));var o=t.left.eval_res;a(o)||(o=this.evalVariable(t.left,e)),i=s(i),o=s(o);var l=this;"="==t.operator&&r(t.left,e,i),"+="==t.operator&&r(t.left,e,o+i),"-="==t.operator&&r(t.left,e,o-i),"*="==t.operator&&r(t.left,e,o*i),"/="==t.operator&&r(t.left,e,o/i),"%="==t.operator&&r(t.left,e,o%i),"**="==t.operator&&r(t.left,e,Math.pow(o,i)),"<<="==t.operator&&r(t.left,e,o<<i),">>="==t.operator&&r(t.left,e,o>>i),">>>="==t.operator&&r(t.left,e,o>>>i),"&="==t.operator&&r(t.left,e,o&i),"^="==t.operator&&r(t.left,e,o^i),"|="==t.operator&&r(t.left,e,o|i)},t.assignTo=function(t,e,r){var i;if("object"==typeof t){var s=t;"Identifier"==s.type&&(i=s.name),"Literal"==s.type&&(i=s.value)}else i=t;this.findAndSetLet(i,e,r)||(a(e.variables[i])?e.variables[i]=n(r):e.parentCtx&&this.assignTo(i,e.parentCtx,r))},t.BinaryExpression=function(t,e){this.walk(t.left,e),this.walk(t.right,e);var r=t.left.eval_res,i=t.right.eval_res;a(r)||(r=this.evalVariable(t.left,e)),a(i)||(i=this.evalVariable(t.right,e)),r=s(r),i=s(i),"+"==t.operator&&(t.eval_res=r+i),"-"==t.operator&&(t.eval_res=r-i),"*"==t.operator&&(t.eval_res=r*i),"/"==t.operator&&(t.eval_res=r/i),"<"==t.operator&&(t.eval_res=i>r),"<="==t.operator&&(t.eval_res=i>=r),">"==t.operator&&(t.eval_res=r>i),">="==t.operator&&(t.eval_res=r>=i),"&"==t.operator&&(t.eval_res=r&i),"|"==t.operator&&(t.eval_res=r|i),"<<"==t.operator&&(t.eval_res=r<<i),">>"==t.operator&&(t.eval_res=r>>i),">>>"==t.operator&&(t.eval_res=r>>>i),"=="==t.operator&&(t.eval_res=r==i),"!="==t.operator&&(t.eval_res=r!=i),"==="==t.operator&&(t.eval_res=r===i),"!=="==t.operator&&(t.eval_res=r!==i),"%"==t.operator&&(t.eval_res=r%i)},t.BlockStatement=function(t,e){for(var r={block:!0,functions:{},vars:{},letVars:{},constVars:{},parentCtx:e},i=e;i&&i.block;)i=i.parentCtx;Object.defineProperty(r,"variables",{enumerable:!0,configurable:!0,writable:!0,value:i.variables}),this.out(" {",!0),this.indent(1),this.walk(t.body,r,!0),this.indent(-1),this.out("}")},t.BreakStatement=function(t,e){throw this.nlIfNot(),this.out("break "),t.label&&this.walk(t.label,e),this.out("",!0),{type:"break"}},t.breakWalk=function(){this._breakWalk=!0},t.CallExpression=function(t,r){if(t.callee){if("FunctionExpression"==t.callee.type&&this.out("("),this.walk(t.callee,r),"FunctionExpression"==t.callee.type&&this.out(")"),this.out("("),t.arguments){var i=this,a=0;t.arguments.forEach(function(t){a++>0&&i.out(", "),i.walk(t,r)})}this.out(")");var i=this;if(!e(t.callee.eval_res)){var n=[],o=t.callee.eval_res;t.arguments&&t.arguments.forEach(function(t){n.push("undefined"!=typeof t.eval_res?s(t.eval_res):s(i.evalVariable(t,r)))});var l=r["this"];"MemberExpression"==t.callee.type&&(this.walk(t.callee,r),l=t.callee.object.eval_res),"ThisExpression"==t.callee.type&&r.parentCtx&&(l=r.parentCtx["this"]),"function"==typeof o&&(t.eval_res=o.apply(l,n))}}},t.CatchClause=function(t,e){this.out(" catch "),t.param&&(this.out("("),this.walk(t.param,e),this.out(")")),t.body&&this.walk(t.body,e)},t.ClassBody=function(t,e){this.out("{",!0),this.indent(1),this.walk(t.body,e),this.indent(-1),this.out("}",!0)},t.ClassDeclaration=function(t,e){this.out("class "),t.id&&(this.walk(t.id,e),this.out(" ")),t.superClass&&(this.trigger("Extends",t.superClass),this.out(" extends "),this.walk(t.superClass,e)),t.body&&this.walk(t.body,e)},t.ConditionalExpression=function(t,e){this.walk(t.test,e),t.test.eval_res?this.walk(t.consequent,e):this.walk(t.alternate,e)},t.continueAfterBreak=function(){var t=this._breakState;t&&this._break&&(this._break=!1,this._path=[],this.walk(t.node,t.ctx))},t.ContinueStatement=function(){throw{type:"continue"}},t.createContext=function(t,e){for(var r={functions:{},vars:{},parentCtx:t,block:e},i=t;i&&i.block;)i=i.parentCtx;return Object.defineProperty(r,"variables",{enumerable:!0,configurable:!0,writable:!0,value:i.variables}),r},t.DebuggerStatement=function(t){throw this.nlIfNot(),this.out("debugger;"),{msg:"debugger",node:t}},t.DoWhileStatement=function(t,e){var r=1e6;do{if(t.body&&this.walk(t.body,e),r--,!t.test)break;if(this.walk(t.test,e),!t.test.eval_res)break}while(r>0)},t.EmptyStatement=function(){},t.endBlock=function(){this.out("}",!0),this.indent(-1)},t.endCollecting=function(){this._collecting=!1},t.evalVariable=function(t,r){var i;if("object"==typeof t){if(t.eval_res)return t.eval_res;var n=t;"Identifier"==n.type&&(i=n.name),"Literal"==n.type&&(i=n.value)}else i=t;var s=this.findLetVar(i,r);if(a(s))return e(s)?void 0:s;var o=this.findConstVar(i,r);return a(o)?e(o)?void 0:o:a(r.variables[i])?e(r.variables[i])?void 0:r.variables[i]:r.parentCtx?this.evalVariable(i,r.parentCtx):window[i]},t.ExpressionStatement=function(t,e){this.nlIfNot(),this.walk(t.expression,e),this.out(";",!0),t.eval_res=t.expression.eval_res},t.findAndSetLet=function(t,e,r){return e.letVars&&a(e.letVars[t])?(e.letVars[t]=n(r),!0):e.parentCtx?this.findAndSetLet(t,e.parentCtx,r):void 0},t.findConstVar=function(t,e){return e.constVars&&a(e.constVars[t])?e.constVars[t]:e.parentCtx?this.findConstVar(t,e.parentCtx):void 0},t.findLetVar=function(t,e){return e.letVars&&a(e.letVars[t])?e.letVars[t]:e.parentCtx?this.findLetVar(t,e.parentCtx):void 0},t.findThis=function(t){return t["this"]?t["this"]:t.parentCtx?this.findThis(t.parentCtx):window},t.ForInStatement=function(t,e){var r=this.createContext(e,!0);if(t.left&&(this.walk(t.left,r),t.right)){this.walk(t.right,r);var i,a,n,s=t.right.eval_res;if("VariableDeclaration"==t.left.type?(a=t.left.declarations[0],n=a.kind,i=a.name||a.id.name):i="Identifier"==t.left.type?t.name:t.left.eval_res,i&&s)for(var o in s)try{a?this.assignTo(i,r,o):this.assignTo(i,r,o),this.walk(t.body,r)}catch(l){if(l&&"continue"==l.type)continue;if(l&&"break"==l.type)break;throw l}}},t.ForOfStatement=function(t,e){var r=this.createContext(e,!0);if(t.left&&(this.walk(t.left,r),t.right)){this.walk(t.right,r);var i,a,n,s=t.right.eval_res;if("VariableDeclaration"==t.left.type?(a=t.left.declarations[0],n=a.kind,i=a.name||a.id.name):i="Identifier"==t.left.type?t.name:t.left.eval_res,i&&s){var o=this;s.every(function(e){try{return a?o.assignTo(i,r,e):o.assignTo(i,r,e),o.walk(t.body,r),!0}catch(n){if(n&&"continue"==n.type)return!0;if(n&&"break"==n.type)return!1;throw n}})}}},t.ForStatement=function(t,e){var r=this.createContext(e,!0);t.init&&this.walk(t.init,r);for(var i=1e6;i>0;)try{if(!t.test)break;if(this.walk(t.test,r),!t.test.eval_res)break;t.body&&this.walk(t.body,r),t.update&&this.walk(t.update,r),i--}catch(a){if(a&&"continue"==a.type)continue;if(a&&"break"==a.type)break;throw a}},t.FunctionDeclaration=function(t,e){var i=this;t.eval_res=function(){if(!i.isKilled()){var a=[],n=arguments.length,s=arguments,o={functions:{},vars:{},variables:{},parentCtx:e};o["this"]=this;for(var l=new r,u=0;n>u;u++)a[u]=arguments[u];var u=0;return t.params.forEach(function(r){"undefined"!=typeof s[u]?o.variables[r.name]=s[u]:t.defaults&&t.defaults[u]&&(i.walk(t.defaults[u],e),o.variables[r.name]=t.defaults[u].eval_res),u++}),l.startWalk(t.body,o),o.return_value}},t.id&&t.id.name&&(e.variables[t.id.name]=t.eval_res)},t.FunctionExpression=function(t,e){var i=this;t.eval_res=function(){if(!i.isKilled()){var a=[],n=arguments.length,s=arguments,o={functions:{},vars:{},variables:{},parentCtx:e};o["this"]=this;for(var l=new r,u=0;n>u;u++)a[u]=arguments[u];var u=0;return t.params.forEach(function(r){"undefined"!=typeof s[u]?o.variables[r.name]=s[u]:t.defaults&&t.defaults[u]&&(i.walk(t.defaults[u],e),o.variables[r.name]=t.defaults[u].eval_res),u++}),l.startWalk(t.body,o),o.return_value}},t.id&&t.id.name&&(e.variables[t.id.name]=t.eval_res)},t.getCode=function(){return this._codeStr},t.getParentProcess=function(){return this._parentProcess},t.getStructures=function(){return this._structures},t.handleException=function(t){for(var e=this._path.length-1;e>=0;e--){var r=this._path[e];if("TryStatement"==r.type){var i=r,a=r._exceptionHandlerCtx;if(a.variables[i.handler.param.name]=t,i.handler)try{this.walk(i.handler.body,a)}catch(t){}i.finalizer&&this.walk(i.finalizer,a);break}}},t.Identifier=function(t,e){return"undefined"==t.name?void(t.eval_res=i):void(t.eval_res=this.evalVariable(t.name,e))},t.IfStatement=function(t,e){this.walk(t.test,e),t.test.eval_res?this.walk(t.consequent,e):this.walk(t.alternate,e)},t.indent=function(t){this._indent+=t,this._indent<0&&(this._indent=0)},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(t){this._structures=[],this._tabChar="  ",this._codeStr="",this._currentLine="",this._indent=0,this._options=t||{},e||(i={},e=function(t){return t===i||"undefined"==typeof t},a=function(t){return"undefined"!=typeof t},n=function(t){return t===i?t:void 0===t?i:"undefined"==typeof t?i:t},s=function(t){return t===i?void 0:t})}),t.isKilled=function(){if(this._isKilled)return!0;var t=this.getParentProcess();return t?t.isKilled():void 0},t.isPaused=function(){if(this._isPaused)return!0;var t=this.getParentProcess();return t?t.isPaused():void 0},t.kill=function(){this._isKilled=!0},t.LabeledStatement=function(t,e){this.nlIfNot(),this.walk(t.label,e),this.out(":",!0),this.indent(1),t.body&&this.walk(t.body,e),this.indent(-1)},t.listify=function(t,e){if(t){t._parent=e;for(var r in t)if(t.hasOwnProperty(r)){if("_next"==r)continue;if("_prev"==r)continue;if("_parent"==r)continue;if("range"==r)continue;if("comments"==r)continue;var i=t[r];if(i instanceof Array)for(var a=0;a<i.length;a++){var n=i[a];"object"==typeof n&&(a<i.length-1&&(n._next=i[a+1]),a>0&&(n._prev=i[a-1]),this.listify(n,t))}else"object"==typeof i&&this.listify(i,t)}}},t.Literal=function(t){this.out(t.raw),t.eval_res=t.value,t.eval_type=typeof t.value},t.LogicalExpression=function(t,e){this.walk(t.left,e),this.walk(t.right,e);var r=t.left.eval_res,i=t.right.eval_res;a(r)||(r=this.evalVariable(t.left,e)),a(i)||(i=this.evalVariable(t.right,e)),r=s(r),i=s(i),"&&"==t.operator&&(t.eval_res=r&&i),"||"==t.operator&&(t.eval_res=r||i)},t.MemberExpression=function(t,r){this.walk(t.object,r),t.computed?this.walk(t.property,r):this.walk(t.property,r);var i;i="ThisExpression"==t.object.type?this.findThis(r):this.evalVariable(t.object,r),t.object.eval_res=i;var a;if(t.computed)var a=this.evalVariable(t.property.name,r);else a=t.property.name;if(!e(i))try{t.eval_res=i[a]}catch(n){}},t.MethodDefinition=function(t,e){t.key&&(this.__insideMethod=!0,"constructor"==t.kind&&this.trigger("ClassConstructor",t),t.static&&this.out("static "),this.walk(t.key,e),this.walk(t.value,e),this.out("",!0),this.__insideMethod=!1)},t.NewExpression=function(t,r){if(t.arguments){var i=this,a=0;t.arguments.forEach(function(t){a++>0&&i.out(", "),i.walk(t,r)})}if(t.callee&&(this.walk(t.callee,r),!e(t.callee.eval_res))){var n=[];if(t.arguments){var o=t.callee.eval_res;t.arguments.forEach(function(t){n.push("undefined"!=typeof t.eval_res?s(t.eval_res):s(i.evalVariable(t,r)))});var l;0==n.length&&(l=new o),1==n.length&&(l=new o(n[0])),2==n.length&&(l=new o(n[0],n[1])),3==n.length&&(l=new o(n[0],n[1],n[2])),4==n.length&&(l=new o(n[0],n[1],n[2],n[3])),5==n.length&&(l=new o(n[0],n[1],n[2],n[3],n[4])),6==n.length&&(l=new o(n[0],n[1],n[2],n[3],n[4],n[5])),t.eval_res=l}}},t.nlIfNot=function(){var t=this._currentLine.length;t>0&&("{"==this._currentLine[t-1]||";"==this._currentLine[t-1]?this.out("",!0):this.out(";",!0))},t.ObjectExpression=function(t,e){var r=this;try{r.out("{");var i=0;t&&t.properties&&(t.properties.length>1&&r.out("",!0),r.indent(1),t.properties.forEach(function(t){i++>0&&r.out(",",!0),r.trigger("ObjectExpressionProperty",t),r.walk(t,e)}),r.indent(-1)),r.out("}"),t.eval_res={},t.properties&&t.properties.forEach(function(i){var a=i.value.eval_res||r.evalVariable(i.value,e),n=i.key.eval_res;"undefined"==typeof n&&(n=r.evalVariable(i.key,e)),t.eval_res[n]=a})}catch(a){console.error(a.message)}},t.ObjectPattern=function(t,e){var r=this;try{r.out("{");var i=0;t&&t.properties&&t.properties.forEach(function(t){i++>0&&r.out(","),r.trigger("ObjectExpressionProperty",t),r.walk(t,e)}),r.out("}")}catch(a){console.error(a.message)}},t.out=function(){},t.prevChar=function(){var t=this._currentLine.length;return t>0?this._currentLine[t-1]:"\n"},t.Program=function(t,e){this.walk(t.body,e,!0)},t.Property=function(t,e){if(this.trigger("ObjectPropertyKey",t.key),this.walk(t.key,e),t.shorthand||(this.out(":"),this.trigger("ObjectPropertyValue",t.value),this.walk(t.value,e)),t.key.computed){var r=this.evalVariable(t.key,e);"undefined"!=typeof r&&(t.key.eval_res=r)}else t.key.eval_res=t.key.name},t.pushStructure=function(t){this._structures||(this._structures=[]),this._structures.push(t)},t.RestElement=function(t,e){t.argument&&this.trigger("RestArgument",t.argument),this.out(" ..."),this.walk(t.argument,e)},t.ReturnStatement=function(t,e){this.nlIfNot(),this.out("return "),this.trigger("ReturnValue",t.argument),this.walk(t.argument,e),this.out(";");var r=e;if(r.block)for(;r&&r.block;)r=r.parentCtx;r.return_value=t.argument.eval_res},t.SequenceExpression=function(t,e){if(t.expressions){var r=this,i=0;this.out("("),t.expressions.forEach(function(a){i++>0&&r.out(","),r.walk(a,e),t.eval_res=a.eval_res}),this.out(")")}},t.setParentProcess=function(t){this._parentProcess=t,t._childProcess||(t._childProcess=[]),t._childProcess.indexOf(this)<0&&t._childProcess.push(t)},t.setPaused=function(t){this._isPaused=t},t.skip=function(){this._skipWalk=!0},t.startBlock=function(){this.out("{",!0),this.indent(1)},t.startCollecting=function(){this._collecting=!0},t.startWalk=function(t,e){this._breakWalk=!1,this._path=[],this._codeStr="",this._currentLine="";try{this.walk(t,e)}catch(r){console.log("**** got exception from node **** "),console.log(r)}this.out("",!0)},t.Super=function(){this.out("super")},t.SwitchCase=function(t,e){if(this.nlIfNot(),t.test?(this.out("case "),this.walk(t.test,e),this.out(" : ",!0)):this.out("default: ",!0),t.consequent){var r=this;t.consequent.forEach(function(t){r.walk(t,e)})}},t.SwitchStatement=function(){console.error("Switch statement is not supported...")},t.ThisExpression=function(t,e){this.out("this"),t.eval_res=this.findThis(e)},t.ThrowStatement=function(t,e){this.nlIfNot(),this.out("throw "),this.trigger("ThrowArgument",t.argument),this.walk(t.argument,e);var r=t.argument.eval_res;throw"undefined"==typeof r&&(r=this.evalVariable(t.argument,e)),{type:"throw",node:t,value:r}},t.TryStatement=function(t,e){this.out("try ");try{this.walk(t.block,e)}catch(r){if("throw"!=r.type)throw r;if(t.finalizer&&this.walk(t.finalizer,e),!t.handler)throw r;var i=thie.createContext(e);t.handler&&t.handler.param.name&&(i.variables[t.handler.param.name]=r.value),this.walk(t.handler.body,i)}},t.UnaryExpression=function(t,e){var r=!0;("Identifier"==t.argument.type||"Literal"==t.argument.type)&&(r=!1),this.out(t.operator),"!"!=t.operator&&this.out(" "),r&&this.out("("),this.trigger("UnaryExpressionArgument",t.argument),this.walk(t.argument,e),r&&this.out(")");var i=s(t.argument.eval_res||this.evalVariable(t.argument,e));"-"==t.operator&&(t.eval_res=-1*i),"~"==t.operator&&(t.eval_res=~i),"!"==t.operator&&(t.eval_res=!i),"+"==t.operator&&(t.eval_res=+i),"delete"==t.operator&&console.error("Delete unary operator not defined"),"typeof"==t.operator&&(t.eval_res=typeof i),"void"==t.operator&&(t.eval_res=void i)},t.UpdateExpression=function(t,e){this.trigger("UpdateExpressionArgument",t.argument),this.walk(t.argument,e),this.out(t.operator);var r=t.argument.eval_value;"undefined"==typeof r&&(r=this.evalVariable(t.argument,e));var i=this,a=function(t,e,r){if("MemberExpression"==t.type){var a,n;return a="undefined"!=typeof t.object.eval_res?t.object.eval_res:this.evalVariable(t.object,e),n=t.computed?"undefined"!=typeof t.property.eval_res?this.evalVariable(t.property.eval_res,e):this.evalVariable(t.property.name,e):t.property.name,void(a&&n&&(a[n]=r))}i.assignTo(t,e,r)};"++"==t.operator&&"undefined"!=typeof r&&(t.prefix||(t.eval_res=r),r++,t.prefix&&(t.eval_res=r),a(t.argument,e,r)),"--"==t.operator&&"undefined"!=typeof r&&(t.prefix||(t.eval_res=r),r--,t.prefix&&(t.eval_res=r),a(t.argument,e,r))},t.VariableDeclaration=function(t,e){var r=this,i=0;"var"==t.kind&&r.out("var "),"let"==t.kind&&r.out("let "),"const"==t.kind&&r.out("const ");var a=0;e._varKind=t.kind,t.declarations.forEach(function(t){i++>0&&(2==i&&(a+=2,r.indent(a)),r.out(",",!0)),r.walk(t,e)}),this.indent(-1*a)},t.VariableDeclarator=function(t,e){var r=this;t.id&&r.walk(t.id,e),t.init?(this.out(" = "),r.walk(t.init,e),t.id.name&&"undefined"!=typeof t.init.eval_res&&(e.variables||(e.variables={}),"var"==e._varKind&&(e.variables[t.id.name]=n(t.init.eval_res)),"let"==e._varKind&&(e.letVars||(e.letVars={}),e.letVars[t.id.name]=n(t.init.eval_res)),"const"==e._varKind&&(e.constVars||(e.constVars={}),e.constVars[t.id.name]=n(t.init.eval_res)))):t.id.name&&(e.variables||(e.variables={}),"var"==e._varKind&&(e.variables[t.id.name]=i),"let"==e._varKind&&(e.letVars||(e.letVars={}),e.letVars[t.id.name]=i),"const"==e._varKind&&(e.constVars||(e.constVars={}),e.constVars[t.id.name]=i))},t.walk=function(t,e){if(t&&!this.isKilled()&&!this._break){if(!e)return console.log("ERROR: no context defined for ",t),void console.trace();if(t instanceof Array){var r=t[0];if(!r)return;this.walk(r,e)}else if(t.type){this._processingNode=t;var i={node:t,ctx:e};if(this.trigger("node",i),this.trigger(t.type,i),this._skipWalk)return void(this._skipWalk=!1);if(this._break){if(this._breakState){var a=this._breakState.path;this._path.forEach(function(t){a.push(t)}),this._breakState.node=t,this._breakState.ctx=e,this._breakState.process=this}else this._breakState={node:t,ctx:e,process:this,path:this._path};return}if(this._wCb&&this._wCb(t),this[t.type]){if(this._path.push(t),t._activeCtx=e,this[t.type](t,e),this._break)return;this._path.pop();var n=t._next;n?this.walk(n,e):0==this._path.length}else console.log("Did not find "+t.type),console.log(t)}}},t.walkAsString=function(t,e){var r="";try{this.startCollecting(),this._collectStr="",this._collectLine="",this.walk(t,e),r=this._collectStr,this.endCollecting()}catch(i){}return r},t.WhileStatement=function(t,e){for(var r=1e6;r>0;)try{if(!t.test)break;if(this.walk(t.test,e),!t.test.eval_res)break;t.body&&this.walk(t.body,e),r--}catch(i){if(i&&"continue"==i.type)continue;if(i&&"break"==i.type)break;throw i}},t.WithStatement=function(){console.error("With statement is not supported")},t.YieldExpression=function(t,e){this.out("yield "),this.walk(t.argument,e)}}(this)},r=function(t,e,i,a,n,s,o,l){var u,h=this;if(!(h instanceof r))return new r(t,e,i,a,n,s,o,l);var f=[t,e,i,a,n,s,o,l];if(h.__factoryClass)if(h.__factoryClass.forEach(function(t){u=t.apply(h,f)}),"function"==typeof u){if(u._classInfo.name!=r._classInfo.name)return new u(t,e,i,a,n,s,o,l)}else if(u)return u;h.__traitInit?h.__traitInit.forEach(function(t){t.apply(h,f)}):"function"==typeof h.init&&h.init.apply(h,f)};r._classInfo={name:"ASTEval"},r.prototype=new e,function(){"undefined"!=typeof define&&null!==define&&null!=define.amd?(t.ASTEval=r,this.ASTEval=r):"undefined"!=typeof module&&null!==module&&null!=module.exports?module.exports.ASTEval=r:this.ASTEval=r}.call(new Function("return this")()),"undefined"!=typeof define&&null!==define&&null!=define.amd&&define(t)}).call(new Function("return this")());