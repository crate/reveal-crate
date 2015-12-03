// Licensed to Crate (https://crate.io) under one or more contributor
// license agreements.  See the NOTICE file distributed with this work for
// additional information regarding copyright ownership.  Crate licenses
// this file to you under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.  You may
// obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the
// License for the specific language governing permissions and limitations
// under the License.
//
// However, if you have executed another commercial license agreement
// with Crate these terms will supersede the license and you may use the
// software solely pursuant to the terms of the relevant commercial agreement.

var RevealCrate = (function() {

  var crateQuerySelector = '[data-crate]';
  var queryResultSelector = 'crate-result';

  var crateAddress = 'localhost';
  var cratePort = 8000;

  var crate = require('node-crate'),
    sqlSections = document.querySelectorAll(crateQuerySelector),
    sqlSection,
    sqlCommand;

  crate.connect(crateAddress, cratePort);
  crate.execute("select * from sys.cluster").error(function(e) {
    console.error("could not connect to crate server", e);
  });

  function format(element) {
    if (typeof element === 'object') {
      return JSON.stringify(element);
      5
    } else {
      return element;
    }
  }

  function getEmptyWrapper(node) {
    var element = node.parentNode.parentNode.querySelector(queryResultSelector);
    if (element !== null) {
      element.innerHTML = '';
    }
    return element;
  }

  for (var i = 0, len = sqlSections.length; i < len; i++) {
    sqlSection = sqlSections[i];

    if (sqlSection.tagName.toUpperCase() === "CODE") {
      sqlSection.setAttribute("style", "cursor:pointer;");

      sqlSection.addEventListener('click', function(event) {
        var code = event.target;
        while (code.tagName.toUpperCase() !== "CODE") {
          code = code.parentNode;
        }
        var wrapperElem = getEmptyWrapper(code);

        var sqlCommand = code.textContent;
        if (sqlCommand.charAt(sqlCommand.length - 1) === ';') {
          sqlCommand = sqlCommand.substr(0, sqlCommand.length - 1)
        }
        console.log(sqlCommand);

        crate.execute(sqlCommand).success(function(res) {
          var wrapperElem = getEmptyWrapper(code);

          if (res.error) {
            res.cols = ["Error"];
            res.rows = [
              [res.error]
            ];
          } else if (res.rows.length == 0 && res.rowcount > 0) {
            res.cols = ["Duration", "Rowcount"];
            res.rows = [
              [res.duration, res.rowcount]
            ];
          }

          // DURATION
          var durationElem = document.createElement("p");
          durationElem.classList.add("crate-result-duration");
          durationElem.innerHTML = "" + res.rowcount + " rows in " + (res.duration / 1000.0) + "s";

          tableElem = document.createElement('table');

          // HEADER
          var headerElems = document.createElement('thead');
          headerElems.classList.add("crate-result-header");
          rowElem = document.createElement('tr');

          res.cols.forEach(function(c, i) {
            rowElem.innerHTML += '<th class="crate-result-header-cell">' + c + "</th>"
          });
          headerElems.appendChild(rowElem);
          // BODY
          var tableBodyElem = document.createElement('tbody');

          res.rows.forEach(function(row, i) {
            var node = document.createElement('tr');
            node.innerHTML = '';
            res.cols.forEach(function(c, i) {
              node.innerHTML += "<td class='crate-result-table-cell'>" + format(row[i]) + "</td>";
            });
            tableBodyElem.appendChild(node);
          });

          console.debug(res.rows);
          tableElem.appendChild(headerElems);
          tableElem.appendChild(tableBodyElem);
          wrapperElem.appendChild(durationElem);
          wrapperElem.appendChild(tableElem);


        }).error(function(e) {
          console.error("could not execute statement:", e);

        });
      })
    }

  }

})();
