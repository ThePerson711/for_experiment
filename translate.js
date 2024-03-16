//
// Tranlate text 
/*
    TranslateText("en", "uz", text_);
*/
/*
 async function TranslateText(language_from_, langugage_to_, context_) {
    let answer_from_tr = "";
    let apiUrl = `https://api.mymemory.translated.net/get?q=${context_}&langpair=${language_from_}|${langugage_to_}`;
    
    fetch(apiUrl).then(res => res.json()).then(data => {
        localStorage.setItem("answer_from_tr_data", data.responseData.translatedText);
    })

    answer_from_tr = localStorage.getItem("answer_from_tr_data");
    localStorage.removeItem("answer_from_tr_data");
    return answer_from_tr;
}*/
function TranslateText(num_, language_from_, langugage_to_, context_) {
    let answer_from_tr = "?";
    let apiUrl = `https://api.mymemory.translated.net/get?q=${context_}&langpair=${language_from_}|${langugage_to_}`;
    fetch(apiUrl).then(res => res.json()).then(data => {
        localStorage.setItem(`answer_tr_${num_}`, data.responseData.translatedText);
        localStorage.setItem(`answer_fi_${num_}`, "true");
    })
}