define(["modules/default/defaultcontroller"],function(a){function b(){}return b.prototype=$.extend(!0,{},a),b.prototype.moduleInformation={name:"Object editor",description:"Display and/or modify a JSON object",author:"Michaël Zasso",date:"29.08.2014",license:"MIT"},b.prototype.references={value:{label:"A JSON object"},output:{label:"Output object"}},b.prototype.events={onObjectChange:{label:"The object has changed",refVariable:["output"]},onObjectSend:{label:"The object was sent",refVariable:["output"]}},b.prototype.variablesIn=["value"],b.prototype.configurationStructure=function(){return{groups:{group:{options:{type:"list"},fields:{editable:{type:"combo",title:"Editable ?",options:[{title:"No",key:"view"},{title:"Yes",key:"tree"},{title:"Text",key:"text"}],default:"view"},expanded:{type:"checkbox",title:"Auto-expand JSON",options:{expand:"Yes"}},storeObject:{type:"checkbox",title:"Store object in view",options:{expand:"Yes"}},displayValue:{type:"checkbox",title:"Display value",options:{display:"Yes"}},output:{type:"combo",title:"Output result",options:[{title:"Modified input object",key:"modified"},{title:"New object",key:"new"}],default:"new"},storedObject:{type:"jscode",title:"Object stored in view",default:"{}"}}}}}},b.prototype.configAliases={editable:["groups","group",0,"editable",0],expanded:["groups","group",0,"expanded",0],storeObject:["groups","group",0,"storeObject",0],displayValue:["groups","group",0,"displayValue",0],storedObject:["groups","group",0,"storedObject",0],output:["groups","group",0,"output",0]},b.prototype.sendValue=function(a,b){this.module.view.storeObject&&(this.module.definition.configuration.groups.group[0].storedObject[0]=JSON.stringify(a)),this.module.model._latestData=a;var c=this.module.getConfiguration("output");if("new"===c)this.createDataFromEvent(b,"output",a);else{var d=this.module.view.inputData;d&&(d.mergeWith(a,this.module.getId()),this.setVarFromEvent(b,"output","value",[]))}},b});