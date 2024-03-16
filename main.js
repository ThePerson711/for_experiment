
let shablon = `Do you ever get that feeling of not being able to tell when you’re full? Or 
eating out of pure boredom? Fasting can help solve those problems. By 
structuring your day around everything apart from eating, your body 
eventually gets accustomed to not feeling hungry all the time. During the 
Holy month of Ramadan, many Muslims who are partaking in the obligatory 
fasts will experience many cravings during the fasting day, only to find that 
they are not able to consume much upon opening their fast. This is due to 
the fact that the less you put into your stomach over a length of time, the 
more the stomach shrinks - leading you to feel full after just a small amount 
of food.
As our bodies get accustomed to how often we eat, a few days of 
intermittent fasting can drastically decrease our appetite in the long run. 
Upon breaking the fast, the human body cannot consume a large amount 
comfortably as the stomach shrinks – leading you to feel satisfied after a 
smaller meal than usual. This process also increases the production of the 
thyroid hormone in the body, boosting your metabolism in the process.`;



let id_main_interval;
let EnteredText = "";
let changed = true;
let selected_text = "";
let id = [null];
let ind_ = 0;
let Interval = {
  input_come: 600,
  input_go: 30
}
let innerText = "";
let pre_LP = 0;
let lines = [];
let add_list_position = -100;


const AddList = document.getElementById("add_list");
const ReadList = document.getElementById("read_list");

document.documentElement.setAttribute('page-theme',"dark");
document.documentElement.setAttribute('text-size',"22");

//TextAllPage();
//NewList();
StartClicked();

function FixText() {
  pre_LP = 0;
  lines = [];
  innerText = document.getElementById("input_text").value;
  for (let i = 0; i < innerText.length; i++) {
    if (innerText.substr(i, 1) === "\n") {
      lines.push(innerText.substr(pre_LP, (i - pre_LP)))
      pre_LP = i+1;
    }
  }
  console.table(lines)
}

function TextAllPage() {
  FixText();
  lines.forEach(element => {
    ReadList.innerHTML += `<p>${element}</p>`;
  });
  //document.getElementById("text_p").innerHTML = EnteredText;
  document.getElementById("scroll_list").scrollTop = 0;
}

function NewList() {
  document.getElementById("input_text").value = "";
  MainInterval(false);
  add_list_position = -100;
  id_add_list = setInterval(() => {
    add_list_position += 5;
    if (add_list_position >= 50) {
      add_list_position = 50;
      AddList.style = `left: 50%;`;
      //StartClicked();
      clearInterval(id_add_list);
    } else {
      AddList.style = `left: ${add_list_position}%;`;
    }
  }, (Interval.input_come / 30) );
}

function StartClicked() {
  document.getElementById("input_text").value = shablon;
  add_list_position = 50;
  id_start_list = setInterval(() => {
    add_list_position -= 5;
    if (add_list_position <= -100) {
      EnteredText = document.getElementById("input_text").value;
      MainInterval(true);
      TextAllPage();
      AddList.style = `left: -100%;`;
      clearInterval(id_start_list);
    } else {
      AddList.style = `left: ${add_list_position}%;`;
    }
  }, (Interval.input_go / 30));
}

document.addEventListener('selectionchange', ()=>{
  changed = false;
  setTimeout(() => {
    changed = true;
  }, 500);
});

function MainInterval(bool_) {
  if (bool_ === true) {
    id_main_interval = setInterval(() => {
      if (changed) {
        if (selected_text !== window.getSelection().toString() && 
            window.getSelection().toString() !== " " &&
            window.getSelection().toString() !== "" &&
            window.getSelection().toString().length < 500)  {
          selected_text = window.getSelection().toString();
          ind_++;
          localStorage.setItem(`answer_fi_${ind_}`, "false");
          TranslateText(ind_, "en", "uz", selected_text);
          f1(ind_);
        }
      }
    }, 100);
  } else if (bool_ === false) {
    clearInterval(id_main_interval);
  }
}

function f1(num_) {
  id.push();
  id[num_] = setInterval(() => {
    if ( localStorage.getItem(`answer_fi_${num_}`) === "true" ) {
      data_text_ = localStorage.getItem(`answer_tr_${num_}`);
      if (data_text_.length < 25) {
        document.getElementById("translate_panel").innerHTML = data_text_;
      } else {
        // pop up list ??? !!!
        alert(data_text_);
      }
      localStorage.removeItem(`answer_tr_${num_}`);
      localStorage.removeItem(`answer_fi_${num_}`);
      clearInterval(id[num_]);
    }
  }, 100);
}


