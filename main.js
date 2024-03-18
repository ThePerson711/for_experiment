
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
  input_go: 600,
  setting_come: 600,
  setting_go: 600
}
let innerText = "";
let pre_LP = 0;
let lines = [];
let add_list_position = -100;
let Setting_ = {
  theme: "dark",
  font_size: 22,
  font_style: "roboto"
};
let TextValue = {
  input: "",
  reader: ""
};
let ListOfWords = [];


const AddList = document.getElementById("add_list");
const ReadList = document.getElementById("read_list");
const SettingList = document.getElementById("setting_list");

//localStorage.removeItem("Settings_data");
//localStorage.removeItem("Text_Value_data");


if (localStorage.getItem("List_Of_Words") !== null) {
  (JSON.parse(localStorage.getItem("List_Of_Words"))).forEach(element => {
    ListOfWords.push(element);
  });
}

console.log(ListOfWords)

if ((localStorage.getItem("Settings_data")) !== null) {
  Setting_ = {
    theme: JSON.parse(localStorage.getItem("Settings_data")).theme,
    font_size: JSON.parse(localStorage.getItem("Settings_data")).font_size,
    font_style: JSON.parse(localStorage.getItem("Settings_data")).font_style
  };
}

if (localStorage.getItem("Text_Value_data") !== null) {
  if (JSON.parse(localStorage.getItem("Text_Value_data")).reader === "") {
    NewList();
  } else {
    TextValue = {
      input: JSON.parse(localStorage.getItem("Text_Value_data")).input,
      reader: JSON.parse(localStorage.getItem("Text_Value_data")).reader
    }
    TextAllPage(TextValue.reader);  
  }
}

document.documentElement.setAttribute('page-theme',"dark");
document.documentElement.setAttribute('text-size',"22");

FontSizeChange(Setting_.font_size);
FontStyleChange(Setting_.font_style);
PageThemeChange(Setting_.theme);

//TextAllPage();

//StartClicked();
//SettingsS();

function  SetSetingToLS() {
  (localStorage.setItem("Settings_data", JSON.stringify({
    theme: Setting_.theme,
    font_size: Setting_.font_size,
    font_style: Setting_.font_style
  })))
}

function SetTextValueToLC() {
  localStorage.setItem("Text_Value_data", JSON.stringify({
    input: TextValue.input,
    reader: TextValue.reader
  }))
}

function SetWordToList(new_word_) {
  ListOfWords.push(new_word_);
  localStorage.setItem("List_Of_Words", JSON.stringify(ListOfWords));
}


function FontSizeChange(font_size_) {
  document.getElementById(`font_size_${Setting_.font_size}`).classList.remove("selected_setting");
  document.getElementById(`font_size_${font_size_}`).classList.add("selected_setting");  
  document.documentElement.setAttribute('text-size', `${font_size_}`);
  Setting_.font_size = font_size_;
  SetSetingToLS();
}

function FontStyleChange(font_style_) {
  document.getElementById(`font_style_${Setting_.font_style}`).classList.remove("selected_setting");
  document.getElementById(`font_style_${font_style_}`).classList.add("selected_setting");  
  document.documentElement.setAttribute('text-style', `${font_style_}`);
  Setting_.font_style = font_style_;
  SetSetingToLS();
}

function PageThemeChange(page_theme_) {
  document.getElementById(`theme_${Setting_.theme}`).classList.remove("selected_setting");
  document.getElementById(`theme_${page_theme_}`).classList.add("selected_setting");  
  document.documentElement.setAttribute('page-theme', `${page_theme_}`);
  Setting_.theme = page_theme_;
  SetSetingToLS();
}

//document.getElementById("input_text").value = shablon;
function FixText() {
  pre_LP = 0;
  lines = [];
  innerText = document.getElementById("input_text").value;

  for (let i = 0; i < innerText.length; i++) {
    if (innerText.substr(i, 1) === "\n" || i === innerText.length-1) {
      lines.push(innerText.substr(pre_LP, (i - pre_LP)))
      pre_LP = i+1;
    }
  }
  console.table("t>", lines)
}

function TextAllPage(reader_text_) {
  //FixText();
 // ReadList.innerHTML = "";
  //lines.forEach(element => {
  //  ReadList.innerHTML += `<p>${element}</p>`;
  //});
  document.getElementById("text_p").innerHTML = reader_text_;
  document.getElementById("scroll_list").scrollTop = 0;
  TextValue.reader = reader_text_;
  SetTextValueToLC();
}

function SettingsS() {
  setting_list_position = 200;
  id_set_go_list = setInterval(() => {
    setting_list_position -= 5;
    if (setting_list_position <= 50) {
      setting_list_position = 50;
      SettingList.style = `left: 50%;`;
      //StartClicked();
      clearInterval(id_set_go_list);
    } else {
      SettingList.style = `left: ${setting_list_position}%;`;
    }
  }, (Interval.setting_come / 30) );
}

function SettingClose() {
  setting_list_position = 50;
  id_set_back_list = setInterval(() => {
    setting_list_position += 5;
    if (setting_list_position >= 200) {
      setting_list_position = 200;
      SettingList.style = `left: 200%;`;
      //StartClicked();
      clearInterval(id_set_back_list);
    } else {
      SettingList.style = `left: ${setting_list_position}%;`;
    }
  }, (Interval.setting_come / 30) );
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
  //if (document.getElementById("input_text").value.length < 10) {
  //}
  add_list_position = 50;
  id_start_list = setInterval(() => {
    add_list_position -= 5;
    if (add_list_position <= -100) {
      EnteredText = document.getElementById("input_text").value;
      MainInterval(true);
      TextAllPage(EnteredText);
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
  console.log("safas")

  if (bool_ === true) {
    id_main_interval = setInterval(() => {
      console.log("//////")
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
  console.log("asfasf");
  id.push();
  id[num_] = setInterval(() => {
    if ( localStorage.getItem(`answer_fi_${num_}`) === "true" ) {
      data_text_ = localStorage.getItem(`answer_tr_${num_}`);
      //SetWordToList(data_text_);
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


