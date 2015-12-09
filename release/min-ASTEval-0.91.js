(function(){var e={},t=function(){!function(e){e.on=function(e,t){return this._ev||(this._ev={}),this._ev[e]||(this._ev[e]=[]),this._ev[e].push(t),this},e.removeListener=function(e,t){if(this._ev&&this._ev[e])for(var a=this._ev[e],r=0;r<a.length;r++)if(a[r]==t)return void a.splice(r,1)},e.trigger=function(e,t,a){if(this._ev&&this._ev[e]){return this._ev[e].forEach(function(e){e(t,a)}),this}}}(this),function(e){var t,r,n,i,s,l,o;e._getUndefined=function(){return r},e.ArrayExpression=function(e,t){var a=this;if(e.elements&&e.elements.length>=0){this.out("[");var r=0;e.elements.forEach(function(e){r++>0&&a.out(","),a.trigger("ArrayElement",e),a.walk(e,t)}),this.out("]"),e.eval_res=[],e.elements.forEach(function(r){var n=r.eval_res||a.evalVariable(r,t);e.eval_res.push(n)})}},e.ArrayPattern=function(e,t){var a=this;if(e.elements&&e.elements.length>0){this.out("[");var r=0;e.elements.forEach(function(e){r++>0&&a.out(","),a.trigger("ArrayElement",e),a.walk(e,t)}),this.out("]")}},e.ArrowExpression=function(){},e.ArrowFunctionExpression=function(e,t){var r=this,n=this.findThis(t);e.eval_res=function(){if(!r.isKilled()){var i=[],s=arguments.length,l=arguments,o={functions:{},vars:{},variables:{},parentCtx:t};o["this"]=n;for(var u=new a,f=0;s>f;f++)i[f]=arguments[f];var f=0;e.params.forEach(function(a){return"RestElement"==a.type?(o.variables[a.argument.name]=i.slice(f),void f++):("undefined"!=typeof l[f]?o.variables[a.name]=l[f]:e.defaults&&e.defaults[f]&&(r.walk(e.defaults[f],t),o.variables[a.name]=e.defaults[f].eval_res),void f++)});try{u.startWalk(e.body,o)}catch(c){if("return"!=c.type)throw c}return e.expression&&(o.return_value=e.body.eval_res),o.return_value}},e.id&&e.id.name&&(t.variables[e.id.name]=e.eval_res)},e.AssignmentExpression=function(e,t){var a=e;this.walk(a.right,t),this.walk(a.left,t);var r=a.right.eval_res;n(r)||(r=this.evalVariable(a.right,t));var i=a.left.eval_res;n(i)||(i=this.evalVariable(a.left,t)),r=s(r),i=s(i);return"="==a.operator?this.node_assign(a.left,t,r,e):"+="==a.operator?this.node_assign(a.left,t,i+r,e):"-="==a.operator?this.node_assign(a.left,t,i-r,e):"*="==a.operator?this.node_assign(a.left,t,i*r,e):"/="==a.operator?this.node_assign(a.left,t,i/r,e):"%="==a.operator?this.node_assign(a.left,t,i%r,e):"**="==a.operator?this.node_assign(a.left,t,Math.pow(i,r),e):"<<="==a.operator?this.node_assign(a.left,t,i<<r,e):">>="==a.operator?this.node_assign(a.left,t,i>>r,e):">>>="==a.operator?this.node_assign(a.left,t,i>>>r,e):"&="==a.operator?this.node_assign(a.left,t,i&r,e):"^="==a.operator?this.node_assign(a.left,t,i^r,e):"|="==a.operator?this.node_assign(a.left,t,i|r,e):void console.error("Unknown assigment ",a.operator)},e.assignTo=function(e,t,a){var r;if("object"==typeof e){var s=e;"Identifier"==s.type&&(r=s.name),"Literal"==s.type&&(r=s.value)}else r=e;this.findAndSetLet(r,t,a)||(n(t.variables[r])?t.variables[r]=i(a):t.parentCtx&&this.assignTo(r,t.parentCtx,a))},e.BinaryExpression=function(e,t){var a,r;this.walk(e.left,t),a=e.left.eval_res,n(a)||(a=this.evalVariable(e.left,t));return this.walk(e.right,t),r=e.right.eval_res,n(r)||(r=this.evalVariable(e.right,t)),a=s(a),r=s(r),"+"==e.operator?e.eval_res=a+r:"-"==e.operator?e.eval_res=a-r:"*"==e.operator?e.eval_res=a*r:"/"==e.operator?e.eval_res=a/r:"<"==e.operator?e.eval_res=r>a:"<="==e.operator?e.eval_res=r>=a:">"==e.operator?e.eval_res=a>r:">="==e.operator?e.eval_res=a>=r:"&"==e.operator?e.eval_res=a&r:"|"==e.operator?e.eval_res=a|r:"<<"==e.operator?e.eval_res=a<<r:">>"==e.operator?e.eval_res=a>>r:">>>"==e.operator?e.eval_res=a>>>r:"^"==e.operator?e.eval_res=a^r:"=="==e.operator?e.eval_res=a==r:"!="==e.operator?e.eval_res=a!=r:"==="==e.operator?e.eval_res=a===r:"!=="==e.operator?e.eval_res=a!==r:"%"==e.operator?e.eval_res=a%r:"instanceof"==e.operator?e.eval_res=a instanceof r:"in"==e.operator?e.eval_res=a in r:void console.error("Undefined variable "+e.operator+" in BinaryExpression")},e.BlockStatement=function(e,t){for(var a={block:!0,parentCtx:t},r=t;r&&r.block;)r=r.parentCtx;a.variables=r.variables,this.walk(e.body,a,!0)},e.BreakStatement=function(e,t){throw e.label&&this.walk(e.label,t),{type:"break",label:e.label}},e.breakWalk=function(){this._breakWalk=!0},e.CallExpression=function(e,a){if(e.callee){if("FunctionExpression"==e.callee.type&&this.out("("),this.walk(e.callee,a),"FunctionExpression"==e.callee.type&&this.out(")"),this.out("("),e.arguments){var n=this;this.walk(e.arguments,a)}this.out(")");var n=this;if(!t(e.callee.eval_res)){var i=[],l=e.callee.eval_res;e.arguments&&e.arguments.forEach(function(e){i.push("undefined"!=typeof e.eval_res?s(e.eval_res):s(n.evalVariable(e,a)))});var o=a["this"];if("MemberExpression"==e.callee.type&&(o=e.callee.object.eval_res,!this.canAccess(o)))return console.error("Access denied for object ",o),void(e.eval_res=r);"ThisExpression"==e.callee.type&&a.parentCtx&&(o=a.parentCtx["this"]),"function"==typeof l&&(e.eval_res=l.apply(o,i))}}},e.canAccess=function(e){if(o)for(var t=0;t<o.length;t++)if(o[t]===e)return!1;return!0},e.CatchClause=function(e,t){this.out(" catch "),e.param&&(this.out("("),this.walk(e.param,t),this.out(")")),e.body&&this.walk(e.body,t)},e.ClassBody=function(e,t){this.out("{",!0),this.indent(1),this.walk(e.body,t),this.indent(-1),this.out("}",!0)},e.ClassDeclaration=function(e,t){this.out("class "),e.id&&(this.walk(e.id,t),this.out(" ")),e.superClass&&(this.trigger("Extends",e.superClass),this.out(" extends "),this.walk(e.superClass,t)),e.body&&this.walk(e.body,t)},e.collectVarsAndFns=function(e,t,a){if(e&&e.type&&!e._fnc&&"FunctionExpression"!=e.type){if("FunctionDeclaration"==e.type)return void a(e);if("VariableDeclaration"==e.type)return void a(e);e._fnc=!0;for(var r in e)if(e.hasOwnProperty(r)){if("_next"==r)continue;if("_prev"==r)continue;if("_parent"==r)continue;if("range"==r)continue;if("comments"==r)continue;var n=e[r];if(n instanceof Array)for(var i=0;i<n.length;i++){var s=n[i];"object"==typeof s&&this.collectVarsAndFns(s,t,a)}else"object"==typeof n&&this.collectVarsAndFns(n,t,a)}}},e.compileIdentifier=function(e,t){if(t.letVars&&n(t.letVars[e]))return[!1,t.letVars,e];if(t.constVars&&n(t.constVars[e]))return[!1,t.constVars,e];if(t.variables&&n(t.variables[e]))return[!1,t.variables,e];for(var a=t.parentCtx;a;){if(a.letVars&&n(a.letVars[e]))return[!1,a.letVars,e];if(a.constVars&&n(a.constVars[e]))return[!1,a.constVars,e];if(a.variables&&n(a.variables[e]))return[!1,a.variables,e];a=a.parentCtx}return l&&"undefined"!=typeof l[e]?[!1,l,e]:void 0},e.ConditionalExpression=function(e,t){this.walk(e.test,t),s(e.test.eval_res)?(this.walk(e.consequent,t),e.eval_res=e.consequent.eval_res):(this.walk(e.alternate,t),e.eval_res=e.alternate.eval_res)},e.continueAfterBreak=function(){var e=this._breakState;e&&this._break&&(this._break=!1,this._path=[],this.walk(e.node,e.ctx))},e.ContinueStatement=function(e){throw{type:"continue",label:e.label}},e.createContext=function(e,t){for(var a={parentCtx:e,block:t},r=e;r&&r.block;)r=r.parentCtx;return a.variables=t?r.variables:{},a},e.DebuggerStatement=function(){},e.DoWhileStatement=function(e,t){var a=1e6;do try{if(e.body&&this.walk(e.body,t),a--,!e.test)break;if(this.walk(e.test,t),!s(e.test.eval_res))break}catch(r){if(r&&"continue"==r.type){if(!r.label||!r.label.name)continue;if(e._label&&e._label.name==r.label.name)continue}if(r&&"break"==r.type){if(!r.label||!r.label.name)break;if(e._label&&e._label.name==r.label.name)break}throw r}while(a>0)},e.EmptyStatement=function(){},e.endBlock=function(){this.out("}",!0),this.indent(-1)},e.endCollecting=function(){this._collecting=!1},e.evalVariable=function(e,a){var i;if(null===e||"null"==e)return null;if(!a)return r;if("number"==typeof e)return i;if("object"==typeof e){if("undefined"!=typeof e.eval_res)return e.eval_res;var s=e;if("Identifier"!=s.type)return"Literal"==s.type?s.value:r;i=e.name}else i=e;if(a.letVars&&n(a.letVars[i]))return a.letVars[i];if(a.constVars&&n(a.constVars[i]))return a.constVars[i];if(a.variables&&n(a.variables[i]))return a.variables[i];if(a.parentCtx){var o=a.parentCtx;if(o.letVars&&n(o.letVars[i]))return o.letVars[i];if(o.constVars&&n(o.constVars[i]))return o.constVars[i];if(o.variables&&n(o.variables[i]))return o.variables[i]}var u=this.findLetVar(i,a);if(n(u))return t(u)?void 0:u;var f=this.findConstVar(i,a);return n(f)?t(f)?void 0:f:n(a.variables[i])?t(a.variables[i])?void 0:a.variables[i]:a.parentCtx?this.evalVariable(i,a.parentCtx):l?l[i]:void 0},e.ExpressionStatement=function(e,t){this.nlIfNot(),this.walk(e.expression,t),this.out(";",!0),e.eval_res=e.expression.eval_res},e.findAndSetLet=function(e,t,a){return t.letVars&&n(t.letVars[e])?(t.letVars[e]=i(a),!0):t.parentCtx?this.findAndSetLet(e,t.parentCtx,a):void 0},e.findConstVar=function(e,t){return t.constVars&&n(t.constVars[e])?t.constVars[e]:t.parentCtx?this.findConstVar(e,t.parentCtx):void 0},e.findLetVar=function(e,t){return t.letVars&&n(t.letVars[e])?t.letVars[e]:t.parentCtx?this.findLetVar(e,t.parentCtx):void 0},e.findThis=function(e){return e["this"]?e["this"]:e.parentCtx?this.findThis(e.parentCtx):this.canAccess(l)?l:(console.error("Can not access ",l),r)},e.ForInStatement=function(e,t){var a=this.createContext(t,!0);if(e.left&&(this.walk(e.left,a),e.right)){this.walk(e.right,a);var r,n,i,s=e.right.eval_res;if("VariableDeclaration"==e.left.type?(n=e.left.declarations[0],i=n.kind,r=n.name||n.id.name):r="Identifier"==e.left.type?e.left.name:e.left.eval_res,r&&s)for(var l in s)try{n?this.assignTo(r,a,l):this.assignTo(r,a,l),this.walk(e.body,a)}catch(o){if(o&&"continue"==o.type){if(!o.label||!o.label.name)continue;if(e._label&&e._label.name==o.label.name)continue}if(o&&"break"==o.type){if(!o.label||!o.label.name)break;if(e._label&&e._label.name==o.label.name)break}throw o}}},e.ForOfStatement=function(e,t){var a=this.createContext(t,!0);if(e.left&&(this.walk(e.left,a),e.right)){this.walk(e.right,a);var r,n,i,s=e.right.eval_res;if("VariableDeclaration"==e.left.type?(n=e.left.declarations[0],i=n.kind,r=n.name||n.id.name):r="Identifier"==e.left.type?e.name:e.left.eval_res,r&&s){var l=this;s.every(function(t){try{return n?l.assignTo(r,a,t):l.assignTo(r,a,t),l.walk(e.body,a),!0}catch(i){if(i&&"continue"==i.type){if(!i.label||!i.label.name)return!0;if(e._label&&e._label.name==i.label.name)return!0}if(i&&"break"==i.type){if(!i.label||!i.label.name)return!1;if(e._label&&e._label.name==i.label.name)return!1}throw i}})}}},e.ForStatement=function(e,t){var a=this.createContext(t,!0);e.init&&this.walk(e.init,a);for(var r=1e6;r>0;)try{if(!e.test)break;if(this.walk(e.test,a),!s(e.test.eval_res))break;e.body&&this.walk(e.body,a),e.update&&this.walk(e.update,a),r--}catch(n){if(n&&"continue"==n.type){if(!n.label||!n.label.name){e.update&&this.walk(e.update,a);continue}if(e._label&&e._label.name==n.label.name){e.update&&this.walk(e.update,a);continue}}if(n&&"break"==n.type){if(!n.label||!n.label.name)break;if(e._label&&e._label.name==n.label.name)break}throw n}},e.FunctionDeclaration=function(e,t){var n=this;e.eval_res=function(){if(!n.isKilled()){var i=[],s=arguments.length,l=arguments,o={functions:{},vars:{},variables:{},parentCtx:t};o["this"]=this,o.variables.arguments=arguments,this instanceof e.eval_res&&(o.variables["new.target"]=e.eval_res);for(var u=new a,f=0;s>f;f++)i[f]=arguments[f];var f=0;e.params.forEach(function(a){return"RestElement"==a.type?(o.variables[a.argument.name]=i.slice(f),void f++):("undefined"!=typeof l[f]?o.variables[a.name]=l[f]:(o.variables[a.name]=r,e.defaults&&e.defaults[f]&&(n.walk(e.defaults[f],t),o.variables[a.name]=e.defaults[f].eval_res)),void f++)});try{u.startWalk(e.body,o)}catch(c){if("return"!=c.type)throw c}return o.return_value}},e.eval_res.__$$pLength__=e.params.length,e.params.forEach(function(t){"RestElement"==t.type&&e.eval_res.__$$pLength__--}),e.id&&e.id.name&&(t.variables[e.id.name]=e.eval_res)},e.FunctionExpression=function(e,t){var n=this;e.eval_res=function(){if(!n.isKilled()){var i=[],s=arguments.length,l=arguments,o={functions:{},vars:{},variables:{},parentCtx:t};o["this"]=this,o.variables.arguments=arguments,this instanceof e.eval_res&&(o.variables["new.target"]=e.eval_res);for(var u=new a,f=0;s>f;f++)i[f]=arguments[f];var f=0;e.params.forEach(function(a){return"RestElement"==a.type?(o.variables[a.argument.name]=i.slice(f),void f++):("undefined"!=typeof l[f]?o.variables[a.name]=l[f]:(o.variables[a.name]=r,e.defaults&&e.defaults[f]&&(n.walk(e.defaults[f],t),o.variables[a.name]=e.defaults[f].eval_res)),void f++)});try{u.startWalk(e.body,o)}catch(c){if("return"!=c.type)throw c}return o.return_value}},e.eval_res.__$$pLength__=e.params.length,e.params.forEach(function(t){"RestElement"==t.type&&e.eval_res.__$$pLength__--}),e.id&&e.id.name&&(t.variables[e.id.name]=e.eval_res)},e.getCode=function(){return this._codeStr},e.getParentProcess=function(){return this._parentProcess},e.getStructures=function(){return this._structures},e.handleException=function(e){for(var t=this._path.length-1;t>=0;t--){var a=this._path[t];if("TryStatement"==a.type){var r=a,n=a._exceptionHandlerCtx;if(n.variables[r.handler.param.name]=e,r.handler)try{this.walk(r.handler.body,n)}catch(e){}r.finalizer&&this.walk(r.finalizer,n);break}}},e.Identifier=function(e,t){if("undefined"==e.name)return void(e.eval_res=r);if(e._c){var a=e._c;return void(e.eval_res=a[0]?a[1]:a[1][a[2]])}if(e._c=this.compileIdentifier(e.name,t),e._c){var a=e._c;return void(e.eval_res=a[0]?a[1]:a[1][a[2]])}e.eval_res=this.evalVariable(e.name,t)},e.IfStatement=function(e,t){this.walk(e.test,t),s(e.test.eval_res)?this.walk(e.consequent,t):this.walk(e.alternate,t)},e.indent=function(e){this._indent+=e,this._indent<0&&(this._indent=0)},e.__traitInit&&!e.hasOwnProperty("__traitInit")&&(e.__traitInit=e.__traitInit.slice()),e.__traitInit||(e.__traitInit=[]),e.__traitInit.push(function(e){this._structures=[],this._tabChar="  ",this._codeStr="",this._currentLine="",this._indent=0,this._options=e||{},this._options.globals&&(l=this._options.globals),this._options.accessDenied&&(o=this._options.accessDenied),l||(l={}),t||(r={},t=function(e){return e===r||"undefined"==typeof e},n=function(e){return"undefined"!=typeof e},i=function(e){return e===r?e:void 0===e?r:"undefined"==typeof e?r:e},s=function(e){return e===r?void 0:e})}),e.isKilled=function(){if(this._isKilled)return!0;var e=this.getParentProcess();return e?e.isKilled():void 0},e.isPaused=function(){if(this._isPaused)return!0;var e=this.getParentProcess();return e?e.isPaused():void 0},e.kill=function(){this._isKilled=!0},e.LabeledStatement=function(e,t){this.walk(e.label,t),e.body&&(e.label&&e.label&&(e.body._label=e.label),this.walk(e.body,t))},e.listify=function(e){if(e)for(var t in e)if(e.hasOwnProperty(t)){if("_next"==t)continue;if("range"==t)continue;if("comments"==t)continue;var a=e[t];if(a instanceof Array)for(var r=0;r<a.length;r++){var n=a[r];"object"==typeof n&&(r<a.length-1&&(n._next=a[r+1]),this.listify(n,e))}else"object"==typeof a&&this.listify(a,e)}},e.Literal=function(e){this.out(e.raw),e.eval_res=e.value,e.eval_type=typeof e.value},e.LogicalExpression=function(e,t){this.walk(e.left,t);var a=e.left.eval_res;if(n(a)||(a=this.evalVariable(e.left,t)),a=s(a),"&&"==e.operator&&!a)return void(e.eval_res=a);if("||"==e.operator&&a)return void(e.eval_res=a);this.walk(e.right,t);var r=e.right.eval_res;n(r)||(r=this.evalVariable(e.right,t)),r=s(r),e.eval_res=r},e.MemberExpression=function(e,a){this.walk(e.object,a),e.computed?this.walk(e.property,a):this.walk(e.property,a);var n;n="ThisExpression"==e.object.type?this.findThis(a):this.evalVariable(e.object,a),e.object.eval_res=n;var i;if(e.computed?("Literal"==e.property.type&&(i=e.property.value),"Identifier"==e.property.type&&(i=e.property.eval_res),"undefined"==typeof i&&(i=this.evalVariable(e.property,a))):i=e.property.name,!t(n))try{if(!this.canAccess(n))return console.error("Access denied for object ",n),void(e.eval_res=r);e.eval_res="length"==i&&"function"==typeof n&&"undefined"!=typeof n.__$$pLength__?n.__$$pLength__:n[i]}catch(s){}},e.MetaProperty=function(e,t){var a=e.meta+"."+e.property;e.eval_res=this.evalVariable(a,t)},e.MethodDefinition=function(e,t){e.key&&(this.__insideMethod=!0,"constructor"==e.kind&&this.trigger("ClassConstructor",e),e.static&&this.out("static "),this.walk(e.key,t),this.walk(e.value,t),this.out("",!0),this.__insideMethod=!1)},e.NewExpression=function(e,a){if(e.arguments){var n=this,i=0;e.arguments.forEach(function(e){i++>0&&n.out(", "),n.walk(e,a)})}if(e.callee&&(this.walk(e.callee,a),!t(e.callee.eval_res))){var l=[];if(e.arguments){var o=e.callee.eval_res;if(e.arguments.forEach(function(e){l.push("undefined"!=typeof e.eval_res?s(e.eval_res):s(n.evalVariable(e,a)))}),!n.canAccess(o))return void(e.eval_res=r);var u;0==l.length&&(u=new o),1==l.length&&(u=new o(l[0])),2==l.length&&(u=new o(l[0],l[1])),3==l.length&&(u=new o(l[0],l[1],l[2])),4==l.length&&(u=new o(l[0],l[1],l[2],l[3])),5==l.length&&(u=new o(l[0],l[1],l[2],l[3],l[4])),6==l.length&&(u=new o(l[0],l[1],l[2],l[3],l[4],l[5])),e.eval_res=u}}},e.nlIfNot=function(){var e=this._currentLine.length;e>0&&("{"==this._currentLine[e-1]||";"==this._currentLine[e-1]?this.out("",!0):this.out(";",!0))},e.node_assign=function(e,t,a,n){if(!this.canAccess(a))return void(n.eval_res=r);var s=this;if("MemberExpression"==e.type){var l,o;return l="undefined"!=typeof e.object.eval_res?e.object.eval_res:s.evalVariable(e.object,t),s.canAccess(l)?(o=e.computed?"undefined"!=typeof e.property.eval_res?e.property.eval_res:s.evalVariable(e.property.name,t):e.property.name,void(l&&"undefined"!=typeof o&&(l[o]=i(a),n.eval_res=i(a)))):(console.error("Access denied for object ",l),void(n.eval_res=r))}n.eval_res=i(a),s.assignTo(e.name,t,a)},e.node_assign_update=function(e,t,a){if("MemberExpression"==e.type){var r,n;return r="undefined"!=typeof e.object.eval_res?e.object.eval_res:this.evalVariable(e.object,t),n=e.computed?"undefined"!=typeof e.property.eval_res?e.property.eval_res:this.evalVariable(e.property.name,t):e.property.name,void(r&&n&&(r[n]=a))}this.assignTo(e,t,a)},e.ObjectExpression=function(e,t){var a=this;try{a.out("{");var r=0;e&&e.properties&&(e.properties.length>1&&a.out("",!0),a.indent(1),e.properties.forEach(function(e){r++>0&&a.out(",",!0),a.trigger("ObjectExpressionProperty",e),a.walk(e,t)}),a.indent(-1)),a.out("}"),e.eval_res={},e.properties&&e.properties.forEach(function(r){var n=r.value.eval_res||a.evalVariable(r.value,t),i=r.key.eval_res;"undefined"==typeof i&&(i=a.evalVariable(r.key,t)),e.eval_res[i]=n})}catch(n){console.error(n.message)}},e.ObjectPattern=function(e,t){var a=this;try{a.out("{");var r=0;e&&e.properties&&e.properties.forEach(function(e){r++>0&&a.out(","),a.trigger("ObjectExpressionProperty",e),a.walk(e,t)}),a.out("}")}catch(n){console.error(n.message)}},e.out=function(){},e.prevChar=function(){var e=this._currentLine.length;return e>0?this._currentLine[e-1]:"\n"},e.Program=function(e,t){this.walk(e.body,t,!0)},e.Property=function(e,t){if(this.trigger("ObjectPropertyKey",e.key),this.walk(e.key,t),e.shorthand||(this.out(":"),this.trigger("ObjectPropertyValue",e.value),this.walk(e.value,t)),e.key.computed){var a=this.evalVariable(e.key,t);"undefined"!=typeof a&&(e.key.eval_res=a)}else e.key.eval_res=e.key.name},e.pushStructure=function(e){this._structures||(this._structures=[]),this._structures.push(e)},e.RestElement=function(){},e.ReturnStatement=function(e,t){this.nlIfNot(),this.out("return "),this.trigger("ReturnValue",e.argument),this.walk(e.argument,t),this.out(";");var a=t;if(a.block)for(;a&&a.block;)a=a.parentCtx;throw a.return_value=e.argument?e.argument.eval_res:r,{type:"return"}},e.SequenceExpression=function(e,t){if(e.expressions){var a=this,r=0;this.out("("),e.expressions.forEach(function(n){r++>0&&a.out(","),a.walk(n,t),e.eval_res=n.eval_res}),this.out(")")}},e.setParentProcess=function(e){this._parentProcess=e,e._childProcess||(e._childProcess=[]),e._childProcess.indexOf(this)<0&&e._childProcess.push(e)},e.setPaused=function(e){this._isPaused=e},e.skip=function(){this._skipWalk=!0},e.startBlock=function(){this.out("{",!0),this.indent(1)},e.startCollecting=function(){this._collecting=!0},e.startWalk=function(e,t){this._breakWalk=!1,this._path=[],this._codeStr="",this._currentLine="",t.letVars||(t.letVars={}),t.constVars||(t.constVars={}),t.variables||(t.variables={});var n=this;this.collectVarsAndFns(e,t,function(e){return"VariableDeclaration"==e.type&&e.declarations.forEach(function(e){t.variables[e.id.name]=r}),"FunctionDeclaration"==e.type?(e.eval_res=function(){if(!n.isKilled()){var i=[],s=arguments.length,l=arguments,o={functions:{},vars:{},variables:{},parentCtx:t};o["this"]=this,o.variables.arguments=arguments;for(var u=new a,f=0;s>f;f++)i[f]=arguments[f];var f=0;e.params.forEach(function(a){"undefined"!=typeof l[f]?o.variables[a.name]=l[f]:(o.variables[a.name]=r,e.defaults&&e.defaults[f]&&(n.walk(e.defaults[f],t),o.variables[a.name]=e.defaults[f].eval_res)),f++});try{u.startWalk(e.body,o)}catch(c){if("return"!=c.type)throw c}return o.return_value}},e.eval_res.__$$pLength__=e.params.length,void(e.id&&e.id.name&&(t.variables[e.id.name]=e.eval_res))):void 0}),this.walk(e,t),this.out("",!0)},e.Super=function(){this.out("super")},e.SwitchCase=function(e,t){e.test&&(this.walk(e.test,t),s(e.test.eval_res)==s(t._switchTest.eval_res)&&(t._switchMatch=!0),t._switchMatch&&e.consequent&&this.walk(e.consequent,t))},e.SwitchStatement=function(e,t){this.walk(e.discriminant,t);try{t._switchTest=e.discriminant,t._switchMatch=!1,this.walk(e.cases,t)}catch(a){if("break"!=a.type)throw a}},e.TemplateElement=function(){},e.TemplateLiteral=function(e,t){this.walk(e.expressions,t);for(var a="",r=0;r<e.quasis.length;r++){if(r>0){var n=e.expressions[r-1];a+=s(n.eval_res)}var i=e.quasis[r];a+=i.value.cooked}e.eval_res=a},e.ThisExpression=function(e,t){this.out("this"),e.eval_res=this.findThis(t)},e.ThrowStatement=function(e,t){this.nlIfNot(),this.out("throw "),this.trigger("ThrowArgument",e.argument),this.walk(e.argument,t);var a=e.argument.eval_res;throw"undefined"==typeof a&&(a=this.evalVariable(e.argument,t)),{type:"throw",node:e,value:a}},e.TryStatement=function(e,t){try{this.walk(e.block,t)}catch(a){var r;if(a&&a.type&&("return"==a.type||"break"==a.type||"continue"==a.type))throw a;if(r=a&&"throw"==a.type?a.value:a,e.finalizer&&this.walk(e.finalizer,t),!e.handler)throw a;var n=this.createContext(t);e.handler&&e.handler.param.name&&(n.variables[e.handler.param.name]=r),this.walk(e.handler.body,n)}},e.UnaryExpression=function(e,t){var a=!0;("Identifier"==e.argument.type||"Literal"==e.argument.type)&&(a=!1),this.out(e.operator),"!"!=e.operator&&this.out(" "),a&&this.out("("),this.trigger("UnaryExpressionArgument",e.argument),this.walk(e.argument,t),a&&this.out(")");var n=s(e.argument.eval_res||this.evalVariable(e.argument,t));if("-"==e.operator)return void(e.eval_res=-1*n);if("~"==e.operator)return void(e.eval_res=~n);if("!"==e.operator)return void(e.eval_res=!n);if("+"==e.operator)return void(e.eval_res=+n);if("delete"==e.operator){var i=e.argument;if("MemberExpression"==i.type){var o,u;return o="undefined"!=typeof i.object.eval_res?i.object.eval_res:this.evalVariable(i.object,t),this.canAccess(o)?(u=i.computed?"undefined"!=typeof i.property.eval_res?i.property.eval_res:this.evalVariable(i.property.name,t):i.property.name,void(e.eval_res=o&&u?delete o[u]:!1)):(console.error("Access denied for object ",o),void(e.eval_res=r))}return void(e.eval_res=delete l[n])}return"typeof"==e.operator?void(e.eval_res=typeof n):"void"==e.operator?void(e.eval_res=void n):void console.error("Unknown UnaryExpression ",e.operator)},e.UpdateExpression=function(e,t){var a;this.walk(e.argument,t);var a=e.argument.eval_value;return"undefined"==typeof a&&(a=this.evalVariable(e.argument,t)),"++"==e.operator&&"undefined"!=typeof a?(e.prefix||(e.eval_res=a),a++,e.prefix&&(e.eval_res=a),void this.node_assign_update(e.argument,t,a)):void("--"==e.operator&&"undefined"!=typeof a&&(e.prefix||(e.eval_res=a),a--,e.prefix&&(e.eval_res=a),this.node_assign_update(e.argument,t,a)))},e.VariableDeclaration=function(e,t){var a=this;t._varKind=e.kind,a.walk(e.declarations,t)},e.VariableDeclarator=function(e,t){var a=this;e.id&&a.walk(e.id,t),e.init?(this.out(" = "),a.walk(e.init,t),e.id.name&&(t.variables||(t.variables={}),"var"==t._varKind&&(t.variables[e.id.name]=i(e.init.eval_res)),"let"==t._varKind&&(t.letVars||(t.letVars={}),t.letVars[e.id.name]=i(e.init.eval_res)),"const"==t._varKind&&(t.constVars||(t.constVars={}),t.constVars[e.id.name]=i(e.init.eval_res)))):e.id.name&&(t.variables||(t.variables={}),"var"==t._varKind&&(t.variables[e.id.name]=r),"let"==t._varKind&&(t.letVars||(t.letVars={}),t.letVars[e.id.name]=r),"const"==t._varKind&&(t.constVars||(t.constVars={}),t.constVars[e.id.name]=r))},e.walk=function(e,t){if(e&&!this.isKilled()){if(!t)return console.log("ERROR: no context defined for ",e),void console.trace();if(e instanceof Array){var a=e[0];if(!a)return;this.walk(a,t)}else if(e.type)if(this[e.type]){this[e.type](e,t);var r=e._next;r&&this.walk(r,t)}else console.log("Did not find "+e.type),console.log(e)}},e.walkAsString=function(e,t){var a="";try{this.startCollecting(),this._collectStr="",this._collectLine="",this.walk(e,t),a=this._collectStr,this.endCollecting()}catch(r){}return a},e.WhileStatement=function(e,t){for(var a=1e6;a>0;)try{if(!e.test)break;if(this.walk(e.test,t),!s(e.test.eval_res))break;e.body&&this.walk(e.body,t),a--}catch(r){if(r&&"continue"==r.type){if(!r.label||!r.label.name)continue;if(e._label&&e._label.name==r.label.name)continue}if(r&&"break"==r.type){if(!r.label||!r.label.name)break;if(e._label&&e._label.name==r.label.name)break}throw r}},e.WithStatement=function(){console.error("With statement is not supported")},e.YieldExpression=function(e,t){this.out("yield "),this.walk(e.argument,t)}}(this)},a=function(e,t,r,n,i,s,l,o){var u,f=this;if(!(f instanceof a))return new a(e,t,r,n,i,s,l,o);var c=[e,t,r,n,i,s,l,o];if(f.__factoryClass)if(f.__factoryClass.forEach(function(e){u=e.apply(f,c)}),"function"==typeof u){if(u._classInfo.name!=a._classInfo.name)return new u(e,t,r,n,i,s,l,o)}else if(u)return u;f.__traitInit?f.__traitInit.forEach(function(e){e.apply(f,c)}):"function"==typeof f.init&&f.init.apply(f,c)};a._classInfo={name:"ASTEval"},a.prototype=new t,function(){"undefined"!=typeof define&&null!==define&&null!=define.amd?(e.ASTEval=a,this.ASTEval=a):"undefined"!=typeof module&&null!==module&&null!=module.exports?module.exports.ASTEval=a:this.ASTEval=a}.call(new Function("return this")()),"undefined"!=typeof define&&null!==define&&null!=define.amd&&define(e)}).call(new Function("return this")());