# -*- coding: utf-8; -*-
#
# Licensed to CRATE Technology GmbH ("Crate") under one or more contributor
# license agreements.  See the NOTICE file distributed with this work for
# additional information regarding copyright ownership.  Crate licenses
# this file to you under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.  You may
# obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
# WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the
# License for the specific language governing permissions and limitations
# under the License.
#
# However, if you have executed another commercial license agreement
# with Crate these terms will supersede the license and you may use the
# software solely pursuant to the terms of the relevant commercial agreement.

from http.server import SimpleHTTPRequestHandler, HTTPServer
import os
import sys
import signal
import argparse
import threading
import json
from crate.client.http import Client
from crate.client.exceptions import ProgrammingError
import urllib.parse


class CrateHTTPServer(HTTPServer):
    def __init__(self, *args, **kwargs):
        crate_hosts = kwargs.pop("crate_hosts")
        self.crate_client = Client(crate_hosts, timeout=5)
        super(CrateHTTPServer, self).__init__(*args, **kwargs)


class CrateHandler(SimpleHTTPRequestHandler):

    def do_POST(self):
        path = urllib.parse.urlparse(self.path)
        if path.path == "/_sql":
            length = int(self.headers["Content-Length"])
            content = self.rfile.read(length).decode("utf-8")
            try:
                response = self.server.crate_client._request('POST', self.path, data=content)
                res = response.data.decode('utf-8')
            except ProgrammingError as err:
                res = json.dumps({"error": err.message})
            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.send_header("Content-Length", len(res))
            self.end_headers()
            self.wfile.write(res.encode("utf-8"))
        else:
            return self.do_GET()

    def translate_path(self, path):
        return os.path.join(os.getcwd(), 'framework', path.lstrip('/'))


def serve(port, hosts):
    httpd = CrateHTTPServer(('', port), CrateHandler, crate_hosts=hosts)
    httpd_thread = threading.Thread(target=httpd.serve_forever)
    signal.signal(signal.SIGHUP, lambda x, y: httpd.shutdown())
    signal.signal(signal.SIGINT, lambda x, y: httpd.shutdown())
    httpd_thread.start()
    httpd_thread.join()


def main():
    parser = argparse.ArgumentParser(prog='crate_presentation_server', description='server a directory and proxy queries to crate')
    parser.add_argument("-p", "--port", dest="port", type=int, default=8000)
    parser.add_argument('--hosts', type=str, nargs='*',
                        help='the crate hosts to connect to', metavar='HOST')
    args = parser.parse_args(sys.argv[1:])
    serve(args.port, args.hosts)

if __name__ == '__main__':
    main()
