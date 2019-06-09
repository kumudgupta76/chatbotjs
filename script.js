function getResponse(msg) {
      words=msg.split(' ');
      var balance=parseInt(localStorage.getItem('balance'));
      var inttrans=parseInt(localStorage.getItem('transactions'));
      var outputstring="";
      var amount=parseInt(words[1]);
      var remark=words[2]+' '+words[3];
      if(!balance)
      {
            balance=0;
            inttrans=0;
      }
      if(words[0]=='received'||words[0]=='got')
      {
            //alert("game");
            localStorage.setItem("transactions",inttrans+1);
            localStorage.setItem("balance",balance+amount);
            localStorage.setItem(2*inttrans+1,amount);
            localStorage.setItem(2*inttrans+2,remark);

      }
      else if(words[0]=='spent'||words[0]=='paid')
      {
            localStorage.setItem("transactions",inttrans+1);
            localStorage.setItem("balance",balance-amount);
            localStorage.setItem(2*inttrans+1,-amount);
            localStorage.setItem(2*inttrans+2,remark);
      }
      else if(words[0]=='show')
      {
            for (var i=0;i<localStorage.getItem("transactions");i++)
            {
                  amounthere=parseInt(localStorage.getItem(2*i+1));
                  if(amounthere<0)
                  {
                        outputstring+="debitted"+" amount:"+(-amounthere)+" remark:"+localStorage.getItem(2*i+2)+"\n";
                  }
                  else
                  {
                        outputstring+="credited"+" amount:"+(amounthere)+" remark:"+localStorage.getItem(2*i+2)+"\n";
                  }
            }
      }
      else
      {
            outputstring+="Sorry, I didn't get you.\n";
      }
      outputstring+="Your balance is "+localStorage.getItem("balance")+"\n";
      console.log(outputstring);
      return outputstring;
}

function getBotResponse(msg) {
      var botResponse = getResponse(msg);
      var newMsg = document.createElement('div');
      var att = document.createAttribute("class");
      att.value = "chat-bot";
      newMsg.setAttributeNode(att);
      newMsg.appendChild(document.createTextNode(botResponse));
      document.getElementById('chat-area').appendChild(newMsg);
      var objDiv = document.getElementById("chat-area");
      objDiv.scrollTop = objDiv.scrollHeight;
}

function userSent() {
      var msg = document.getElementById('composer').value;
      while(msg.charAt(0)==='\n' || msg.charAt(0)===' ') {
            msg = msg.substr(1);
      }
      if (msg !== '') {
            var newMsg = document.createElement('div');
            var att = document.createAttribute("class");
            att.value = "chat-user";
            newMsg.setAttributeNode(att);
            newMsg.appendChild(document.createTextNode(msg));
            document.getElementById('chat-area').appendChild(newMsg);
            var objDiv = document.getElementById("chat-area");
            objDiv.scrollTop = objDiv.scrollHeight;
            document.getElementById('composer').value = '';
            getBotResponse(msg);
      }
}

function enterpress(e, textarea) {
      var code = (e.keyCode ? e.keyCode : e.which);
      if(code == 13) {
            userSent();
      }
}
document.getElementById('sendButton').addEventListener('click', userSent);

var avtar = document.createElement('div');
var cl = document.createAttribute("class");
cl.value = "avatar avatar-user";
avtar.setAttributeNode(cl);

var avtarbot = document.createElement('div');
var clbot = document.createAttribute("class");
clbot.value = "avatar avatar-bot";
avtarbot.setAttributeNode(clbot);

document.getElementById('chat-area').appendChild(avtar);
document.getElementById('chat-area').appendChild(avtarbot);

document.getElementById('startButton').addEventListener('click', function() {
      this.style.display = 'none';
      document.getElementById('compose-area').style.display = 'block';
});