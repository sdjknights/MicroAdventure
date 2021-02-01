var playerData = {
  name: "Sir Bob",
  gold: 10,
  day: 0,
};

$("#gold").text(playerData.gold);
$("#day").text(playerData.day);

function startGame() {
  playerData.gold = 10;
  $("#gold").text(playerData.gold);
  playerData.day = 1;
  $("#day").text(playerData.day);
  newEvent("TQ","stg1");
  // newEvent("TQ1");
}

function addGold(amount) {
  playerData.gold = playerData.gold + amount;
  $("#gold").text(playerData.gold);
}

function dayTick() {
  playerData.day = playerData.day + 1;
  $("#day").text(playerData.day);
}

var event = {
  "TQ": {
    stg1: {
      title: "First Day",
      body: "You wake up to a day of beautiful sunshine, birds tweeting their joyous melodies outside of your window. You need a wee",
      options: {
        opt1: {
          requirements: false,
          text: "Spend a penny. And piddle away the day",
          effect: function() {
            addGold(-1);
            dayTick();
            newEvent("TQ","stg2");
          }
        },
        opt2: {
          requirements: false,
          text: "Do nothing all day. Go to next day",
          effect: function() {
            dayTick();
            newEvent("TQ","stg2");
          }
        },
        },
      },
    stg2: {
      title: "Next step",
      body: "Carrying on that event",
      options: {
        opt1: {
          requirements: false,
          text: "Earn gold then start new quest",
          effect: function() {
            addGold(1);
            newEvent("NQ","stg1");
          }
        },
        opt2: {
          requirements: false,
          text: "Go to new quest without getting any gold",
          effect: function() {
            newEvent("NQ","stg1");
          }
        },
        opt3: {
          requirements: function() {
            if (playerData.gold >= 10) {
              return true;
            } else {
              return false;
            }
          },
          text: "This option is available to you because you gots 10 or more gold",
          effect: function() {
            addGold(-5);
            dayTick();
            newEvent("TQ","stg2");
          },
          },
      }
    },
  }
};

function newEvent(currentEvent, index) {
  // get random event

  // Display event
  $("#eventTitle").text(event[currentEvent][index].title);
  $("#eventBody").text(event[currentEvent][index].body);

  //Remove buttons and functionality from previous
  $("#eventOptions input").remove();
  $("#eventOptions").unbind("click");

  addOptions();

  function addOptions() {
    var i;
    //for each option
    for (i in event[currentEvent][index].options) {
      var newButton = $('<input/>').attr({
        id: i,
        type: "button",
        class: "btn btn-secondary optionButton",
        value: event[currentEvent][index].options[i].text,
      });
      var e = [i, currentEvent, index];
      //if option doesn't have any requirements, make new button
      if (event[currentEvent][index].options[i].requirements === false) {
        makeNewButton(newButton, e, i);
      } else {
        //if option does have requirements, check if requirements are met. if so, make new button
        console.log(event[currentEvent][index].options[i].requirements());
        if (event[currentEvent][index].options[i].requirements() === true) {
          makeNewButtonSpecial(newButton, e, i);
        } else {
        }
      }
    }
  }
}

function makeNewButton(newButton, e, i) {
  $("#eventOptions").append(newButton);
  $("#eventOptions").on("click", (("#") + i), e, optionEffect);
}

function makeNewButtonSpecial(newButton, e, i) {
  $("#eventOptions").append(newButton);
  $("#eventOptions").on("click", (("#") + i), e, optionEffect);
  $("#"+i).addClass("buttonSpecial");
  // .append("<img class='theImg' src='images/coin.svg'/>");
}

function optionEffect(e) {
  event[e.data[1]][e.data[2]].options[e.data[0]].effect();
  // event[e.data[1]].options[e.data[0]].effect();
}
