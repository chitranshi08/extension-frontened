console.log("abcd")


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', afterDOMLoaded);
} else {
    afterDOMLoaded();
}
function findUpTag(el, tag) {
    while (el.parentNode) {
        el = el.parentNode;
        if (el.tagName === tag)
            return el;
    }
    return null;
}

 
function afterDOMLoaded() {
    var googleSheet = ""
     chrome.storage.sync.get({
    googleSheet: '',
  }, function(items) {
    googleSheet = items.googleSheet
    console.log(items)
  });

    console.log('DOM fully loaded and parsed');
    console.log(document.querySelector("div[aria-label='Approve']"))
                document.addEventListener("click", function(event) {
                    event.stopPropagation()
                    event.stopImmediatePropagation()
                	var a = findUpTag(event.target, "DIV"); 
                    if ( event.target.getAttribute("name") == "approve" || (a && (a.getAttribute("aria-label") == "Approve" || a.className.includes("rq0escxv"))) ) {

                        var questions = document.querySelectorAll("div.dati1w0a ul li span.lrazzd5p")
                        var answers = document.querySelectorAll("div.dati1w0a ul li span.oo9gr5id")
                        if(questions.length == 0){
                          questions = document.querySelectorAll("div._4wsr ul li div._50f8")
                           answers = document.querySelectorAll("div._4wsr ul li text")
 
                        }


                        var details = [];

                        for (i = 0; i < questions.length; i++) {
                            details.push(answers[i].innerHTML)
                        }
                        var body = {
                            "questionList": details,
                            "googleSheet": googleSheet
                        }
                        if(details.length > 0){
                            fetch("http://localhost:3000/submit-questions", {
                                    method: "POST",
                                    body: JSON.stringify(body),
                                    headers: {
                                        "content-type": "application/json"
                                    }
                                })
                                .then((response) => response.text())
                                .then((response) => {
                                    console.log(response)
                                })
                                .catch((err) => {
                                    console.log(err)
                                })
                        }

                    }
                   },true) 
}