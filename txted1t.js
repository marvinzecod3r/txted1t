const body = document.body;
const bar = body.querySelector("#bar");
const txt = body.querySelector("#txtedit");
var virutalfile = {};
txt.value = 'Welcome to Texted1t v1.00.';
txt.value += '\nCurrent Cmdlets:\n~> ":open"/":o" : Open\n~> ":write"/":w" : Write\n~> ":quit"/":q" : Quit\n~> ":new"/":n" : New Document';
txt.value += '\n~> ESC : CmdletBar\n~> I : Insert mode.';
txt.value += '\n####====##### VIRTUAL FILES #####====#####';
txt.value += '\n~> ":load"/":l" : Loads Virtual File';
txt.value += '\n~> ":save"/":s" : Saves Virtual File';
txt.value += '\n~> ":list"/":li" : List Virutal Files';
txt.value += '\n\nEnjoy using Texted1t :D';


let fileHandle;
async function openFile() {
  const [fileHandle] = await window.showOpenFilePicker();
  let file = await fileHandle.getFile();
  let content = await file.text();
  txt.value = content;
}


async function saveFile() {
  let  newHandle = await window.showSaveFilePicker();
  const writableStream = await newHandle.createWritable();
  let content = txt.value;
  await writableStream.write(content);
  await writableStream.close();
}

txt.addEventListener("keydown", function(event) {  
    bar.value = "key_" + event.key;
    if (event.key === "Escape") {
        bar.focus();
        bar.value = "";
        event.preventDefault();
    }
});


var vim_cmd = {};

vim_cmd[":o"] = openFile;
vim_cmd[":w"] = saveFile;
vim_cmd[":q"] = function(){window.close();};
vim_cmd[":n"] = function(){txt.value="";};


vim_cmd[":l"] = function(raw){txt.value=virutalfile[raw.split(" ")[1]];};
vim_cmd[":s"] = function(raw){virutalfile[raw.split(" ")[1]]=txt.value;};
vim_cmd[":li"] = function(){setTimeout(function(){
  bar.value = "vfiles: " + virtualfile.keys().join(" ");
}, 1000)};
vim_cmd[":c"] = function(raw){
if(raw.split(" ")[1] == "red"){txt.value="color set 2 red";bar.style.color = "red";txt.style.color = "red";}
}

vim_cmd[":open"] = vim_cmd[":o"];
vim_cmd[":write"] = vim_cmd[":w"];
vim_cmd[":quit"] = vim_cmd[":q"];
vim_cmd[":new"] = vim_cmd[":n"];
vim_cmd[":load"] = vim_cmd[":l"];
vim_cmd[":save"] = vim_cmd[":s"];

bar.addEventListener("keydown", function(event) {
    if (bar.value === "" && event.key == "i") {
       event.preventDefault();        
       txt.focus();
    };
    if (event.key == "Enter") {
      if(vim_cmd[bar.value.split(" ")[0]]) vim_cmd[bar.value.split(" ")[0]](bar.value);

      event.preventDefault();        
      txt.focus();
      bar.value="";
    };
});

bar.focus();