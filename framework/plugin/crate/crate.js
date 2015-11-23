var RevealCrate = (function() {
    var crate = require('node-crate'),
        sqlSections = document.querySelectorAll('[data-crate]'),
        sqlSection,
        sqlCommand;

    crate.connect('localhost', 4200);
    crate.execute("select * from sys.cluster").error(function (e) {
        console.error("could not connect to crate server", e);
    });

    function format(element) {
        if (typeof element === 'object') {
            return JSON.stringify(element);
        } else {
            return element;
        }
    }



    function addResultTable(node, table) {
        var resultTable = node.parentNode.parentNode.querySelector('.crate-result');
        if (resultTable !== null) {
            resultTable.remove();
        }
        node.parentNode.parentNode.appendChild(table);
    }

    function removeResultTable(node) {
        var element = node.parentNode.parentNode.querySelector('.crate-result');
        if (element !== null) {
            element.remove();
        }
    }

    for( var i = 0, len = sqlSections.length; i < len; i++ ) {
        sqlSection = sqlSections[i];
        if (sqlSection.tagName.toUpperCase() === "CODE") {
            sqlSection.setAttribute("style", "cursor:pointer;");
            sqlSection.addEventListener('click', function (event) {
                var code = event.target;
                while (code.tagName.toUpperCase() !== "CODE") {
                    code = code.parentNode;
                }
                removeResultTable(code);
                var sqlCommand = code.textContent;
                if (sqlCommand.charAt(sqlCommand.length-1) === ';') {
                    sqlCommand = sqlCommand.substr(0, sqlCommand.length-1)
                }
                console.log(sqlCommand);
                crate.execute(sqlCommand).success(function(res){
                    if(res.error){
                        res.cols = ["Error"];
                        res.rows = [[res.error]];
                    } else if (res.rows.length == 0 && res.rowcount > 0){
                        res.cols = ["Duration", "Rowcount"];
                        res.rows = [[res.duration, res.rowcount]];
                    }
                    console.debug(res.rows);
                    var resultTable = document.createElement('table');
                    var header = '<thead><tr>';
                    for (i=0; i<res.cols.length; i++) {
                        header += '<th>' + res.cols[i] + '</th>';
                    }
                    header += '</tr></thead>';
                    var body = '<tbody>';
                    for (var i=0; i<res.rows.length; i++) {
                        body += '<tr>';
                        for (var j=0; j < res.rows[i].length; j++) {
                            body += '<td>' + format(res.rows[i][j]) + '</td>';
                        }
                        body += '</tr>';
                    }
                    body += '</tbody>';
                    resultTable.innerHTML = header + body;
                    resultTable.setAttribute("style", "font-size:20pt;");
                    var pre = document.createElement("pre");
                    pre.setAttribute("style", "margin-top:2em;overflow-x:scroll;padding:8px;");
                    pre.setAttribute("class", "crate-result");
                    pre.appendChild(resultTable);
                    addResultTable(code, pre);
                }).error(function(e) {
                    console.error("could not execute statement:", e);

                });
            })
        }

    }

})();
