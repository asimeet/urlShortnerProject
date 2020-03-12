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
        longUrl = longUrl.trim();
        if(longUrl.indexOf('http')<0 && longUrl.indexOf('https') < 0){
            longUrl = `http://${longUrl}`;
        }
        let validUrl = longUrl.match(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g);
        if(!validUrl || validUrl.length == 0){
            alert('You entered an invalid URL\nPlease Try Again');
            return;
        }
        var xhttp = new XMLHttpRequest();
        let ref = this;
        xhttp.onreadystatechange = function (err,data) {
            if (this.readyState == 4 && this.status == 200) {
                ref.renderResult(JSON.parse(this.response));
            }
            if(this.status === 500){
                alert(this.statusText);
                this.abort();
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
                ref.renderAdminData(this.response);
            };
            if(this.status === 500){
                alert(this.statusText);
                this.abort();
            }
        }
        xhttp.open("POST", `${this.config.baseAppUrl}/admin-data`, true);
        xhttp.setRequestHeader("Content-type", "application/json");
        let body = JSON.stringify({
            pass: pass
        });
        xhttp.send(body);

    }
    renderAdminData(responseIn) {
        let resObj = JSON.parse(responseIn);
        let plotData = {
            x: [],
            y: [],
            type: "scatter"
        }
        let hidePlot = '';
        if (resObj.data) {
            resObj.data.forEach(item => {
                let date = new Date(item.createdAt);
                date.setSeconds(0,0);
                date = date.toISOString();
                let foundIndex;
                let dateFound = plotData.x.find((item, index) => {
                    if (item == date) {
                        foundIndex = index;
                        return true;
                    }
                });
                if (dateFound) {
                    plotData.y[foundIndex] = plotData.y[foundIndex] + 1;
                } else {
                    plotData.x.push(date);
                    plotData.y.push(1);

                    foundIndex = undefined;
                }

            });
        }else{
            hidePlot = `hidden`;
        }
        var HTMLStr = `
            <head>
                <!-- Load plotly.js into the DOM -->
                <script src='https://cdn.plot.ly/plotly-latest.min.js'></script>
            
            </head>
            
            
            <body>
                <div id="total" ${hidePlot}><h2>Number of URLs Shortened So Far: ${resObj.totalUrlCreated}</h2></div>
                <div id="plot" ${hidePlot}><!-- Plotly chart will be drawn inside this DIV --></div>
                <div id="total"><h2>Details</h2></div>
                <pre id="json">${JSON.stringify(resObj, undefined, 2)}</pre>
            </body>
            
            <script>
            var data = [
                ${JSON.stringify(plotData)}
            ];
            
            Plotly.newPlot('plot', data);
            
            </script>`;

        let newWindow = window.open("data:text/json,",
            "_blank");

        newWindow.document.write(HTMLStr);

        newWindow.focus();
    }
}


module.exports = ViewInjector;