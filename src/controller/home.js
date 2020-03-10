class ViewInjector {
    constructor(config) {
        this.config = config;
        this.urlObj = {
            longUrl: "",
            shortUrl: ""
        };
    }
    getShortenedUrl() {
        let longUrl = document.getElementById("input-url").value;
        var xhttp = new XMLHttpRequest();
        let ref = this;
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                ref.renderResult(JSON.parse(this.response));
            }
        };
        xhttp.open("POST", `${this.config.baseAppUrl}/shorten-url`, true);
        xhttp.setRequestHeader("Content-type", "application/json");
        let body = JSON.stringify({
            longUrl: longUrl
        });
        xhttp.send(body);
    }
    renderResult(responseIn) {
        let linkNode;
        linkNode = document.getElementById('linkNode');
        linkNode.href = responseIn.shortUrl;
        linkNode.target = responseIn.shortUrl;
        linkNode.innerText = responseIn.shortUrl;
        let resultDiv = document.getElementById('results');
        resultDiv.appendChild(linkNode);
        resultDiv.hidden = false;
    }
    showPass() {
        document.getElementById("passwd").hidden = false;
    }
    getAdminData() {
        let pass = document.getElementById("pass").value;
        var xhttp = new XMLHttpRequest();
        let ref = this;
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var data = `<html><body><pre>${JSON.stringify(this.response)}</pre></body></html>`;
                let something = window.open("data:text/json,",
                    "_blank");
                something.document.write(this.response);
                something.focus();
            }
        };
        xhttp.open("POST", `${this.config.baseAppUrl}/admin-data`, true);
        xhttp.setRequestHeader("Content-type", "application/json");
        let body = JSON.stringify({
            pass: pass
        });
        xhttp.send(body);

    }
}


module.exports = ViewInjector;