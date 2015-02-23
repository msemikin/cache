(function (window, document, navigator, undefined) {
    "use strict";
    var localStorage = window.localStorage || window.mozLocalStorage || window.webkitLocalStorage;
    window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem || window.mozRequestFileSystem;
    window.URL = window.URL || window.webkitURL || window.mozURL;
    window.Blob = window.Blob || window.webkitBlob || window.mozBlob;
    var ArrayPrototype = Array.prototype,
        libsRoot = {};
    var _browserInfo = (navigator.userAgent || "").toLowerCase(),
        history = window.history,
        /**
         * @description версии браузеров
         */
        _versions = {
            "msie": ((/(?:msie\s([0-9a-z,.]+);)/).exec(_browserInfo) || [])[1] || '',
            "opera": ((/(?:version\/([0-9a-z,.]+))$/).exec(_browserInfo) || [])[1] || '',
            "chrome": ((/(?:chrome\/([0-9a-z,.]+)\s)/).exec(_browserInfo) || [])[1] || '',
            "firefox": ((/(?:firefox\/([0-9a-z,.]+))$/).exec(_browserInfo) || [])[1] || '',
            "safari": ((/(?:version\/([0-9a-z,.]+)\s)/).exec(_browserInfo) || [])[1] || ''
        },

        /**
         * @description может прити и с текстом (14.0b.1)
         */
        browser,
        versionArr;

    for (browser in _versions) {
        if (_versions.hasOwnProperty(browser)) {
            versionArr = _versions[browser].replace(/[^0-9\.,]/, '').split(/[\.,]/);
            _versions[browser] = +(versionArr.shift() + '.' + versionArr.join('')) || 0;
        }
    }

    browser = {
        language: (navigator.systemLanguage || navigator.language.split('-')[0]).toLowerCase(),

        isSupportHistoryAPI: function () {
            return !!(window.history.pushState && window.history.replaceState);
        },

        /**
         *
         * @param container
         * @returns {*}
         */
        setFieldsType: function (container) {
            container = container || document;

            var type,
                elements = container.getElementsByTagName('input'),
                i,
                len = elements ? elements.length : 0;

            for (i = len - 1; i >= 0; i--) {
                type = elements[i].attributes['data-type'];

                if (type && type.value) {
                    // в Safari возвращается не строка, а число, например, 01 -> 1, 09 -> 9  и т.д.
                    if (type.value == "number" && this.isIOSDevice()) {
                        elements[i].pattern = '[0-9]*';
                    } else {
                        elements[i].type = type.value;
                    }
                }
            }

            return container;
        },

        isIPhone: function () {
            return (_browserInfo.indexOf("iphone") > -1);
        },

        isIPad: function () {
            return (_browserInfo.indexOf("ipad") > -1);
        },

        isIPod: function () {
            return (_browserInfo.indexOf("ipod") > -1);
        },

        isIPadWebView: function () {
            return (_browserInfo.indexOf("applewebkit") > -1 && _browserInfo.indexOf("mobile") > -1);
        },

        isIOSDevice: function () {
            return this.isIPad() || this.isIPod() || this.isIPhone() || this.isIPadWebView();
        },

        isAndroidDevice: function () {
            return (_browserInfo.indexOf("android") > -1);
        },

        isWindowsMobileDevice: function () {
            return (_browserInfo.indexOf("windows phone") > -1);
        },

        isMobileDevice: function () {
            return this.isIOSDevice() || this.isAndroidDevice() || this.isWindowsMobileDevice();
        },

        isOpera: function () {
            return (_browserInfo.indexOf('opera') > -1);
        },

        isChrome: function () {
            return (_browserInfo.indexOf('chrome') > -1);
        },

        isFireFox: function () {
            return (_browserInfo.indexOf('firefox') > -1);
        },

        isMSIE: function () {
            return (_browserInfo.indexOf('msie') > -1);
        },

        isSafari: function () {
            return (_browserInfo.indexOf('safari') > -1);
        }
    };
    /**
     *
     * @param obj
     * @returns {*}
     */
    function clone(obj) {
        return copy({}, obj);
    }
    /**
     *
     * @param obj
     * @returns {*}
     */
    function copy(obj) {
        var prop,
            i,
            dataObj,
            data = ArrayPrototype.slice.call(arguments, 1),
            len = data.length;

        obj = obj || {};

        for (i = 0; i < len; i++) {
            for (prop in data[i]) {
                if (data[i].hasOwnProperty(prop)) {
                    dataObj = data[i][prop];

                    if (dataObj instanceof Array) {
                        obj[prop] = dataObj.slice(0);
                    } else if (dataObj != null && typeof dataObj === 'object') {
                        obj[prop] = copy({}, obj[prop], dataObj);
                    } else {
                        obj[prop] = dataObj;
                    }
                }
            }
        }

        return obj;
    }

    function getA4DimensionCSSRules() {
        return {
            width: {
                value: 792,
                unit: "pt"
            },
            height: {
                value: 612,
                unit: "pt"
            }
        };
    }
    var mimeTypesByExtension = {
        "png": "image/png",
        "jpg": "image/jpeg",
        "jpeg": "image/jpeg",
        "gif": "image/gif"
    };
    /**
     *
     * @param filename
     * @returns {string}
     */
    function getMimeTypeByName(filename) {
        var extensionData = (/[A-Za-z]+$/).exec(filename),
            defaultType = "";

        if (extensionData) {
            return mimeTypesByExtension[extensionData[0].toLowerCase()] || defaultType;
        }

        return defaultType;
    }

    function isFunction(value) {
        return typeof value === 'function';
    }
    if (!Object.keys) {
        Object.keys = (function () {
            'use strict';
            var hasOwnProperty = Object.prototype.hasOwnProperty,
                hasDontEnumBug = !({
                    toString: null
                }).propertyIsEnumerable('toString'),
                dontEnums = [
                    'toString',
                    'toLocaleString',
                    'valueOf',
                    'hasOwnProperty',
                    'isPrototypeOf',
                    'propertyIsEnumerable',
                    'constructor'
                ],
                dontEnumsLength = dontEnums.length;

            return function (obj) {
                if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
                    throw new TypeError('Object.keys called on non-object');
                }

                var result = [],
                    prop, i;

                for (prop in obj) {
                    if (hasOwnProperty.call(obj, prop)) {
                        result.push(prop);
                    }
                }

                if (hasDontEnumBug) {
                    for (i = 0; i < dontEnumsLength; i++) {
                        if (hasOwnProperty.call(obj, dontEnums[i])) {
                            result.push(dontEnums[i]);
                        }
                    }
                }
                return result;
            };
        }());
    }

    function once(func) {
        var ran,
            result;

        if (!isFunction(func)) {
            throw new TypeError;
        }
        return function () {
            if (ran) {
                return result;
            }
            ran = true;
            result = func.apply(this, arguments);

            // clear the `func` variable so the function may be garbage collected
            func = null;
            return result;
        };
    }
    /*
 Copyright (c) 2012 Gildas Lormeau. All rights reserved.
 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:
 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.
 2. Redistributions in binary form must reproduce the above copyright
 notice, this list of conditions and the following disclaimer in
 the documentation and/or other materials provided with the distribution.
 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.
 THIS SOFTWARE IS PROVIDED ``AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
    (function (window, namespace) {
        var ERR_BAD_FORMAT = "File format is not recognized.";
        var ERR_ENCRYPTED = "File contains encrypted entry.";
        var ERR_ZIP64 = "File is using Zip64 (4gb+ file size).";
        var ERR_READ = "Error while reading zip file.";
        var ERR_WRITE_DATA = "Error while writing file data.";
        var ERR_READ_DATA = "Error while reading file data.";
        var CHUNK_SIZE = 512 * 1024;
        var Blob = window.Blob;
        var appendABViewSupported;

        function isAppendABViewSupported() {
            if (typeof appendABViewSupported == "undefined") {
                var blob;
                blob = new Blob([getDataHelper(0).view]);
                appendABViewSupported = blob.size == 0;
            }
            return appendABViewSupported;
        }

        function Crc32() {
            var crc = -1,
                that = this;
            that.append = function (data) {
                var offset, table = that.table;
                for (offset = 0; offset < data.length; offset++) {
                    crc = (crc >>> 8) ^ table[(crc ^ data[offset]) & 0xFF];
                }
            };
            that.get = function () {
                return~ crc;
            };
        }

        Crc32.prototype.table = (function () {
            var i, j, t, table = [];
            for (i = 0; i < 256; i++) {
                t = i;
                for (j = 0; j < 8; j++) {
                    if (t & 1) {
                        t = (t >>> 1) ^ 0xEDB88320;
                    } else {
                        t = t >>> 1;
                    }
                }
                table[i] = t;
            }
            return table;
        }());

        function blobSlice(blob, index, length) {
            return blob.slice(index, index + length);
        }

        function getDataHelper(byteLength, bytes) {
            var dataBuffer, dataArray;
            dataBuffer = new ArrayBuffer(byteLength);
            dataArray = new Uint8Array(dataBuffer);
            if (bytes) {
                dataArray.set(bytes, 0);
            }
            return {
                buffer: dataBuffer,
                array: dataArray,
                view: new DataView(dataBuffer)
            };
        }

        // Readers
        function Reader() {}

        function BlobReader(blob) {
            var that = this;

            function init(callback) {
                this.size = blob.size;
                callback();
            }

            function readUint8Array(index, length, callback, onerror) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    callback(new Uint8Array(e.target.result));
                };
                reader.onerror = onerror;
                reader.readAsArrayBuffer(blobSlice(blob, index, length));
            }

            that.size = 0;
            that.init = init;
            that.readUint8Array = readUint8Array;
        }

        BlobReader.prototype = new Reader();
        BlobReader.prototype.constructor = BlobReader;

        // Writers
        function Writer() {}

        Writer.prototype.getData = function (callback) {
            callback(this.data);
        };

        function BlobWriter(contentType) {
            var blob,
                that = this;

            function init(callback) {
                callback();
            }

            function writeUint8Array(array, callback) {
                var blobOptions = {};

                if (contentType) {
                    blobOptions.type = contentType;
                }

                blob = new Blob([isAppendABViewSupported() ? array : array.buffer], blobOptions);
                callback();
            }

            function getData(callback) {
                callback(blob);
            }

            that.init = init;
            that.writeUint8Array = writeUint8Array;
            that.getData = getData;
        }

        BlobWriter.prototype = new Writer();
        BlobWriter.prototype.constructor = BlobWriter;

        function launchProcess(process, reader, writer, offset, size, onappend, onprogress, onend, onreaderror, onwriteerror) {
            var chunkIndex = 0,
                index, outputSize = 0;

            function step() {
                var outputData;
                index = chunkIndex * CHUNK_SIZE;
                if (index < size) {
                    reader.readUint8Array(offset + index, Math.min(CHUNK_SIZE, size - index), function (inputData) {
                        var outputData = process.append(inputData, function () {
                            if (onprogress) {
                                onprogress(offset + index, size);
                            }
                        });
                        outputSize += outputData.length;
                        onappend(true, inputData);
                        writer.writeUint8Array(outputData, function () {
                            onappend(false, outputData);
                            chunkIndex++;
                            setTimeout(step, 1);
                        }, onwriteerror);
                        if (onprogress) {
                            onprogress(index, size);
                        }
                    }, onreaderror);
                } else {
                    outputData = process.flush();
                    if (outputData) {
                        outputSize += outputData.length;
                        writer.writeUint8Array(outputData, function () {
                            onappend(false, outputData);
                            onend(outputSize);
                        }, onwriteerror);
                    } else {
                        onend(outputSize);
                    }
                }
            }

            step();
        }

        function inflate(reader, writer, offset, size, computeCrc32, onend, onprogress, onreaderror, onwriteerror) {
            var crc32 = new Crc32();

            function oninflateappend(sending, array) {
                if (computeCrc32 && !sending) {
                    crc32.append(array);
                }
            }

            function oninflateend(outputSize) {
                onend(outputSize, crc32.get());
            }

            launchProcess(new namespace.zip.Inflater(), reader, writer, offset, size, oninflateappend, onprogress, oninflateend, onreaderror, onwriteerror);
            return null;
        }

        function copy(reader, writer, offset, size, computeCrc32, onend, onprogress, onreaderror, onwriteerror) {
            var chunkIndex = 0,
                crc32 = new Crc32();

            function step() {
                var index = chunkIndex * CHUNK_SIZE;
                if (index < size) {
                    reader.readUint8Array(offset + index, Math.min(CHUNK_SIZE, size - index), function (array) {
                        if (computeCrc32) {
                            crc32.append(array);
                        }
                        if (onprogress) {
                            onprogress(index, size, array);
                        }
                        writer.writeUint8Array(array, function () {
                            chunkIndex++;
                            step();
                        }, onwriteerror);
                    }, onreaderror);
                } else {
                    onend(size, crc32.get());
                }
            }

            step();
        }

        // ZipReader
        function decodeASCII(str) {
            var i, out = "",
                charCode, extendedASCII = ['\u00C7', '\u00FC', '\u00E9', '\u00E2', '\u00E4', '\u00E0', '\u00E5', '\u00E7', '\u00EA', '\u00EB',
                    '\u00E8', '\u00EF', '\u00EE', '\u00EC', '\u00C4', '\u00C5', '\u00C9', '\u00E6', '\u00C6', '\u00F4', '\u00F6', '\u00F2', '\u00FB', '\u00F9',
                    '\u00FF', '\u00D6', '\u00DC', '\u00F8', '\u00A3', '\u00D8', '\u00D7', '\u0192', '\u00E1', '\u00ED', '\u00F3', '\u00FA', '\u00F1', '\u00D1',
                    '\u00AA', '\u00BA', '\u00BF', '\u00AE', '\u00AC', '\u00BD', '\u00BC', '\u00A1', '\u00AB', '\u00BB', '_', '_', '_', '\u00A6', '\u00A6',
                    '\u00C1', '\u00C2', '\u00C0', '\u00A9', '\u00A6', '\u00A6', '+', '+', '\u00A2', '\u00A5', '+', '+', '-', '-', '+', '-', '+', '\u00E3',
                    '\u00C3', '+', '+', '-', '-', '\u00A6', '-', '+', '\u00A4', '\u00F0', '\u00D0', '\u00CA', '\u00CB', '\u00C8', 'i', '\u00CD', '\u00CE',
                    '\u00CF', '+', '+', '_', '_', '\u00A6', '\u00CC', '_', '\u00D3', '\u00DF', '\u00D4', '\u00D2', '\u00F5', '\u00D5', '\u00B5', '\u00FE',
                    '\u00DE', '\u00DA', '\u00DB', '\u00D9', '\u00FD', '\u00DD', '\u00AF', '\u00B4', '\u00AD', '\u00B1', '_', '\u00BE', '\u00B6', '\u00A7',
                    '\u00F7', '\u00B8', '\u00B0', '\u00A8', '\u00B7', '\u00B9', '\u00B3', '\u00B2', '_', ' '
                ];
            for (i = 0; i < str.length; i++) {
                charCode = str.charCodeAt(i) & 0xFF;
                if (charCode > 127) {
                    out += extendedASCII[charCode - 128];
                } else {
                    out += String.fromCharCode(charCode);
                }
            }
            return out;
        }

        function decodeUTF8(str_data) {
            var tmp_arr = [],
                i = 0,
                ac = 0,
                c1 = 0,
                c2 = 0,
                c3 = 0;
            str_data += '';
            while (i < str_data.length) {
                c1 = str_data.charCodeAt(i);
                if (c1 < 128) {
                    tmp_arr[ac++] = String.fromCharCode(c1);
                    i++;
                } else if (c1 > 191 && c1 < 224) {
                    c2 = str_data.charCodeAt(i + 1);
                    tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
                    i += 2;
                } else {
                    c2 = str_data.charCodeAt(i + 1);
                    c3 = str_data.charCodeAt(i + 2);
                    tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }
            }
            return tmp_arr.join('');
        }

        function getString(bytes) {
            var i, str = "";
            for (i = 0; i < bytes.length; i++) {
                str += String.fromCharCode(bytes[i]);
            }
            return str;
        }

        function getDate(timeRaw) {
            var date = (timeRaw & 0xffff0000) >> 16,
                time = timeRaw & 0x0000ffff;
            try {
                return new Date(1980 + ((date & 0xFE00) >> 9), ((date & 0x01E0) >> 5) - 1, date & 0x001F, (time & 0xF800) >> 11, (time & 0x07E0) >> 5, (time & 0x001F) * 2, 0);
            } catch (e) {}

            return date;
        }

        function readCommonHeader(entry, data, index, centralDirectory) {
            entry.version = data.view.getUint16(index, true);
            entry.bitFlag = data.view.getUint16(index + 2, true);
            entry.compressionMethod = data.view.getUint16(index + 4, true);
            entry.lastModDateRaw = data.view.getUint32(index + 6, true);
            entry.lastModDate = getDate(entry.lastModDateRaw);
            if ((entry.bitFlag & 0x01) === 0x01) {
                onerror(ERR_ENCRYPTED);
                return;
            }
            if (centralDirectory || (entry.bitFlag & 0x0008) != 0x0008) {
                entry.crc32 = data.view.getUint32(index + 10, true);
                entry.compressedSize = data.view.getUint32(index + 14, true);
                entry.uncompressedSize = data.view.getUint32(index + 18, true);
            }
            if (entry.compressedSize === 0xFFFFFFFF || entry.uncompressedSize === 0xFFFFFFFF) {
                onerror(ERR_ZIP64);
                return;
            }
            entry.filenameLength = data.view.getUint16(index + 22, true);
            entry.extraFieldLength = data.view.getUint16(index + 24, true);
        }

        function createZipReader(reader, onerror) {
            function Entry() {}

            Entry.prototype.getData = function (writer, onend, onprogress, checkCrc32) {
                var that = this,
                    worker;

                function terminate(callback, param) {
                    if (worker) {
                        worker.terminate();
                    }
                    worker = null;
                    if (callback) {
                        callback(param);
                    }
                }

                function testCrc32(crc32) {
                    var dataCrc32 = getDataHelper(4);
                    dataCrc32.view.setUint32(0, crc32);
                    return that.crc32 == dataCrc32.view.getUint32(0);
                }

                function getWriterData(uncompressedSize, crc32) {
                    if (checkCrc32 && !testCrc32(crc32)) {
                        onreaderror();
                    } else {
                        writer.getData(function (data) {
                            terminate(onend, data);
                        });
                    }
                }

                function onreaderror() {
                    terminate(onerror, ERR_READ_DATA);
                }

                function onwriteerror() {
                    terminate(onerror, ERR_WRITE_DATA);
                }

                reader.readUint8Array(that.offset, 30, function (bytes) {
                    var data = getDataHelper(bytes.length, bytes),
                        dataOffset;
                    if (data.view.getUint32(0) != 0x504b0304) {
                        onerror(ERR_BAD_FORMAT);
                        return;
                    }
                    readCommonHeader(that, data, 4);
                    dataOffset = that.offset + 30 + that.filenameLength + that.extraFieldLength;
                    writer.init(function () {
                        if (that.compressionMethod === 0) {
                            copy(reader, writer, dataOffset, that.compressedSize, checkCrc32, getWriterData, onprogress, onreaderror, onwriteerror);
                        } else {
                            worker = inflate(reader, writer, dataOffset, that.compressedSize, checkCrc32, getWriterData, onprogress, onreaderror, onwriteerror);
                        }
                    }, onwriteerror);
                }, onreaderror);
            };
            return {
                getEntries: function (callback) {
                    if (reader.size < 22) {
                        onerror(ERR_BAD_FORMAT);
                        return;
                    }
                    reader.readUint8Array(reader.size - 22, 22, function (bytes) {
                        var dataView = getDataHelper(bytes.length, bytes).view,
                            datalength, fileslength;
                        if (dataView.getUint32(0) != 0x504b0506) {
                            onerror(ERR_BAD_FORMAT);
                            return;
                        }
                        datalength = dataView.getUint32(16, true);
                        fileslength = dataView.getUint16(8, true);
                        reader.readUint8Array(datalength, reader.size - datalength, function (bytes) {
                            var i, index = 0,
                                entries = [],
                                entry, filename, comment, data = getDataHelper(bytes.length, bytes);

                            for (i = 0; i < fileslength; i++) {
                                entry = new Entry();
                                if (data.view.getUint32(index) != 0x504b0102) {
                                    onerror(ERR_BAD_FORMAT);
                                    return;
                                }
                                readCommonHeader(entry, data, index + 6, true);
                                entry.commentLength = data.view.getUint16(index + 32, true);
                                entry.directory = ((data.view.getUint8(index + 38) & 0x10) == 0x10);
                                entry.offset = data.view.getUint32(index + 42, true);
                                filename = getString(data.array.subarray(index + 46, index + 46 + entry.filenameLength));
                                entry.filename = ((entry.bitFlag & 0x0800) === 0x0800) ? decodeUTF8(filename) : decodeASCII(filename);
                                if (!entry.directory && entry.filename.charAt(entry.filename.length - 1) == "/") {
                                    entry.directory = true;
                                }
                                comment = getString(data.array.subarray(index + 46 + entry.filenameLength + entry.extraFieldLength, index + 46 + entry.filenameLength + entry.extraFieldLength + entry.commentLength));
                                entry.comment = ((entry.bitFlag & 0x0800) === 0x0800) ? decodeUTF8(comment) : decodeASCII(comment);
                                entries.push(entry);
                                index += 46 + entry.filenameLength + entry.extraFieldLength + entry.commentLength;
                            }
                            callback(entries);
                        }, function () {
                            onerror(ERR_READ);
                        });
                    }, function () {
                        onerror(ERR_READ);
                    });
                },
                close: function (callback) {
                    if (callback) {
                        callback();
                    }
                }
            };
        }

        namespace.zip = {
            Reader: Reader,
            Writer: Writer,
            BlobReader: BlobReader,
            BlobWriter: BlobWriter,
            createReader: function (reader, callback, onerror) {
                reader.init(function () {
                    callback(createZipReader(reader, onerror));
                }, onerror);
            }
        };
        /*
     Copyright (c) 2012 Gildas Lormeau. All rights reserved.

     Redistribution and use in source and binary forms, with or without
     modification, are permitted provided that the following conditions are met:

     1. Redistributions of source code must retain the above copyright notice,
     this list of conditions and the following disclaimer.

     2. Redistributions in binary form must reproduce the above copyright
     notice, this list of conditions and the following disclaimer in
     the documentation and/or other materials provided with the distribution.

     3. The names of the authors may not be used to endorse or promote products
     derived from this software without specific prior written permission.

     THIS SOFTWARE IS PROVIDED ``AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
     INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
     FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
     INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
     INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
     LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
     OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
     LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
     NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
     EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
     */

        /*
         * This program is based on JZlib 1.0.2 ymnk, JCraft,Inc.
         * JZlib is based on zlib-1.1.3, so all credit should go authors
         * Jean-loup Gailly(jloup@gzip.org) and Mark Adler(madler@alumni.caltech.edu)
         * and contributors of zlib.
         */
        // Global

        var MAX_BITS = 15;
        var D_CODES = 30;
        var BL_CODES = 19;

        var LENGTH_CODES = 29;
        var LITERALS = 256;
        var L_CODES = (LITERALS + 1 + LENGTH_CODES);
        var HEAP_SIZE = (2 * L_CODES + 1);

        var END_BLOCK = 256;

        // Bit length codes must not exceed MAX_BL_BITS bits
        var MAX_BL_BITS = 7;

        // repeat previous bit length 3-6 times (2 bits of repeat count)
        var REP_3_6 = 16;

        // repeat a zero length 3-10 times (3 bits of repeat count)
        var REPZ_3_10 = 17;

        // repeat a zero length 11-138 times (7 bits of repeat count)
        var REPZ_11_138 = 18;

        // The lengths of the bit length codes are sent in order of decreasing
        // probability, to avoid transmitting the lengths for unused bit
        // length codes.

        var Buf_size = 8 * 2;

        // JZlib version : "1.0.2"
        var Z_DEFAULT_COMPRESSION = -1;

        // compression strategy
        var Z_FILTERED = 1;
        var Z_HUFFMAN_ONLY = 2;
        var Z_DEFAULT_STRATEGY = 0;

        var Z_NO_FLUSH = 0;
        var Z_PARTIAL_FLUSH = 1;
        var Z_FULL_FLUSH = 3;
        var Z_FINISH = 4;

        var Z_OK = 0;
        var Z_STREAM_END = 1;
        var Z_NEED_DICT = 2;
        var Z_STREAM_ERROR = -2;
        var Z_DATA_ERROR = -3;
        var Z_BUF_ERROR = -5;

        // Tree

        // see definition of array dist_code below
        var DIST_CODE_LEN = 512;

        var _dist_code = [0, 1, 2, 3, 4, 4, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
            10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,
            12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13,
            13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14,
            14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14,
            14, 14, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
            15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 0, 0, 16, 17, 18, 18, 19, 19,
            20, 20, 20, 20, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
            24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26,
            26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27,
            27, 27, 27, 27, 27, 27, 27, 27, 27, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28,
            28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 29,
            29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29,
            29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29
        ];

        function Tree() {
            var that = this;

            // dyn_tree; // the dynamic tree
            // max_code; // largest code with non zero frequency
            // stat_desc; // the corresponding static tree

            // Compute the optimal bit lengths for a tree and update the total bit
            // length
            // for the current block.
            // IN assertion: the fields freq and dad are set, heap[heap_max] and
            // above are the tree nodes sorted by increasing frequency.
            // OUT assertions: the field len is set to the optimal bit length, the
            // array bl_count contains the frequencies for each bit length.
            // The length opt_len is updated; static_len is also updated if stree is
            // not null.
            function gen_bitlen(s) {
                var tree = that.dyn_tree;
                var stree = that.stat_desc.static_tree;
                var extra = that.stat_desc.extra_bits;
                var base = that.stat_desc.extra_base;
                var max_length = that.stat_desc.max_length;
                var h; // heap index
                var n, m; // iterate over the tree elements
                var bits; // bit length
                var xbits; // extra bits
                var f; // frequency
                var overflow = 0; // number of elements with bit length too large

                for (bits = 0; bits <= MAX_BITS; bits++)
                    s.bl_count[bits] = 0;

                // In a first pass, compute the optimal bit lengths (which may
                // overflow in the case of the bit length tree).
                tree[s.heap[s.heap_max] * 2 + 1] = 0; // root of the heap

                for (h = s.heap_max + 1; h < HEAP_SIZE; h++) {
                    n = s.heap[h];
                    bits = tree[tree[n * 2 + 1] * 2 + 1] + 1;
                    if (bits > max_length) {
                        bits = max_length;
                        overflow++;
                    }
                    tree[n * 2 + 1] = bits;
                    // We overwrite tree[n*2+1] which is no longer needed

                    if (n > that.max_code) {
                        continue;
                    } // not a leaf node

                    s.bl_count[bits]++;
                    xbits = 0;
                    if (n >= base) {
                        xbits = extra[n - base];
                    }
                    f = tree[n * 2];
                    s.opt_len += f * (bits + xbits);
                    if (stree) {
                        s.static_len += f * (stree[n * 2 + 1] + xbits);
                    }
                }
                if (overflow === 0) {
                    return;
                }

                // This happens for example on obj2 and pic of the Calgary corpus
                // Find the first bit length which could increase:
                do {
                    bits = max_length - 1;
                    while (s.bl_count[bits] === 0)
                        bits--;
                    s.bl_count[bits]--; // move one leaf down the tree
                    s.bl_count[bits + 1] += 2; // move one overflow item as its brother
                    s.bl_count[max_length]--;
                    // The brother of the overflow item also moves one step up,
                    // but this does not affect bl_count[max_length]
                    overflow -= 2;
                } while (overflow > 0);

                for (bits = max_length; bits !== 0; bits--) {
                    n = s.bl_count[bits];
                    while (n !== 0) {
                        m = s.heap[--h];
                        if (m > that.max_code) {
                            continue;
                        }
                        if (tree[m * 2 + 1] != bits) {
                            s.opt_len += (bits - tree[m * 2 + 1]) * tree[m * 2];
                            tree[m * 2 + 1] = bits;
                        }
                        n--;
                    }
                }
            }

            // Reverse the first len bits of a code, using straightforward code (a
            // faster
            // method would use a table)
            // IN assertion: 1 <= len <= 15
            function bi_reverse(code, // the value to invert
                len // its bit length
            ) {
                var res = 0;
                do {
                    res |= code & 1;
                    code >>>= 1;
                    res <<= 1;
                } while (--len > 0);
                return res >>> 1;
            }

            // Generate the codes for a given tree and bit counts (which need not be
            // optimal).
            // IN assertion: the array bl_count contains the bit length statistics for
            // the given tree and the field len is set for all tree elements.
            // OUT assertion: the field code is set for all tree elements of non
            // zero code length.
            function gen_codes(tree, // the tree to decorate
                max_code, // largest code with non zero frequency
                bl_count // number of codes at each bit length
            ) {
                var next_code = []; // next code value for each
                // bit length
                var code = 0; // running code value
                var bits; // bit index
                var n; // code index
                var len;

                // The distribution counts are first used to generate the code values
                // without bit reversal.
                for (bits = 1; bits <= MAX_BITS; bits++) {
                    next_code[bits] = code = ((code + bl_count[bits - 1]) << 1);
                }

                // Check that the bit counts in bl_count are consistent. The last code
                // must be all ones.
                // Assert (code + bl_count[MAX_BITS]-1 == (1<<MAX_BITS)-1,
                // "inconsistent bit counts");
                // Tracev((stderr,"\ngen_codes: max_code %d ", max_code));

                for (n = 0; n <= max_code; n++) {
                    len = tree[n * 2 + 1];
                    if (len === 0) {
                        continue;
                    }
                    // Now reverse the bits
                    tree[n * 2] = bi_reverse(next_code[len]++, len);
                }
            }

            // Construct one Huffman tree and assigns the code bit strings and lengths.
            // Update the total bit length for the current block.
            // IN assertion: the field freq is set for all tree elements.
            // OUT assertions: the fields len and code are set to the optimal bit length
            // and corresponding code. The length opt_len is updated; static_len is
            // also updated if stree is not null. The field max_code is set.
            that.build_tree = function (s) {
                var tree = that.dyn_tree;
                var stree = that.stat_desc.static_tree;
                var elems = that.stat_desc.elems;
                var n, m; // iterate over heap elements
                var max_code = -1; // largest code with non zero frequency
                var node; // new node being created

                // Construct the initial heap, with least frequent element in
                // heap[1]. The sons of heap[n] are heap[2*n] and heap[2*n+1].
                // heap[0] is not used.
                s.heap_len = 0;
                s.heap_max = HEAP_SIZE;

                for (n = 0; n < elems; n++) {
                    if (tree[n * 2] !== 0) {
                        s.heap[++s.heap_len] = max_code = n;
                        s.depth[n] = 0;
                    } else {
                        tree[n * 2 + 1] = 0;
                    }
                }

                // The pkzip format requires that at least one distance code exists,
                // and that at least one bit should be sent even if there is only one
                // possible code. So to avoid special checks later on we force at least
                // two codes of non zero frequency.
                while (s.heap_len < 2) {
                    node = s.heap[++s.heap_len] = max_code < 2 ? ++max_code : 0;
                    tree[node * 2] = 1;
                    s.depth[node] = 0;
                    s.opt_len--;
                    if (stree) {
                        s.static_len -= stree[node * 2 + 1];
                    }
                    // node is 0 or 1 so it does not have extra bits
                }
                that.max_code = max_code;

                // The elements heap[heap_len/2+1 .. heap_len] are leaves of the tree,
                // establish sub-heaps of increasing lengths:

                for (n = Math.floor(s.heap_len / 2); n >= 1; n--)
                    s.pqdownheap(tree, n);

                // Construct the Huffman tree by repeatedly combining the least two
                // frequent nodes.

                node = elems; // next internal node of the tree
                do {
                    // n = node of least frequency
                    n = s.heap[1];
                    s.heap[1] = s.heap[s.heap_len--];
                    s.pqdownheap(tree, 1);
                    m = s.heap[1]; // m = node of next least frequency

                    s.heap[--s.heap_max] = n; // keep the nodes sorted by frequency
                    s.heap[--s.heap_max] = m;

                    // Create a new node father of n and m
                    tree[node * 2] = (tree[n * 2] + tree[m * 2]);
                    s.depth[node] = Math.max(s.depth[n], s.depth[m]) + 1;
                    tree[n * 2 + 1] = tree[m * 2 + 1] = node;

                    // and insert the new node in the heap
                    s.heap[1] = node++;
                    s.pqdownheap(tree, 1);
                } while (s.heap_len >= 2);

                s.heap[--s.heap_max] = s.heap[1];

                // At this point, the fields freq and dad are set. We can now
                // generate the bit lengths.

                gen_bitlen(s);

                // The field len is now set, we can generate the bit codes
                gen_codes(tree, that.max_code, s.bl_count);
            };

        }

        Tree._length_code = [0, 1, 2, 3, 4, 5, 6, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 12, 12, 13, 13, 13, 13, 14, 14, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16,
            16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20,
            20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22,
            22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
            24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
            25, 25, 25, 25, 25, 25, 25, 25, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26,
            26, 26, 26, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 28
        ];

        Tree.base_length = [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14, 16, 20, 24, 28, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 0];

        Tree.base_dist = [0, 1, 2, 3, 4, 6, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192, 256, 384, 512, 768, 1024, 1536, 2048, 3072, 4096, 6144, 8192, 12288, 16384,
            24576
        ];

        // Mapping from a distance to a distance code. dist is the distance - 1 and
        // must not have side effects. _dist_code[256] and _dist_code[257] are never
        // used.
        Tree.d_code = function (dist) {
            return ((dist) < 256 ? _dist_code[dist] : _dist_code[256 + ((dist) >>> 7)]);
        };

        // extra bits for each length code
        Tree.extra_lbits = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0];

        // extra bits for each distance code
        Tree.extra_dbits = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];

        // extra bits for each bit length code
        Tree.extra_blbits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7];

        Tree.bl_order = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];

        // StaticTree

        function StaticTree(static_tree, extra_bits, extra_base, elems, max_length) {
            var that = this;
            that.static_tree = static_tree;
            that.extra_bits = extra_bits;
            that.extra_base = extra_base;
            that.elems = elems;
            that.max_length = max_length;
        }

        StaticTree.static_ltree = [12, 8, 140, 8, 76, 8, 204, 8, 44, 8, 172, 8, 108, 8, 236, 8, 28, 8, 156, 8, 92, 8, 220, 8, 60, 8, 188, 8, 124, 8, 252, 8, 2, 8,
            130, 8, 66, 8, 194, 8, 34, 8, 162, 8, 98, 8, 226, 8, 18, 8, 146, 8, 82, 8, 210, 8, 50, 8, 178, 8, 114, 8, 242, 8, 10, 8, 138, 8, 74, 8, 202, 8, 42,
            8, 170, 8, 106, 8, 234, 8, 26, 8, 154, 8, 90, 8, 218, 8, 58, 8, 186, 8, 122, 8, 250, 8, 6, 8, 134, 8, 70, 8, 198, 8, 38, 8, 166, 8, 102, 8, 230, 8,
            22, 8, 150, 8, 86, 8, 214, 8, 54, 8, 182, 8, 118, 8, 246, 8, 14, 8, 142, 8, 78, 8, 206, 8, 46, 8, 174, 8, 110, 8, 238, 8, 30, 8, 158, 8, 94, 8,
            222, 8, 62, 8, 190, 8, 126, 8, 254, 8, 1, 8, 129, 8, 65, 8, 193, 8, 33, 8, 161, 8, 97, 8, 225, 8, 17, 8, 145, 8, 81, 8, 209, 8, 49, 8, 177, 8, 113,
            8, 241, 8, 9, 8, 137, 8, 73, 8, 201, 8, 41, 8, 169, 8, 105, 8, 233, 8, 25, 8, 153, 8, 89, 8, 217, 8, 57, 8, 185, 8, 121, 8, 249, 8, 5, 8, 133, 8,
            69, 8, 197, 8, 37, 8, 165, 8, 101, 8, 229, 8, 21, 8, 149, 8, 85, 8, 213, 8, 53, 8, 181, 8, 117, 8, 245, 8, 13, 8, 141, 8, 77, 8, 205, 8, 45, 8,
            173, 8, 109, 8, 237, 8, 29, 8, 157, 8, 93, 8, 221, 8, 61, 8, 189, 8, 125, 8, 253, 8, 19, 9, 275, 9, 147, 9, 403, 9, 83, 9, 339, 9, 211, 9, 467, 9,
            51, 9, 307, 9, 179, 9, 435, 9, 115, 9, 371, 9, 243, 9, 499, 9, 11, 9, 267, 9, 139, 9, 395, 9, 75, 9, 331, 9, 203, 9, 459, 9, 43, 9, 299, 9, 171, 9,
            427, 9, 107, 9, 363, 9, 235, 9, 491, 9, 27, 9, 283, 9, 155, 9, 411, 9, 91, 9, 347, 9, 219, 9, 475, 9, 59, 9, 315, 9, 187, 9, 443, 9, 123, 9, 379,
            9, 251, 9, 507, 9, 7, 9, 263, 9, 135, 9, 391, 9, 71, 9, 327, 9, 199, 9, 455, 9, 39, 9, 295, 9, 167, 9, 423, 9, 103, 9, 359, 9, 231, 9, 487, 9, 23,
            9, 279, 9, 151, 9, 407, 9, 87, 9, 343, 9, 215, 9, 471, 9, 55, 9, 311, 9, 183, 9, 439, 9, 119, 9, 375, 9, 247, 9, 503, 9, 15, 9, 271, 9, 143, 9,
            399, 9, 79, 9, 335, 9, 207, 9, 463, 9, 47, 9, 303, 9, 175, 9, 431, 9, 111, 9, 367, 9, 239, 9, 495, 9, 31, 9, 287, 9, 159, 9, 415, 9, 95, 9, 351, 9,
            223, 9, 479, 9, 63, 9, 319, 9, 191, 9, 447, 9, 127, 9, 383, 9, 255, 9, 511, 9, 0, 7, 64, 7, 32, 7, 96, 7, 16, 7, 80, 7, 48, 7, 112, 7, 8, 7, 72, 7,
            40, 7, 104, 7, 24, 7, 88, 7, 56, 7, 120, 7, 4, 7, 68, 7, 36, 7, 100, 7, 20, 7, 84, 7, 52, 7, 116, 7, 3, 8, 131, 8, 67, 8, 195, 8, 35, 8, 163, 8,
            99, 8, 227, 8
        ];

        StaticTree.static_dtree = [0, 5, 16, 5, 8, 5, 24, 5, 4, 5, 20, 5, 12, 5, 28, 5, 2, 5, 18, 5, 10, 5, 26, 5, 6, 5, 22, 5, 14, 5, 30, 5, 1, 5, 17, 5, 9, 5,
            25, 5, 5, 5, 21, 5, 13, 5, 29, 5, 3, 5, 19, 5, 11, 5, 27, 5, 7, 5, 23, 5
        ];

        StaticTree.static_l_desc = new StaticTree(StaticTree.static_ltree, Tree.extra_lbits, LITERALS + 1, L_CODES, MAX_BITS);

        StaticTree.static_d_desc = new StaticTree(StaticTree.static_dtree, Tree.extra_dbits, 0, D_CODES, MAX_BITS);

        StaticTree.static_bl_desc = new StaticTree(null, Tree.extra_blbits, 0, BL_CODES, MAX_BL_BITS);

        // Deflate

        var MAX_MEM_LEVEL = 9;
        var DEF_MEM_LEVEL = 8;

        function Config(good_length, max_lazy, nice_length, max_chain, func) {
            var that = this;
            that.good_length = good_length;
            that.max_lazy = max_lazy;
            that.nice_length = nice_length;
            that.max_chain = max_chain;
            that.func = func;
        }

        var STORED = 0;
        var FAST = 1;
        var SLOW = 2;
        var config_table = [new Config(0, 0, 0, 0, STORED), new Config(4, 4, 8, 4, FAST), new Config(4, 5, 16, 8, FAST), new Config(4, 6, 32, 32, FAST),
            new Config(4, 4, 16, 16, SLOW), new Config(8, 16, 32, 32, SLOW), new Config(8, 16, 128, 128, SLOW), new Config(8, 32, 128, 256, SLOW),
            new Config(32, 128, 258, 1024, SLOW), new Config(32, 258, 258, 4096, SLOW)
        ];

        var z_errmsg = ["need dictionary", // Z_NEED_DICT
            // 2
            "stream end", // Z_STREAM_END 1
            "", // Z_OK 0
            "", // Z_ERRNO (-1)
            "stream error", // Z_STREAM_ERROR (-2)
            "data error", // Z_DATA_ERROR (-3)
            "", // Z_MEM_ERROR (-4)
            "buffer error", // Z_BUF_ERROR (-5)
            "", // Z_VERSION_ERROR (-6)
            ""
        ];

        // block not completed, need more input or more output
        var NeedMore = 0;

        // block flush performed
        var BlockDone = 1;

        // finish started, need only more output at next deflate
        var FinishStarted = 2;

        // finish done, accept no more input or output
        var FinishDone = 3;

        // preset dictionary flag in zlib header
        var PRESET_DICT = 0x20;

        var INIT_STATE = 42;
        var BUSY_STATE = 113;
        var FINISH_STATE = 666;

        // The deflate compression method
        var Z_DEFLATED = 8;

        var STORED_BLOCK = 0;
        var STATIC_TREES = 1;
        var DYN_TREES = 2;

        // The three kinds of block type
        var Z_BINARY = 0;
        var Z_ASCII = 1;
        var Z_UNKNOWN = 2;

        var MIN_MATCH = 3;
        var MAX_MATCH = 258;
        var MIN_LOOKAHEAD = (MAX_MATCH + MIN_MATCH + 1);

        function smaller(tree, n, m, depth) {
            var tn2 = tree[n * 2];
            var tm2 = tree[m * 2];
            return (tn2 < tm2 || (tn2 == tm2 && depth[n] <= depth[m]));
        }

        function Deflate() {

            var that = this;
            var strm; // pointer back to this zlib stream
            var status; // as the name implies
            // pending_buf; // output still pending
            var pending_buf_size; // size of pending_buf
            // pending_out; // next pending byte to output to the stream
            // pending; // nb of bytes in the pending buffer
            // data_type; // UNKNOWN, BINARY or ASCII
            var method; // STORED (for zip only) or DEFLATED
            var last_flush; // value of flush param for previous deflate call

            var w_size; // LZ77 window size (32K by default)
            var w_bits; // log2(w_size) (8..16)
            var w_mask; // w_size - 1

            var window;
            // Sliding window. Input bytes are read into the second half of the window,
            // and move to the first half later to keep a dictionary of at least wSize
            // bytes. With this organization, matches are limited to a distance of
            // wSize-MAX_MATCH bytes, but this ensures that IO is always
            // performed with a length multiple of the block size. Also, it limits
            // the window size to 64K, which is quite useful on MSDOS.
            // To do: use the user input buffer as sliding window.

            var window_size;
            // Actual size of window: 2*wSize, except when the user input buffer
            // is directly used as sliding window.

            var prev;
            // Link to older string with same hash index. To limit the size of this
            // array to 64K, this link is maintained only for the last 32K strings.
            // An index in this array is thus a window index modulo 32K.

            var head; // Heads of the hash chains or NIL.

            var ins_h; // hash index of string to be inserted
            var hash_size; // number of elements in hash table
            var hash_bits; // log2(hash_size)
            var hash_mask; // hash_size-1

            // Number of bits by which ins_h must be shifted at each input
            // step. It must be such that after MIN_MATCH steps, the oldest
            // byte no longer takes part in the hash key, that is:
            // hash_shift * MIN_MATCH >= hash_bits
            var hash_shift;

            // Window position at the beginning of the current output block. Gets
            // negative when the window is moved backwards.

            var block_start;

            var match_length; // length of best match
            var prev_match; // previous match
            var match_available; // set if previous match exists
            var strstart; // start of string to insert
            var match_start; // start of matching string
            var lookahead; // number of valid bytes ahead in window

            // Length of the best match at previous step. Matches not greater than this
            // are discarded. This is used in the lazy match evaluation.
            var prev_length;

            // To speed up deflation, hash chains are never searched beyond this
            // length. A higher limit improves compression ratio but degrades the speed.
            var max_chain_length;

            // Attempt to find a better match only when the current match is strictly
            // smaller than this value. This mechanism is used only for compression
            // levels >= 4.
            var max_lazy_match;

            // Insert new strings in the hash table only if the match length is not
            // greater than this length. This saves time but degrades compression.
            // max_insert_length is used only for compression levels <= 3.

            var level; // compression level (1..9)
            var strategy; // favor or force Huffman coding

            // Use a faster search when the previous match is longer than this
            var good_match;

            // Stop searching when current match exceeds this
            var nice_match;

            var dyn_ltree; // literal and length tree
            var dyn_dtree; // distance tree
            var bl_tree; // Huffman tree for bit lengths

            var l_desc = new Tree(); // desc for literal tree
            var d_desc = new Tree(); // desc for distance tree
            var bl_desc = new Tree(); // desc for bit length tree

            // that.heap_len; // number of elements in the heap
            // that.heap_max; // element of largest frequency
            // The sons of heap[n] are heap[2*n] and heap[2*n+1]. heap[0] is not used.
            // The same heap array is used to build all trees.

            // Depth of each subtree used as tie breaker for trees of equal frequency
            that.depth = [];

            var l_buf; // index for literals or lengths */

            // Size of match buffer for literals/lengths. There are 4 reasons for
            // limiting lit_bufsize to 64K:
            // - frequencies can be kept in 16 bit counters
            // - if compression is not successful for the first block, all input
            // data is still in the window so we can still emit a stored block even
            // when input comes from standard input. (This can also be done for
            // all blocks if lit_bufsize is not greater than 32K.)
            // - if compression is not successful for a file smaller than 64K, we can
            // even emit a stored file instead of a stored block (saving 5 bytes).
            // This is applicable only for zip (not gzip or zlib).
            // - creating new Huffman trees less frequently may not provide fast
            // adaptation to changes in the input data statistics. (Take for
            // example a binary file with poorly compressible code followed by
            // a highly compressible string table.) Smaller buffer sizes give
            // fast adaptation but have of course the overhead of transmitting
            // trees more frequently.
            // - I can't count above 4
            var lit_bufsize;

            var last_lit; // running index in l_buf

            // Buffer for distances. To simplify the code, d_buf and l_buf have
            // the same number of elements. To use different lengths, an extra flag
            // array would be necessary.

            var d_buf; // index of pendig_buf

            // that.opt_len; // bit length of current block with optimal trees
            // that.static_len; // bit length of current block with static trees
            var matches; // number of string matches in current block
            var last_eob_len; // bit length of EOB code for last block

            // Output buffer. bits are inserted starting at the bottom (least
            // significant bits).
            var bi_buf;

            // Number of valid bits in bi_buf. All bits above the last valid bit
            // are always zero.
            var bi_valid;

            // number of codes at each bit length for an optimal tree
            that.bl_count = [];

            // heap used to build the Huffman trees
            that.heap = [];

            dyn_ltree = [];
            dyn_dtree = [];
            bl_tree = [];

            function lm_init() {
                var i;
                window_size = 2 * w_size;

                head[hash_size - 1] = 0;
                for (i = 0; i < hash_size - 1; i++) {
                    head[i] = 0;
                }

                // Set the default configuration parameters:
                max_lazy_match = config_table[level].max_lazy;
                good_match = config_table[level].good_length;
                nice_match = config_table[level].nice_length;
                max_chain_length = config_table[level].max_chain;

                strstart = 0;
                block_start = 0;
                lookahead = 0;
                match_length = prev_length = MIN_MATCH - 1;
                match_available = 0;
                ins_h = 0;
            }

            function init_block() {
                var i;
                // Initialize the trees.
                for (i = 0; i < L_CODES; i++)
                    dyn_ltree[i * 2] = 0;
                for (i = 0; i < D_CODES; i++)
                    dyn_dtree[i * 2] = 0;
                for (i = 0; i < BL_CODES; i++)
                    bl_tree[i * 2] = 0;

                dyn_ltree[END_BLOCK * 2] = 1;
                that.opt_len = that.static_len = 0;
                last_lit = matches = 0;
            }

            // Initialize the tree data structures for a new zlib stream.
            function tr_init() {

                l_desc.dyn_tree = dyn_ltree;
                l_desc.stat_desc = StaticTree.static_l_desc;

                d_desc.dyn_tree = dyn_dtree;
                d_desc.stat_desc = StaticTree.static_d_desc;

                bl_desc.dyn_tree = bl_tree;
                bl_desc.stat_desc = StaticTree.static_bl_desc;

                bi_buf = 0;
                bi_valid = 0;
                last_eob_len = 8; // enough lookahead for inflate

                // Initialize the first block of the first file:
                init_block();
            }

            // Restore the heap property by moving down the tree starting at node k,
            // exchanging a node with the smallest of its two sons if necessary,
            // stopping
            // when the heap property is re-established (each father smaller than its
            // two sons).
            that.pqdownheap = function (tree, // the tree to restore
                k // node to move down
            ) {
                var heap = that.heap;
                var v = heap[k];
                var j = k << 1; // left son of k
                while (j <= that.heap_len) {
                    // Set j to the smallest of the two sons:
                    if (j < that.heap_len && smaller(tree, heap[j + 1], heap[j], that.depth)) {
                        j++;
                    }
                    // Exit if v is smaller than both sons
                    if (smaller(tree, v, heap[j], that.depth)) {
                        break;
                    }

                    // Exchange v with the smallest son
                    heap[k] = heap[j];
                    k = j;
                    // And continue down the tree, setting j to the left son of k
                    j <<= 1;
                }
                heap[k] = v;
            };

            // Scan a literal or distance tree to determine the frequencies of the codes
            // in the bit length tree.
            function scan_tree(tree, // the tree to be scanned
                max_code // and its largest code of non zero frequency
            ) {
                var n; // iterates over all tree elements
                var prevlen = -1; // last emitted length
                var curlen; // length of current code
                var nextlen = tree[0 * 2 + 1]; // length of next code
                var count = 0; // repeat count of the current code
                var max_count = 7; // max repeat count
                var min_count = 4; // min repeat count

                if (nextlen === 0) {
                    max_count = 138;
                    min_count = 3;
                }
                tree[(max_code + 1) * 2 + 1] = 0xffff; // guard

                for (n = 0; n <= max_code; n++) {
                    curlen = nextlen;
                    nextlen = tree[(n + 1) * 2 + 1];
                    if (++count < max_count && curlen == nextlen) {
                        continue;
                    } else if (count < min_count) {
                        bl_tree[curlen * 2] += count;
                    } else if (curlen !== 0) {
                        if (curlen != prevlen) {
                            bl_tree[curlen * 2]++;
                        }
                        bl_tree[REP_3_6 * 2]++;
                    } else if (count <= 10) {
                        bl_tree[REPZ_3_10 * 2]++;
                    } else {
                        bl_tree[REPZ_11_138 * 2]++;
                    }
                    count = 0;
                    prevlen = curlen;
                    if (nextlen === 0) {
                        max_count = 138;
                        min_count = 3;
                    } else if (curlen == nextlen) {
                        max_count = 6;
                        min_count = 3;
                    } else {
                        max_count = 7;
                        min_count = 4;
                    }
                }
            }

            // Construct the Huffman tree for the bit lengths and return the index in
            // bl_order of the last bit length code to send.
            function build_bl_tree() {
                var max_blindex; // index of last bit length code of non zero freq

                // Determine the bit length frequencies for literal and distance trees
                scan_tree(dyn_ltree, l_desc.max_code);
                scan_tree(dyn_dtree, d_desc.max_code);

                // Build the bit length tree:
                bl_desc.build_tree(that);
                // opt_len now includes the length of the tree representations, except
                // the lengths of the bit lengths codes and the 5+5+4 bits for the
                // counts.

                // Determine the number of bit length codes to send. The pkzip format
                // requires that at least 4 bit length codes be sent. (appnote.txt says
                // 3 but the actual value used is 4.)
                for (max_blindex = BL_CODES - 1; max_blindex >= 3; max_blindex--) {
                    if (bl_tree[Tree.bl_order[max_blindex] * 2 + 1] !== 0) {
                        break;
                    }
                }
                // Update opt_len to include the bit length tree and counts
                that.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;

                return max_blindex;
            }

            // Output a byte on the stream.
            // IN assertion: there is enough room in pending_buf.
            function put_byte(p) {
                that.pending_buf[that.pending++] = p;
            }

            function put_short(w) {
                put_byte(w & 0xff);
                put_byte((w >>> 8) & 0xff);
            }

            function putShortMSB(b) {
                put_byte((b >> 8) & 0xff);
                put_byte((b & 0xff) & 0xff);
            }

            function send_bits(value, length) {
                var val, len = length;
                if (bi_valid > Buf_size - len) {
                    val = value;
                    // bi_buf |= (val << bi_valid);
                    bi_buf |= ((val << bi_valid) & 0xffff);
                    put_short(bi_buf);
                    bi_buf = val >>> (Buf_size - bi_valid);
                    bi_valid += len - Buf_size;
                } else {
                    // bi_buf |= (value) << bi_valid;
                    bi_buf |= (((value) << bi_valid) & 0xffff);
                    bi_valid += len;
                }
            }

            function send_code(c, tree) {
                var c2 = c * 2;
                send_bits(tree[c2] & 0xffff, tree[c2 + 1] & 0xffff);
            }

            // Send a literal or distance tree in compressed form, using the codes in
            // bl_tree.
            function send_tree(tree, // the tree to be sent
                max_code // and its largest code of non zero frequency
            ) {
                var n; // iterates over all tree elements
                var prevlen = -1; // last emitted length
                var curlen; // length of current code
                var nextlen = tree[0 * 2 + 1]; // length of next code
                var count = 0; // repeat count of the current code
                var max_count = 7; // max repeat count
                var min_count = 4; // min repeat count

                if (nextlen === 0) {
                    max_count = 138;
                    min_count = 3;
                }

                for (n = 0; n <= max_code; n++) {
                    curlen = nextlen;
                    nextlen = tree[(n + 1) * 2 + 1];
                    if (++count < max_count && curlen == nextlen) {
                        continue;
                    } else if (count < min_count) {
                        do {
                            send_code(curlen, bl_tree);
                        } while (--count !== 0);
                    } else if (curlen !== 0) {
                        if (curlen != prevlen) {
                            send_code(curlen, bl_tree);
                            count--;
                        }
                        send_code(REP_3_6, bl_tree);
                        send_bits(count - 3, 2);
                    } else if (count <= 10) {
                        send_code(REPZ_3_10, bl_tree);
                        send_bits(count - 3, 3);
                    } else {
                        send_code(REPZ_11_138, bl_tree);
                        send_bits(count - 11, 7);
                    }
                    count = 0;
                    prevlen = curlen;
                    if (nextlen === 0) {
                        max_count = 138;
                        min_count = 3;
                    } else if (curlen == nextlen) {
                        max_count = 6;
                        min_count = 3;
                    } else {
                        max_count = 7;
                        min_count = 4;
                    }
                }
            }

            // Send the header for a block using dynamic Huffman trees: the counts, the
            // lengths of the bit length codes, the literal tree and the distance tree.
            // IN assertion: lcodes >= 257, dcodes >= 1, blcodes >= 4.
            function send_all_trees(lcodes, dcodes, blcodes) {
                var rank; // index in bl_order

                send_bits(lcodes - 257, 5); // not +255 as stated in appnote.txt
                send_bits(dcodes - 1, 5);
                send_bits(blcodes - 4, 4); // not -3 as stated in appnote.txt
                for (rank = 0; rank < blcodes; rank++) {
                    send_bits(bl_tree[Tree.bl_order[rank] * 2 + 1], 3);
                }
                send_tree(dyn_ltree, lcodes - 1); // literal tree
                send_tree(dyn_dtree, dcodes - 1); // distance tree
            }

            // Flush the bit buffer, keeping at most 7 bits in it.
            function bi_flush() {
                if (bi_valid == 16) {
                    put_short(bi_buf);
                    bi_buf = 0;
                    bi_valid = 0;
                } else if (bi_valid >= 8) {
                    put_byte(bi_buf & 0xff);
                    bi_buf >>>= 8;
                    bi_valid -= 8;
                }
            }

            // Send one empty static block to give enough lookahead for inflate.
            // This takes 10 bits, of which 7 may remain in the bit buffer.
            // The current inflate code requires 9 bits of lookahead. If the
            // last two codes for the previous block (real code plus EOB) were coded
            // on 5 bits or less, inflate may have only 5+3 bits of lookahead to decode
            // the last real code. In this case we send two empty static blocks instead
            // of one. (There are no problems if the previous block is stored or fixed.)
            // To simplify the code, we assume the worst case of last real code encoded
            // on one bit only.
            function _tr_align() {
                send_bits(STATIC_TREES << 1, 3);
                send_code(END_BLOCK, StaticTree.static_ltree);

                bi_flush();

                // Of the 10 bits for the empty block, we have already sent
                // (10 - bi_valid) bits. The lookahead for the last real code (before
                // the EOB of the previous block) was thus at least one plus the length
                // of the EOB plus what we have just sent of the empty static block.
                if (1 + last_eob_len + 10 - bi_valid < 9) {
                    send_bits(STATIC_TREES << 1, 3);
                    send_code(END_BLOCK, StaticTree.static_ltree);
                    bi_flush();
                }
                last_eob_len = 7;
            }

            // Save the match info and tally the frequency counts. Return true if
            // the current block must be flushed.
            function _tr_tally(dist, // distance of matched string
                lc // match length-MIN_MATCH or unmatched char (if dist==0)
            ) {
                var out_length, in_length, dcode;
                that.pending_buf[d_buf + last_lit * 2] = (dist >>> 8) & 0xff;
                that.pending_buf[d_buf + last_lit * 2 + 1] = dist & 0xff;

                that.pending_buf[l_buf + last_lit] = lc & 0xff;
                last_lit++;

                if (dist === 0) {
                    // lc is the unmatched char
                    dyn_ltree[lc * 2]++;
                } else {
                    matches++;
                    // Here, lc is the match length - MIN_MATCH
                    dist--; // dist = match distance - 1
                    dyn_ltree[(Tree._length_code[lc] + LITERALS + 1) * 2]++;
                    dyn_dtree[Tree.d_code(dist) * 2]++;
                }

                if ((last_lit & 0x1fff) === 0 && level > 2) {
                    // Compute an upper bound for the compressed length
                    out_length = last_lit * 8;
                    in_length = strstart - block_start;
                    for (dcode = 0; dcode < D_CODES; dcode++) {
                        out_length += dyn_dtree[dcode * 2] * (5 + Tree.extra_dbits[dcode]);
                    }
                    out_length >>>= 3;
                    if ((matches < Math.floor(last_lit / 2)) && out_length < Math.floor(in_length / 2)) {
                        return true;
                    }
                }

                return (last_lit == lit_bufsize - 1);
                // We avoid equality with lit_bufsize because of wraparound at 64K
                // on 16 bit machines and because stored blocks are restricted to
                // 64K-1 bytes.
            }

            // Send the block data compressed using the given Huffman trees
            function compress_block(ltree, dtree) {
                var dist; // distance of matched string
                var lc; // match length or unmatched char (if dist === 0)
                var lx = 0; // running index in l_buf
                var code; // the code to send
                var extra; // number of extra bits to send

                if (last_lit !== 0) {
                    do {
                        dist = ((that.pending_buf[d_buf + lx * 2] << 8) & 0xff00) | (that.pending_buf[d_buf + lx * 2 + 1] & 0xff);
                        lc = (that.pending_buf[l_buf + lx]) & 0xff;
                        lx++;

                        if (dist === 0) {
                            send_code(lc, ltree); // send a literal byte
                        } else {
                            // Here, lc is the match length - MIN_MATCH
                            code = Tree._length_code[lc];

                            send_code(code + LITERALS + 1, ltree); // send the length
                            // code
                            extra = Tree.extra_lbits[code];
                            if (extra !== 0) {
                                lc -= Tree.base_length[code];
                                send_bits(lc, extra); // send the extra length bits
                            }
                            dist--; // dist is now the match distance - 1
                            code = Tree.d_code(dist);

                            send_code(code, dtree); // send the distance code
                            extra = Tree.extra_dbits[code];
                            if (extra !== 0) {
                                dist -= Tree.base_dist[code];
                                send_bits(dist, extra); // send the extra distance bits
                            }
                        } // literal or match pair ?

                        // Check that the overlay between pending_buf and d_buf+l_buf is
                        // ok:
                    } while (lx < last_lit);
                }

                send_code(END_BLOCK, ltree);
                last_eob_len = ltree[END_BLOCK * 2 + 1];
            }

            // Set the data type to ASCII or BINARY, using a crude approximation:
            // binary if more than 20% of the bytes are <= 6 or >= 128, ascii otherwise.
            // IN assertion: the fields freq of dyn_ltree are set and the total of all
            // frequencies does not exceed 64K (to fit in an int on 16 bit machines).
            function set_data_type() {
                var n = 0;
                var ascii_freq = 0;
                var bin_freq = 0;
                while (n < 7) {
                    bin_freq += dyn_ltree[n * 2];
                    n++;
                }
                while (n < 128) {
                    ascii_freq += dyn_ltree[n * 2];
                    n++;
                }
                while (n < LITERALS) {
                    bin_freq += dyn_ltree[n * 2];
                    n++;
                }
                that.data_type = (bin_freq > (ascii_freq >>> 2) ? Z_BINARY : Z_ASCII) & 0xff;
            }

            // Flush the bit buffer and align the output on a byte boundary
            function bi_windup() {
                if (bi_valid > 8) {
                    put_short(bi_buf);
                } else if (bi_valid > 0) {
                    put_byte(bi_buf & 0xff);
                }
                bi_buf = 0;
                bi_valid = 0;
            }

            // Copy a stored block, storing first the length and its
            // one's complement if requested.
            function copy_block(buf, // the input data
                len, // its length
                header // true if block header must be written
            ) {
                var index = 0;
                bi_windup(); // align on byte boundary
                last_eob_len = 8; // enough lookahead for inflate

                if (header) {
                    put_short(len);
                    put_short(~len);
                }

                that.pending_buf.set(window.subarray(buf, buf + len), that.pending);
                that.pending += len;
            }

            // Send a stored block
            function _tr_stored_block(buf, // input block
                stored_len, // length of input block
                eof // true if this is the last block for a file
            ) {
                send_bits((STORED_BLOCK << 1) + (eof ? 1 : 0), 3); // send block type
                copy_block(buf, stored_len, true); // with header
            }

            // Determine the best encoding for the current block: dynamic trees, static
            // trees or store, and output the encoded block to the zip file.
            function _tr_flush_block(buf, // input block, or NULL if too old
                stored_len, // length of input block
                eof // true if this is the last block for a file
            ) {
                var opt_lenb, static_lenb; // opt_len and static_len in bytes
                var max_blindex = 0; // index of last bit length code of non zero freq

                // Build the Huffman trees unless a stored block is forced
                if (level > 0) {
                    // Check if the file is ascii or binary
                    if (that.data_type == Z_UNKNOWN) {
                        set_data_type();
                    }

                    // Construct the literal and distance trees
                    l_desc.build_tree(that);

                    d_desc.build_tree(that);

                    // At this point, opt_len and static_len are the total bit lengths
                    // of
                    // the compressed block data, excluding the tree representations.

                    // Build the bit length tree for the above two trees, and get the
                    // index
                    // in bl_order of the last bit length code to send.
                    max_blindex = build_bl_tree();

                    // Determine the best encoding. Compute first the block length in
                    // bytes
                    opt_lenb = (that.opt_len + 3 + 7) >>> 3;
                    static_lenb = (that.static_len + 3 + 7) >>> 3;

                    if (static_lenb <= opt_lenb) {
                        opt_lenb = static_lenb;
                    }
                } else {
                    opt_lenb = static_lenb = stored_len + 5; // force a stored block
                }

                if ((stored_len + 4 <= opt_lenb) && buf != -1) {
                    // 4: two words for the lengths
                    // The test buf != NULL is only necessary if LIT_BUFSIZE > WSIZE.
                    // Otherwise we can't have processed more than WSIZE input bytes
                    // since
                    // the last block flush, because compression would have been
                    // successful. If LIT_BUFSIZE <= WSIZE, it is never too late to
                    // transform a block into a stored block.
                    _tr_stored_block(buf, stored_len, eof);
                } else if (static_lenb == opt_lenb) {
                    send_bits((STATIC_TREES << 1) + (eof ? 1 : 0), 3);
                    compress_block(StaticTree.static_ltree, StaticTree.static_dtree);
                } else {
                    send_bits((DYN_TREES << 1) + (eof ? 1 : 0), 3);
                    send_all_trees(l_desc.max_code + 1, d_desc.max_code + 1, max_blindex + 1);
                    compress_block(dyn_ltree, dyn_dtree);
                }

                // The above check is made mod 2^32, for files larger than 512 MB
                // and uLong implemented on 32 bits.

                init_block();

                if (eof) {
                    bi_windup();
                }
            }

            function flush_block_only(eof) {
                _tr_flush_block(block_start >= 0 ? block_start : -1, strstart - block_start, eof);
                block_start = strstart;
                strm.flush_pending();
            }

            // Fill the window when the lookahead becomes insufficient.
            // Updates strstart and lookahead.
            //
            // IN assertion: lookahead < MIN_LOOKAHEAD
            // OUT assertions: strstart <= window_size-MIN_LOOKAHEAD
            // At least one byte has been read, or avail_in === 0; reads are
            // performed for at least two bytes (required for the zip translate_eol
            // option -- not supported here).
            function fill_window() {
                var n, m;
                var p;
                var more; // Amount of free space at the end of the window.

                do {
                    more = (window_size - lookahead - strstart);

                    // Deal with !@#$% 64K limit:
                    if (more === 0 && strstart === 0 && lookahead === 0) {
                        more = w_size;
                    } else if (more == -1) {
                        // Very unlikely, but possible on 16 bit machine if strstart ==
                        // 0
                        // and lookahead == 1 (input done one byte at time)
                        more--;

                        // If the window is almost full and there is insufficient
                        // lookahead,
                        // move the upper half to the lower one to make room in the
                        // upper half.
                    } else if (strstart >= w_size + w_size - MIN_LOOKAHEAD) {
                        window.set(window.subarray(w_size, w_size + w_size), 0);

                        match_start -= w_size;
                        strstart -= w_size; // we now have strstart >= MAX_DIST
                        block_start -= w_size;

                        // Slide the hash table (could be avoided with 32 bit values
                        // at the expense of memory usage). We slide even when level ==
                        // 0
                        // to keep the hash table consistent if we switch back to level
                        // > 0
                        // later. (Using level 0 permanently is not an optimal usage of
                        // zlib, so we don't care about this pathological case.)

                        n = hash_size;
                        p = n;
                        do {
                            m = (head[--p] & 0xffff);
                            head[p] = (m >= w_size ? m - w_size : 0);
                        } while (--n !== 0);

                        n = w_size;
                        p = n;
                        do {
                            m = (prev[--p] & 0xffff);
                            prev[p] = (m >= w_size ? m - w_size : 0);
                            // If n is not on any hash chain, prev[n] is garbage but
                            // its value will never be used.
                        } while (--n !== 0);
                        more += w_size;
                    }

                    if (strm.avail_in === 0) {
                        return;
                    }

                    // If there was no sliding:
                    // strstart <= WSIZE+MAX_DIST-1 && lookahead <= MIN_LOOKAHEAD - 1 &&
                    // more == window_size - lookahead - strstart
                    // => more >= window_size - (MIN_LOOKAHEAD-1 + WSIZE + MAX_DIST-1)
                    // => more >= window_size - 2*WSIZE + 2
                    // In the BIG_MEM or MMAP case (not yet supported),
                    // window_size == input_size + MIN_LOOKAHEAD &&
                    // strstart + s->lookahead <= input_size => more >= MIN_LOOKAHEAD.
                    // Otherwise, window_size == 2*WSIZE so more >= 2.
                    // If there was sliding, more >= WSIZE. So in all cases, more >= 2.

                    n = strm.read_buf(window, strstart + lookahead, more);
                    lookahead += n;

                    // Initialize the hash value now that we have some input:
                    if (lookahead >= MIN_MATCH) {
                        ins_h = window[strstart] & 0xff;
                        ins_h = (((ins_h) << hash_shift) ^ (window[strstart + 1] & 0xff)) & hash_mask;
                    }
                    // If the whole input has less than MIN_MATCH bytes, ins_h is
                    // garbage,
                    // but this is not important since only literal bytes will be
                    // emitted.
                } while (lookahead < MIN_LOOKAHEAD && strm.avail_in !== 0);
            }

            // Copy without compression as much as possible from the input stream,
            // return
            // the current block state.
            // This function does not insert new strings in the dictionary since
            // uncompressible data is probably not useful. This function is used
            // only for the level=0 compression option.
            // NOTE: this function should be optimized to avoid extra copying from
            // window to pending_buf.
            function deflate_stored(flush) {
                // Stored blocks are limited to 0xffff bytes, pending_buf is limited
                // to pending_buf_size, and each stored block has a 5 byte header:

                var max_block_size = 0xffff;
                var max_start;

                if (max_block_size > pending_buf_size - 5) {
                    max_block_size = pending_buf_size - 5;
                }

                // Copy as much as possible from input to output:
                while (true) {
                    // Fill the window as much as possible:
                    if (lookahead <= 1) {
                        fill_window();
                        if (lookahead === 0 && flush == Z_NO_FLUSH) {
                            return NeedMore;
                        }
                        if (lookahead === 0) {
                            break;
                        } // flush the current block
                    }

                    strstart += lookahead;
                    lookahead = 0;

                    // Emit a stored block if pending_buf will be full:
                    max_start = block_start + max_block_size;
                    if (strstart === 0 || strstart >= max_start) {
                        // strstart === 0 is possible when wraparound on 16-bit machine
                        lookahead = (strstart - max_start);
                        strstart = max_start;

                        flush_block_only(false);
                        if (strm.avail_out === 0) {
                            return NeedMore;
                        }

                    }

                    // Flush if we may have to slide, otherwise block_start may become
                    // negative and the data will be gone:
                    if (strstart - block_start >= w_size - MIN_LOOKAHEAD) {
                        flush_block_only(false);
                        if (strm.avail_out === 0) {
                            return NeedMore;
                        }
                    }
                }

                flush_block_only(flush == Z_FINISH);
                if (strm.avail_out === 0) {
                    return (flush == Z_FINISH) ? FinishStarted : NeedMore;
                }

                return flush == Z_FINISH ? FinishDone : BlockDone;
            }

            function longest_match(cur_match) {
                var chain_length = max_chain_length; // max hash chain length
                var scan = strstart; // current string
                var match; // matched string
                var len; // length of current match
                var best_len = prev_length; // best match length so far
                var limit = strstart > (w_size - MIN_LOOKAHEAD) ? strstart - (w_size - MIN_LOOKAHEAD) : 0;
                var _nice_match = nice_match;

                // Stop when cur_match becomes <= limit. To simplify the code,
                // we prevent matches with the string of window index 0.

                var wmask = w_mask;

                var strend = strstart + MAX_MATCH;
                var scan_end1 = window[scan + best_len - 1];
                var scan_end = window[scan + best_len];

                // The code is optimized for HASH_BITS >= 8 and MAX_MATCH-2 multiple of
                // 16.
                // It is easy to get rid of this optimization if necessary.

                // Do not waste too much time if we already have a good match:
                if (prev_length >= good_match) {
                    chain_length >>= 2;
                }

                // Do not look for matches beyond the end of the input. This is
                // necessary
                // to make deflate deterministic.
                if (_nice_match > lookahead) {
                    _nice_match = lookahead;
                }

                do {
                    match = cur_match;

                    // Skip to next match if the match length cannot increase
                    // or if the match length is less than 2:
                    if (window[match + best_len] != scan_end || window[match + best_len - 1] != scan_end1 || window[match] != window[scan] || window[++match] != window[scan + 1]) {
                        continue;
                    }

                    // The check at best_len-1 can be removed because it will be made
                    // again later. (This heuristic is not always a win.)
                    // It is not necessary to compare scan[2] and match[2] since they
                    // are always equal when the other bytes match, given that
                    // the hash keys are equal and that HASH_BITS >= 8.
                    scan += 2;
                    match++;

                    // We check for insufficient lookahead only every 8th comparison;
                    // the 256th check will be made at strstart+258.
                    do {} while (window[++scan] == window[++match] && window[++scan] == window[++match] && window[++scan] == window[++match] && window[++scan] == window[++match] && window[++scan] == window[++match] && window[++scan] == window[++match] && window[++scan] == window[++match] && window[++scan] == window[++match] && scan < strend);

                    len = MAX_MATCH - (strend - scan);
                    scan = strend - MAX_MATCH;

                    if (len > best_len) {
                        match_start = cur_match;
                        best_len = len;
                        if (len >= _nice_match) {
                            break;
                        }
                        scan_end1 = window[scan + best_len - 1];
                        scan_end = window[scan + best_len];
                    }

                } while ((cur_match = (prev[cur_match & wmask] & 0xffff)) > limit && --chain_length !== 0);

                if (best_len <= lookahead) {
                    return best_len;
                }
                return lookahead;
            }

            // Compress as much as possible from the input stream, return the current
            // block state.
            // This function does not perform lazy evaluation of matches and inserts
            // new strings in the dictionary only for unmatched strings or for short
            // matches. It is used only for the fast compression options.
            function deflate_fast(flush) {
                // short hash_head = 0; // head of the hash chain
                var hash_head = 0; // head of the hash chain
                var bflush; // set if current block must be flushed

                while (true) {
                    // Make sure that we always have enough lookahead, except
                    // at the end of the input file. We need MAX_MATCH bytes
                    // for the next match, plus MIN_MATCH bytes to insert the
                    // string following the next match.
                    if (lookahead < MIN_LOOKAHEAD) {
                        fill_window();
                        if (lookahead < MIN_LOOKAHEAD && flush == Z_NO_FLUSH) {
                            return NeedMore;
                        }
                        if (lookahead === 0) {
                            break;
                        } // flush the current block
                    }

                    // Insert the string window[strstart .. strstart+2] in the
                    // dictionary, and set hash_head to the head of the hash chain:
                    if (lookahead >= MIN_MATCH) {
                        ins_h = (((ins_h) << hash_shift) ^ (window[(strstart) + (MIN_MATCH - 1)] & 0xff)) & hash_mask;

                        // prev[strstart&w_mask]=hash_head=head[ins_h];
                        hash_head = (head[ins_h] & 0xffff);
                        prev[strstart & w_mask] = head[ins_h];
                        head[ins_h] = strstart;
                    }

                    // Find the longest match, discarding those <= prev_length.
                    // At this point we have always match_length < MIN_MATCH

                    if (hash_head !== 0 && ((strstart - hash_head) & 0xffff) <= w_size - MIN_LOOKAHEAD) {
                        // To simplify the code, we prevent matches with the string
                        // of window index 0 (in particular we have to avoid a match
                        // of the string with itself at the start of the input file).
                        if (strategy != Z_HUFFMAN_ONLY) {
                            match_length = longest_match(hash_head);
                        }
                        // longest_match() sets match_start
                    }
                    if (match_length >= MIN_MATCH) {
                        // check_match(strstart, match_start, match_length);

                        bflush = _tr_tally(strstart - match_start, match_length - MIN_MATCH);

                        lookahead -= match_length;

                        // Insert new strings in the hash table only if the match length
                        // is not too large. This saves time but degrades compression.
                        if (match_length <= max_lazy_match && lookahead >= MIN_MATCH) {
                            match_length--; // string at strstart already in hash table
                            do {
                                strstart++;

                                ins_h = ((ins_h << hash_shift) ^ (window[(strstart) + (MIN_MATCH - 1)] & 0xff)) & hash_mask;
                                // prev[strstart&w_mask]=hash_head=head[ins_h];
                                hash_head = (head[ins_h] & 0xffff);
                                prev[strstart & w_mask] = head[ins_h];
                                head[ins_h] = strstart;

                                // strstart never exceeds WSIZE-MAX_MATCH, so there are
                                // always MIN_MATCH bytes ahead.
                            } while (--match_length !== 0);
                            strstart++;
                        } else {
                            strstart += match_length;
                            match_length = 0;
                            ins_h = window[strstart] & 0xff;

                            ins_h = (((ins_h) << hash_shift) ^ (window[strstart + 1] & 0xff)) & hash_mask;
                            // If lookahead < MIN_MATCH, ins_h is garbage, but it does
                            // not
                            // matter since it will be recomputed at next deflate call.
                        }
                    } else {
                        // No match, output a literal byte

                        bflush = _tr_tally(0, window[strstart] & 0xff);
                        lookahead--;
                        strstart++;
                    }
                    if (bflush) {

                        flush_block_only(false);
                        if (strm.avail_out === 0) {
                            return NeedMore;
                        }
                    }
                }

                flush_block_only(flush == Z_FINISH);
                if (strm.avail_out === 0) {
                    if (flush == Z_FINISH) {
                        return FinishStarted;
                    } else {
                        return NeedMore;
                    }
                }
                return flush == Z_FINISH ? FinishDone : BlockDone;
            }

            // Same as above, but achieves better compression. We use a lazy
            // evaluation for matches: a match is finally adopted only if there is
            // no better match at the next window position.
            function deflate_slow(flush) {
                // short hash_head = 0; // head of hash chain
                var hash_head = 0; // head of hash chain
                var bflush; // set if current block must be flushed
                var max_insert;

                // Process the input block.
                while (true) {
                    // Make sure that we always have enough lookahead, except
                    // at the end of the input file. We need MAX_MATCH bytes
                    // for the next match, plus MIN_MATCH bytes to insert the
                    // string following the next match.

                    if (lookahead < MIN_LOOKAHEAD) {
                        fill_window();
                        if (lookahead < MIN_LOOKAHEAD && flush == Z_NO_FLUSH) {
                            return NeedMore;
                        }
                        if (lookahead === 0) {
                            break;
                        } // flush the current block
                    }

                    // Insert the string window[strstart .. strstart+2] in the
                    // dictionary, and set hash_head to the head of the hash chain:

                    if (lookahead >= MIN_MATCH) {
                        ins_h = (((ins_h) << hash_shift) ^ (window[(strstart) + (MIN_MATCH - 1)] & 0xff)) & hash_mask;
                        // prev[strstart&w_mask]=hash_head=head[ins_h];
                        hash_head = (head[ins_h] & 0xffff);
                        prev[strstart & w_mask] = head[ins_h];
                        head[ins_h] = strstart;
                    }

                    // Find the longest match, discarding those <= prev_length.
                    prev_length = match_length;
                    prev_match = match_start;
                    match_length = MIN_MATCH - 1;

                    if (hash_head !== 0 && prev_length < max_lazy_match && ((strstart - hash_head) & 0xffff) <= w_size - MIN_LOOKAHEAD) {
                        // To simplify the code, we prevent matches with the string
                        // of window index 0 (in particular we have to avoid a match
                        // of the string with itself at the start of the input file).

                        if (strategy != Z_HUFFMAN_ONLY) {
                            match_length = longest_match(hash_head);
                        }
                        // longest_match() sets match_start

                        if (match_length <= 5 && (strategy == Z_FILTERED || (match_length == MIN_MATCH && strstart - match_start > 4096))) {

                            // If prev_match is also MIN_MATCH, match_start is garbage
                            // but we will ignore the current match anyway.
                            match_length = MIN_MATCH - 1;
                        }
                    }

                    // If there was a match at the previous step and the current
                    // match is not better, output the previous match:
                    if (prev_length >= MIN_MATCH && match_length <= prev_length) {
                        max_insert = strstart + lookahead - MIN_MATCH;
                        // Do not insert strings in hash table beyond this.

                        // check_match(strstart-1, prev_match, prev_length);

                        bflush = _tr_tally(strstart - 1 - prev_match, prev_length - MIN_MATCH);

                        // Insert in hash table all strings up to the end of the match.
                        // strstart-1 and strstart are already inserted. If there is not
                        // enough lookahead, the last two strings are not inserted in
                        // the hash table.
                        lookahead -= prev_length - 1;
                        prev_length -= 2;
                        do {
                            if (++strstart <= max_insert) {
                                ins_h = (((ins_h) << hash_shift) ^ (window[(strstart) + (MIN_MATCH - 1)] & 0xff)) & hash_mask;
                                // prev[strstart&w_mask]=hash_head=head[ins_h];
                                hash_head = (head[ins_h] & 0xffff);
                                prev[strstart & w_mask] = head[ins_h];
                                head[ins_h] = strstart;
                            }
                        } while (--prev_length !== 0);
                        match_available = 0;
                        match_length = MIN_MATCH - 1;
                        strstart++;

                        if (bflush) {
                            flush_block_only(false);
                            if (strm.avail_out === 0) {
                                return NeedMore;
                            }
                        }
                    } else if (match_available !== 0) {

                        // If there was no match at the previous position, output a
                        // single literal. If there was a match but the current match
                        // is longer, truncate the previous match to a single literal.

                        bflush = _tr_tally(0, window[strstart - 1] & 0xff);

                        if (bflush) {
                            flush_block_only(false);
                        }
                        strstart++;
                        lookahead--;
                        if (strm.avail_out === 0) {
                            return NeedMore;
                        }
                    } else {
                        // There is no previous match to compare with, wait for
                        // the next step to decide.

                        match_available = 1;
                        strstart++;
                        lookahead--;
                    }
                }

                if (match_available !== 0) {
                    bflush = _tr_tally(0, window[strstart - 1] & 0xff);
                    match_available = 0;
                }
                flush_block_only(flush == Z_FINISH);

                if (strm.avail_out === 0) {
                    if (flush == Z_FINISH) {
                        return FinishStarted;
                    } else {
                        return NeedMore;
                    }
                }

                return flush == Z_FINISH ? FinishDone : BlockDone;
            }

            function deflateReset(strm) {
                strm.total_in = strm.total_out = 0;
                strm.msg = null; //
                strm.data_type = Z_UNKNOWN;

                that.pending = 0;
                that.pending_out = 0;

                status = BUSY_STATE;

                last_flush = Z_NO_FLUSH;

                tr_init();
                lm_init();
                return Z_OK;
            }

            that.deflateInit = function (strm, _level, bits, _method, memLevel, _strategy) {
                if (!_method) {
                    _method = Z_DEFLATED;
                }
                if (!memLevel) {
                    memLevel = DEF_MEM_LEVEL;
                }
                if (!_strategy) {
                    _strategy = Z_DEFAULT_STRATEGY;
                }

                // byte[] my_version=ZLIB_VERSION;

                //
                // if (!version || version[0] != my_version[0]
                // || stream_size != sizeof(z_stream)) {
                // return Z_VERSION_ERROR;
                // }

                strm.msg = null;

                if (_level == Z_DEFAULT_COMPRESSION) {
                    _level = 6;
                }

                if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || _method != Z_DEFLATED || bits < 9 || bits > 15 || _level < 0 || _level > 9 || _strategy < 0 || _strategy > Z_HUFFMAN_ONLY) {
                    return Z_STREAM_ERROR;
                }

                strm.dstate = that;

                w_bits = bits;
                w_size = 1 << w_bits;
                w_mask = w_size - 1;

                hash_bits = memLevel + 7;
                hash_size = 1 << hash_bits;
                hash_mask = hash_size - 1;
                hash_shift = Math.floor((hash_bits + MIN_MATCH - 1) / MIN_MATCH);

                window = new Uint8Array(w_size * 2);
                prev = [];
                head = [];

                lit_bufsize = 1 << (memLevel + 6); // 16K elements by default

                // We overlay pending_buf and d_buf+l_buf. This works since the average
                // output size for (length,distance) codes is <= 24 bits.
                that.pending_buf = new Uint8Array(lit_bufsize * 4);
                pending_buf_size = lit_bufsize * 4;

                d_buf = Math.floor(lit_bufsize / 2);
                l_buf = (1 + 2) * lit_bufsize;

                level = _level;

                strategy = _strategy;
                method = _method & 0xff;

                return deflateReset(strm);
            };

            that.deflateEnd = function () {
                if (status != INIT_STATE && status != BUSY_STATE && status != FINISH_STATE) {
                    return Z_STREAM_ERROR;
                }
                // Deallocate in reverse order of allocations:
                that.pending_buf = null;
                head = null;
                prev = null;
                window = null;
                // free
                that.dstate = null;
                return status == BUSY_STATE ? Z_DATA_ERROR : Z_OK;
            };

            that.deflateParams = function (strm, _level, _strategy) {
                var err = Z_OK;

                if (_level == Z_DEFAULT_COMPRESSION) {
                    _level = 6;
                }
                if (_level < 0 || _level > 9 || _strategy < 0 || _strategy > Z_HUFFMAN_ONLY) {
                    return Z_STREAM_ERROR;
                }

                if (config_table[level].func != config_table[_level].func && strm.total_in !== 0) {
                    // Flush the last buffer:
                    err = strm.deflate(Z_PARTIAL_FLUSH);
                }

                if (level != _level) {
                    level = _level;
                    max_lazy_match = config_table[level].max_lazy;
                    good_match = config_table[level].good_length;
                    nice_match = config_table[level].nice_length;
                    max_chain_length = config_table[level].max_chain;
                }
                strategy = _strategy;
                return err;
            };

            that.deflateSetDictionary = function (strm, dictionary, dictLength) {
                var length = dictLength;
                var n, index = 0;

                if (!dictionary || status != INIT_STATE) {
                    return Z_STREAM_ERROR;
                }

                if (length < MIN_MATCH) {
                    return Z_OK;
                }
                if (length > w_size - MIN_LOOKAHEAD) {
                    length = w_size - MIN_LOOKAHEAD;
                    index = dictLength - length; // use the tail of the dictionary
                }
                window.set(dictionary.subarray(index, index + length), 0);

                strstart = length;
                block_start = length;

                // Insert all strings in the hash table (except for the last two bytes).
                // s->lookahead stays null, so s->ins_h will be recomputed at the next
                // call of fill_window.

                ins_h = window[0] & 0xff;
                ins_h = (((ins_h) << hash_shift) ^ (window[1] & 0xff)) & hash_mask;

                for (n = 0; n <= length - MIN_MATCH; n++) {
                    ins_h = (((ins_h) << hash_shift) ^ (window[(n) + (MIN_MATCH - 1)] & 0xff)) & hash_mask;
                    prev[n & w_mask] = head[ins_h];
                    head[ins_h] = n;
                }
                return Z_OK;
            };

            that.deflate = function (_strm, flush) {
                var i, header, level_flags, old_flush, bstate;

                if (flush > Z_FINISH || flush < 0) {
                    return Z_STREAM_ERROR;
                }

                if (!_strm.next_out || (!_strm.next_in && _strm.avail_in !== 0) || (status == FINISH_STATE && flush != Z_FINISH)) {
                    _strm.msg = z_errmsg[Z_NEED_DICT - (Z_STREAM_ERROR)];
                    return Z_STREAM_ERROR;
                }
                if (_strm.avail_out === 0) {
                    _strm.msg = z_errmsg[Z_NEED_DICT - (Z_BUF_ERROR)];
                    return Z_BUF_ERROR;
                }

                strm = _strm; // just in case
                old_flush = last_flush;
                last_flush = flush;

                // Write the zlib header
                if (status == INIT_STATE) {
                    header = (Z_DEFLATED + ((w_bits - 8) << 4)) << 8;
                    level_flags = ((level - 1) & 0xff) >> 1;

                    if (level_flags > 3) {
                        level_flags = 3;
                    }
                    header |= (level_flags << 6);
                    if (strstart !== 0) {
                        header |= PRESET_DICT;
                    }
                    header += 31 - (header % 31);

                    status = BUSY_STATE;
                    putShortMSB(header);
                }

                // Flush as much pending output as possible
                if (that.pending !== 0) {
                    strm.flush_pending();
                    if (strm.avail_out === 0) {
                        // console.log(" avail_out==0");
                        // Since avail_out is 0, deflate will be called again with
                        // more output space, but possibly with both pending and
                        // avail_in equal to zero. There won't be anything to do,
                        // but this is not an error situation so make sure we
                        // return OK instead of BUF_ERROR at next call of deflate:
                        last_flush = -1;
                        return Z_OK;
                    }

                    // Make sure there is something to do and avoid duplicate
                    // consecutive
                    // flushes. For repeated and useless calls with Z_FINISH, we keep
                    // returning Z_STREAM_END instead of Z_BUFF_ERROR.
                } else if (strm.avail_in === 0 && flush <= old_flush && flush != Z_FINISH) {
                    strm.msg = z_errmsg[Z_NEED_DICT - (Z_BUF_ERROR)];
                    return Z_BUF_ERROR;
                }

                // User must not provide more input after the first FINISH:
                if (status == FINISH_STATE && strm.avail_in !== 0) {
                    _strm.msg = z_errmsg[Z_NEED_DICT - (Z_BUF_ERROR)];
                    return Z_BUF_ERROR;
                }

                // Start a new block or continue the current one.
                if (strm.avail_in !== 0 || lookahead !== 0 || (flush != Z_NO_FLUSH && status != FINISH_STATE)) {
                    bstate = -1;
                    switch (config_table[level].func) {
                    case STORED:
                        bstate = deflate_stored(flush);
                        break;
                    case FAST:
                        bstate = deflate_fast(flush);
                        break;
                    case SLOW:
                        bstate = deflate_slow(flush);
                        break;
                    default:
                    }

                    if (bstate == FinishStarted || bstate == FinishDone) {
                        status = FINISH_STATE;
                    }
                    if (bstate == NeedMore || bstate == FinishStarted) {
                        if (strm.avail_out === 0) {
                            last_flush = -1; // avoid BUF_ERROR next call, see above
                        }
                        return Z_OK;
                        // If flush != Z_NO_FLUSH && avail_out === 0, the next call
                        // of deflate should use the same flush parameter to make sure
                        // that the flush is complete. So we don't have to output an
                        // empty block here, this will be done at next call. This also
                        // ensures that for a very small output buffer, we emit at most
                        // one empty block.
                    }

                    if (bstate == BlockDone) {
                        if (flush == Z_PARTIAL_FLUSH) {
                            _tr_align();
                        } else { // FULL_FLUSH or SYNC_FLUSH
                            _tr_stored_block(0, 0, false);
                            // For a full flush, this empty block will be recognized
                            // as a special marker by inflate_sync().
                            if (flush == Z_FULL_FLUSH) {
                                // state.head[s.hash_size-1]=0;
                                for (i = 0; i < hash_size /*-1*/ ; i++)
                                // forget history
                                    head[i] = 0;
                            }
                        }
                        strm.flush_pending();
                        if (strm.avail_out === 0) {
                            last_flush = -1; // avoid BUF_ERROR at next call, see above
                            return Z_OK;
                        }
                    }
                }

                if (flush != Z_FINISH) {
                    return Z_OK;
                }
                return Z_STREAM_END;
            };
        }

        // ZStream

        function ZStream() {
            var that = this;
            that.next_in_index = 0;
            that.next_out_index = 0;
            // that.next_in; // next input byte
            that.avail_in = 0; // number of bytes available at next_in
            that.total_in = 0; // total nb of input bytes read so far
            // that.next_out; // next output byte should be put there
            that.avail_out = 0; // remaining free space at next_out
            that.total_out = 0; // total nb of bytes output so far
            // that.msg;
            // that.dstate;
            // that.data_type; // best guess about the data type: ascii or binary

        }

        ZStream.prototype = {
            deflateInit: function (level, bits) {
                var that = this;
                that.dstate = new Deflate();
                if (!bits) {
                    bits = MAX_BITS;
                }
                return that.dstate.deflateInit(that, level, bits);
            },

            deflate: function (flush) {
                var that = this;
                if (!that.dstate) {
                    return Z_STREAM_ERROR;
                }
                return that.dstate.deflate(that, flush);
            },

            deflateEnd: function () {
                var that = this;
                if (!that.dstate) {
                    return Z_STREAM_ERROR;
                }
                var ret = that.dstate.deflateEnd();
                that.dstate = null;
                return ret;
            },

            deflateParams: function (level, strategy) {
                var that = this;
                if (!that.dstate) {
                    return Z_STREAM_ERROR;
                }
                return that.dstate.deflateParams(that, level, strategy);
            },

            deflateSetDictionary: function (dictionary, dictLength) {
                var that = this;
                if (!that.dstate) {
                    return Z_STREAM_ERROR;
                }
                return that.dstate.deflateSetDictionary(that, dictionary, dictLength);
            },

            // Read a new buffer from the current input stream, update the
            // total number of bytes read. All deflate() input goes through
            // this function so some applications may wish to modify it to avoid
            // allocating a large strm->next_in buffer and copying from it.
            // (See also flush_pending()).
            read_buf: function (buf, start, size) {
                var that = this;
                var len = that.avail_in;
                if (len > size) {
                    len = size;
                }
                if (len === 0) {
                    return 0;
                }
                that.avail_in -= len;
                buf.set(that.next_in.subarray(that.next_in_index, that.next_in_index + len), start);
                that.next_in_index += len;
                that.total_in += len;
                return len;
            },

            // Flush as much pending output as possible. All deflate() output goes
            // through this function so some applications may wish to modify it
            // to avoid allocating a large strm->next_out buffer and copying into it.
            // (See also read_buf()).
            flush_pending: function () {
                var that = this;
                var len = that.dstate.pending;

                if (len > that.avail_out) {
                    len = that.avail_out;
                }
                if (len === 0) {
                    return;
                }

                // if (that.dstate.pending_buf.length <= that.dstate.pending_out || that.next_out.length <= that.next_out_index
                // || that.dstate.pending_buf.length < (that.dstate.pending_out + len) || that.next_out.length < (that.next_out_index +
                // len)) {
                // console.log(that.dstate.pending_buf.length + ", " + that.dstate.pending_out + ", " + that.next_out.length + ", " +
                // that.next_out_index + ", " + len);
                // console.log("avail_out=" + that.avail_out);
                // }

                that.next_out.set(that.dstate.pending_buf.subarray(that.dstate.pending_out, that.dstate.pending_out + len), that.next_out_index);

                that.next_out_index += len;
                that.dstate.pending_out += len;
                that.total_out += len;
                that.avail_out -= len;
                that.dstate.pending -= len;
                if (that.dstate.pending === 0) {
                    that.dstate.pending_out = 0;
                }
            }
        };

        // Deflater

        function Deflater(level) {
            var that = this;
            var z = new ZStream();
            var bufsize = 512;
            var flush = Z_NO_FLUSH;
            var buf = new Uint8Array(bufsize);

            if (typeof level == "undefined") {
                level = Z_DEFAULT_COMPRESSION;
            }
            z.deflateInit(level);
            z.next_out = buf;

            that.append = function (data, onprogress) {
                var err, buffers = [],
                    lastIndex = 0,
                    bufferIndex = 0,
                    bufferSize = 0,
                    array;
                if (!data.length) {
                    return;
                }
                z.next_in_index = 0;
                z.next_in = data;
                z.avail_in = data.length;
                do {
                    z.next_out_index = 0;
                    z.avail_out = bufsize;
                    err = z.deflate(flush);
                    if (err != Z_OK) {
                        throw "deflating: " + z.msg;
                    }
                    if (z.next_out_index) {
                        if (z.next_out_index == bufsize) {
                            buffers.push(new Uint8Array(buf));
                        } else {
                            buffers.push(new Uint8Array(buf.subarray(0, z.next_out_index)));
                        }
                    }
                    bufferSize += z.next_out_index;
                    if (onprogress && z.next_in_index > 0 && z.next_in_index != lastIndex) {
                        onprogress(z.next_in_index);
                        lastIndex = z.next_in_index;
                    }
                } while (z.avail_in > 0 || z.avail_out === 0);
                array = new Uint8Array(bufferSize);
                buffers.forEach(function (chunk) {
                    array.set(chunk, bufferIndex);
                    bufferIndex += chunk.length;
                });
                return array;
            };
            that.flush = function () {
                var err, ab, buffers = [],
                    bufferIndex = 0,
                    bufferSize = 0,
                    array;
                do {
                    z.next_out_index = 0;
                    z.avail_out = bufsize;
                    err = z.deflate(Z_FINISH);
                    if (err != Z_STREAM_END && err != Z_OK) {
                        throw "deflating: " + z.msg;
                    }
                    if (bufsize - z.avail_out > 0) {
                        buffers.push(new Uint8Array(buf.subarray(0, z.next_out_index)));
                    }
                    bufferSize += z.next_out_index;
                } while (z.avail_in > 0 || z.avail_out === 0);
                z.deflateEnd();
                array = new Uint8Array(bufferSize);
                buffers.forEach(function (chunk) {
                    array.set(chunk, bufferIndex);
                    bufferIndex += chunk.length;
                });
                return array;
            };
        }

        namespace.zip.Deflater = Deflater;

        /*
     Copyright (c) 2012 Gildas Lormeau. All rights reserved.

     Redistribution and use in source and binary forms, with or without
     modification, are permitted provided that the following conditions are met:

     1. Redistributions of source code must retain the above copyright notice,
     this list of conditions and the following disclaimer.

     2. Redistributions in binary form must reproduce the above copyright
     notice, this list of conditions and the following disclaimer in
     the documentation and/or other materials provided with the distribution.

     3. The names of the authors may not be used to endorse or promote products
     derived from this software without specific prior written permission.

     THIS SOFTWARE IS PROVIDED ``AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
     INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
     FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
     INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
     INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
     LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
     OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
     LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
     NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
     EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
     */

        /*
         * This program is based on JZlib 1.0.2 ymnk, JCraft,Inc.
         * JZlib is based on zlib-1.1.3, so all credit should go authors
         * Jean-loup Gailly(jloup@gzip.org) and Mark Adler(madler@alumni.caltech.edu)
         * and contributors of zlib.
         */
        // Global
        var MAX_BITS = 15;

        var Z_OK = 0;
        var Z_STREAM_END = 1;
        var Z_NEED_DICT = 2;
        var Z_STREAM_ERROR = -2;
        var Z_DATA_ERROR = -3;
        var Z_MEM_ERROR = -4;
        var Z_BUF_ERROR = -5;

        var inflate_mask = [0x00000000, 0x00000001, 0x00000003, 0x00000007, 0x0000000f, 0x0000001f, 0x0000003f, 0x0000007f, 0x000000ff, 0x000001ff, 0x000003ff,
            0x000007ff, 0x00000fff, 0x00001fff, 0x00003fff, 0x00007fff, 0x0000ffff
        ];

        var MANY = 1440;

        // JZlib version : "1.0.2"
        var Z_NO_FLUSH = 0;
        var Z_FINISH = 4;

        // InfTree
        var fixed_bl = 9;
        var fixed_bd = 5;

        var fixed_tl = [96, 7, 256, 0, 8, 80, 0, 8, 16, 84, 8, 115, 82, 7, 31, 0, 8, 112, 0, 8, 48, 0, 9, 192, 80, 7, 10, 0, 8, 96, 0, 8, 32, 0, 9, 160, 0, 8, 0,
            0, 8, 128, 0, 8, 64, 0, 9, 224, 80, 7, 6, 0, 8, 88, 0, 8, 24, 0, 9, 144, 83, 7, 59, 0, 8, 120, 0, 8, 56, 0, 9, 208, 81, 7, 17, 0, 8, 104, 0, 8, 40,
            0, 9, 176, 0, 8, 8, 0, 8, 136, 0, 8, 72, 0, 9, 240, 80, 7, 4, 0, 8, 84, 0, 8, 20, 85, 8, 227, 83, 7, 43, 0, 8, 116, 0, 8, 52, 0, 9, 200, 81, 7, 13,
            0, 8, 100, 0, 8, 36, 0, 9, 168, 0, 8, 4, 0, 8, 132, 0, 8, 68, 0, 9, 232, 80, 7, 8, 0, 8, 92, 0, 8, 28, 0, 9, 152, 84, 7, 83, 0, 8, 124, 0, 8, 60,
            0, 9, 216, 82, 7, 23, 0, 8, 108, 0, 8, 44, 0, 9, 184, 0, 8, 12, 0, 8, 140, 0, 8, 76, 0, 9, 248, 80, 7, 3, 0, 8, 82, 0, 8, 18, 85, 8, 163, 83, 7,
            35, 0, 8, 114, 0, 8, 50, 0, 9, 196, 81, 7, 11, 0, 8, 98, 0, 8, 34, 0, 9, 164, 0, 8, 2, 0, 8, 130, 0, 8, 66, 0, 9, 228, 80, 7, 7, 0, 8, 90, 0, 8,
            26, 0, 9, 148, 84, 7, 67, 0, 8, 122, 0, 8, 58, 0, 9, 212, 82, 7, 19, 0, 8, 106, 0, 8, 42, 0, 9, 180, 0, 8, 10, 0, 8, 138, 0, 8, 74, 0, 9, 244, 80,
            7, 5, 0, 8, 86, 0, 8, 22, 192, 8, 0, 83, 7, 51, 0, 8, 118, 0, 8, 54, 0, 9, 204, 81, 7, 15, 0, 8, 102, 0, 8, 38, 0, 9, 172, 0, 8, 6, 0, 8, 134, 0,
            8, 70, 0, 9, 236, 80, 7, 9, 0, 8, 94, 0, 8, 30, 0, 9, 156, 84, 7, 99, 0, 8, 126, 0, 8, 62, 0, 9, 220, 82, 7, 27, 0, 8, 110, 0, 8, 46, 0, 9, 188, 0,
            8, 14, 0, 8, 142, 0, 8, 78, 0, 9, 252, 96, 7, 256, 0, 8, 81, 0, 8, 17, 85, 8, 131, 82, 7, 31, 0, 8, 113, 0, 8, 49, 0, 9, 194, 80, 7, 10, 0, 8, 97,
            0, 8, 33, 0, 9, 162, 0, 8, 1, 0, 8, 129, 0, 8, 65, 0, 9, 226, 80, 7, 6, 0, 8, 89, 0, 8, 25, 0, 9, 146, 83, 7, 59, 0, 8, 121, 0, 8, 57, 0, 9, 210,
            81, 7, 17, 0, 8, 105, 0, 8, 41, 0, 9, 178, 0, 8, 9, 0, 8, 137, 0, 8, 73, 0, 9, 242, 80, 7, 4, 0, 8, 85, 0, 8, 21, 80, 8, 258, 83, 7, 43, 0, 8, 117,
            0, 8, 53, 0, 9, 202, 81, 7, 13, 0, 8, 101, 0, 8, 37, 0, 9, 170, 0, 8, 5, 0, 8, 133, 0, 8, 69, 0, 9, 234, 80, 7, 8, 0, 8, 93, 0, 8, 29, 0, 9, 154,
            84, 7, 83, 0, 8, 125, 0, 8, 61, 0, 9, 218, 82, 7, 23, 0, 8, 109, 0, 8, 45, 0, 9, 186, 0, 8, 13, 0, 8, 141, 0, 8, 77, 0, 9, 250, 80, 7, 3, 0, 8, 83,
            0, 8, 19, 85, 8, 195, 83, 7, 35, 0, 8, 115, 0, 8, 51, 0, 9, 198, 81, 7, 11, 0, 8, 99, 0, 8, 35, 0, 9, 166, 0, 8, 3, 0, 8, 131, 0, 8, 67, 0, 9, 230,
            80, 7, 7, 0, 8, 91, 0, 8, 27, 0, 9, 150, 84, 7, 67, 0, 8, 123, 0, 8, 59, 0, 9, 214, 82, 7, 19, 0, 8, 107, 0, 8, 43, 0, 9, 182, 0, 8, 11, 0, 8, 139,
            0, 8, 75, 0, 9, 246, 80, 7, 5, 0, 8, 87, 0, 8, 23, 192, 8, 0, 83, 7, 51, 0, 8, 119, 0, 8, 55, 0, 9, 206, 81, 7, 15, 0, 8, 103, 0, 8, 39, 0, 9, 174,
            0, 8, 7, 0, 8, 135, 0, 8, 71, 0, 9, 238, 80, 7, 9, 0, 8, 95, 0, 8, 31, 0, 9, 158, 84, 7, 99, 0, 8, 127, 0, 8, 63, 0, 9, 222, 82, 7, 27, 0, 8, 111,
            0, 8, 47, 0, 9, 190, 0, 8, 15, 0, 8, 143, 0, 8, 79, 0, 9, 254, 96, 7, 256, 0, 8, 80, 0, 8, 16, 84, 8, 115, 82, 7, 31, 0, 8, 112, 0, 8, 48, 0, 9,
            193, 80, 7, 10, 0, 8, 96, 0, 8, 32, 0, 9, 161, 0, 8, 0, 0, 8, 128, 0, 8, 64, 0, 9, 225, 80, 7, 6, 0, 8, 88, 0, 8, 24, 0, 9, 145, 83, 7, 59, 0, 8,
            120, 0, 8, 56, 0, 9, 209, 81, 7, 17, 0, 8, 104, 0, 8, 40, 0, 9, 177, 0, 8, 8, 0, 8, 136, 0, 8, 72, 0, 9, 241, 80, 7, 4, 0, 8, 84, 0, 8, 20, 85, 8,
            227, 83, 7, 43, 0, 8, 116, 0, 8, 52, 0, 9, 201, 81, 7, 13, 0, 8, 100, 0, 8, 36, 0, 9, 169, 0, 8, 4, 0, 8, 132, 0, 8, 68, 0, 9, 233, 80, 7, 8, 0, 8,
            92, 0, 8, 28, 0, 9, 153, 84, 7, 83, 0, 8, 124, 0, 8, 60, 0, 9, 217, 82, 7, 23, 0, 8, 108, 0, 8, 44, 0, 9, 185, 0, 8, 12, 0, 8, 140, 0, 8, 76, 0, 9,
            249, 80, 7, 3, 0, 8, 82, 0, 8, 18, 85, 8, 163, 83, 7, 35, 0, 8, 114, 0, 8, 50, 0, 9, 197, 81, 7, 11, 0, 8, 98, 0, 8, 34, 0, 9, 165, 0, 8, 2, 0, 8,
            130, 0, 8, 66, 0, 9, 229, 80, 7, 7, 0, 8, 90, 0, 8, 26, 0, 9, 149, 84, 7, 67, 0, 8, 122, 0, 8, 58, 0, 9, 213, 82, 7, 19, 0, 8, 106, 0, 8, 42, 0, 9,
            181, 0, 8, 10, 0, 8, 138, 0, 8, 74, 0, 9, 245, 80, 7, 5, 0, 8, 86, 0, 8, 22, 192, 8, 0, 83, 7, 51, 0, 8, 118, 0, 8, 54, 0, 9, 205, 81, 7, 15, 0, 8,
            102, 0, 8, 38, 0, 9, 173, 0, 8, 6, 0, 8, 134, 0, 8, 70, 0, 9, 237, 80, 7, 9, 0, 8, 94, 0, 8, 30, 0, 9, 157, 84, 7, 99, 0, 8, 126, 0, 8, 62, 0, 9,
            221, 82, 7, 27, 0, 8, 110, 0, 8, 46, 0, 9, 189, 0, 8, 14, 0, 8, 142, 0, 8, 78, 0, 9, 253, 96, 7, 256, 0, 8, 81, 0, 8, 17, 85, 8, 131, 82, 7, 31, 0,
            8, 113, 0, 8, 49, 0, 9, 195, 80, 7, 10, 0, 8, 97, 0, 8, 33, 0, 9, 163, 0, 8, 1, 0, 8, 129, 0, 8, 65, 0, 9, 227, 80, 7, 6, 0, 8, 89, 0, 8, 25, 0, 9,
            147, 83, 7, 59, 0, 8, 121, 0, 8, 57, 0, 9, 211, 81, 7, 17, 0, 8, 105, 0, 8, 41, 0, 9, 179, 0, 8, 9, 0, 8, 137, 0, 8, 73, 0, 9, 243, 80, 7, 4, 0, 8,
            85, 0, 8, 21, 80, 8, 258, 83, 7, 43, 0, 8, 117, 0, 8, 53, 0, 9, 203, 81, 7, 13, 0, 8, 101, 0, 8, 37, 0, 9, 171, 0, 8, 5, 0, 8, 133, 0, 8, 69, 0, 9,
            235, 80, 7, 8, 0, 8, 93, 0, 8, 29, 0, 9, 155, 84, 7, 83, 0, 8, 125, 0, 8, 61, 0, 9, 219, 82, 7, 23, 0, 8, 109, 0, 8, 45, 0, 9, 187, 0, 8, 13, 0, 8,
            141, 0, 8, 77, 0, 9, 251, 80, 7, 3, 0, 8, 83, 0, 8, 19, 85, 8, 195, 83, 7, 35, 0, 8, 115, 0, 8, 51, 0, 9, 199, 81, 7, 11, 0, 8, 99, 0, 8, 35, 0, 9,
            167, 0, 8, 3, 0, 8, 131, 0, 8, 67, 0, 9, 231, 80, 7, 7, 0, 8, 91, 0, 8, 27, 0, 9, 151, 84, 7, 67, 0, 8, 123, 0, 8, 59, 0, 9, 215, 82, 7, 19, 0, 8,
            107, 0, 8, 43, 0, 9, 183, 0, 8, 11, 0, 8, 139, 0, 8, 75, 0, 9, 247, 80, 7, 5, 0, 8, 87, 0, 8, 23, 192, 8, 0, 83, 7, 51, 0, 8, 119, 0, 8, 55, 0, 9,
            207, 81, 7, 15, 0, 8, 103, 0, 8, 39, 0, 9, 175, 0, 8, 7, 0, 8, 135, 0, 8, 71, 0, 9, 239, 80, 7, 9, 0, 8, 95, 0, 8, 31, 0, 9, 159, 84, 7, 99, 0, 8,
            127, 0, 8, 63, 0, 9, 223, 82, 7, 27, 0, 8, 111, 0, 8, 47, 0, 9, 191, 0, 8, 15, 0, 8, 143, 0, 8, 79, 0, 9, 255
        ];
        var fixed_td = [80, 5, 1, 87, 5, 257, 83, 5, 17, 91, 5, 4097, 81, 5, 5, 89, 5, 1025, 85, 5, 65, 93, 5, 16385, 80, 5, 3, 88, 5, 513, 84, 5, 33, 92, 5,
            8193, 82, 5, 9, 90, 5, 2049, 86, 5, 129, 192, 5, 24577, 80, 5, 2, 87, 5, 385, 83, 5, 25, 91, 5, 6145, 81, 5, 7, 89, 5, 1537, 85, 5, 97, 93, 5,
            24577, 80, 5, 4, 88, 5, 769, 84, 5, 49, 92, 5, 12289, 82, 5, 13, 90, 5, 3073, 86, 5, 193, 192, 5, 24577
        ];

        // Tables for deflate from PKZIP's appnote.txt.
        var cplens = [ // Copy lengths for literal codes 257..285
            3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0
        ];

        // see note #13 above about 258
        var cplext = [ // Extra bits for literal codes 257..285
            0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 112, 112 // 112==invalid
        ];

        var cpdist = [ // Copy offsets for distance codes 0..29
            1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577
        ];

        var cpdext = [ // Extra bits for distance codes
            0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13
        ];

        // If BMAX needs to be larger than 16, then h and x[] should be uLong.
        var BMAX = 15; // maximum bit length of any code

        function InfTree() {
            var that = this;

            var hn; // hufts used in space
            var v; // work area for huft_build
            var c; // bit length count table
            var r; // table entry for structure assignment
            var u; // table stack
            var x; // bit offsets, then code stack

            function huft_build(b, // code lengths in bits (all assumed <=
                // BMAX)
                bindex, n, // number of codes (assumed <= 288)
                s, // number of simple-valued codes (0..s-1)
                d, // list of base values for non-simple codes
                e, // list of extra bits for non-simple codes
                t, // result: starting table
                m, // maximum lookup bits, returns actual
                hp, // space for trees
                hn, // hufts used in space
                v // working area: values in order of bit length
            ) {
                // Given a list of code lengths and a maximum table size, make a set of
                // tables to decode that set of codes. Return Z_OK on success,
                // Z_BUF_ERROR
                // if the given code set is incomplete (the tables are still built in
                // this
                // case), Z_DATA_ERROR if the input is invalid (an over-subscribed set
                // of
                // lengths), or Z_MEM_ERROR if not enough memory.

                var a; // counter for codes of length k
                var f; // i repeats in table every f entries
                var g; // maximum code length
                var h; // table level
                var i; // counter, current code
                var j; // counter
                var k; // number of bits in current code
                var l; // bits per table (returned in m)
                var mask; // (1 << w) - 1, to avoid cc -O bug on HP
                var p; // pointer into c[], b[], or v[]
                var q; // points to current table
                var w; // bits before this table == (l * h)
                var xp; // pointer into x
                var y; // number of dummy codes added
                var z; // number of entries in current table

                // Generate counts for each bit length

                p = 0;
                i = n;
                do {
                    c[b[bindex + p]]++;
                    p++;
                    i--; // assume all entries <= BMAX
                } while (i !== 0);

                if (c[0] == n) { // null input--all zero length codes
                    t[0] = -1;
                    m[0] = 0;
                    return Z_OK;
                }

                // Find minimum and maximum length, bound *m by those
                l = m[0];
                for (j = 1; j <= BMAX; j++) {
                    if (c[j] !== 0) {
                        break;
                    }
                }
                k = j; // minimum code length
                if (l < j) {
                    l = j;
                }
                for (i = BMAX; i !== 0; i--) {
                    if (c[i] !== 0) {
                        break;
                    }
                }
                g = i; // maximum code length
                if (l > i) {
                    l = i;
                }
                m[0] = l;

                // Adjust last length count to fill out codes, if needed
                for (y = 1 << j; j < i; j++, y <<= 1) {
                    if ((y -= c[j]) < 0) {
                        return Z_DATA_ERROR;
                    }
                }
                if ((y -= c[i]) < 0) {
                    return Z_DATA_ERROR;
                }
                c[i] += y;

                // Generate starting offsets into the value table for each length
                x[1] = j = 0;
                p = 1;
                xp = 2;
                while (--i !== 0) { // note that i == g from above
                    x[xp] = (j += c[p]);
                    xp++;
                    p++;
                }

                // Make a table of values in order of bit lengths
                i = 0;
                p = 0;
                do {
                    if ((j = b[bindex + p]) !== 0) {
                        v[x[j]++] = i;
                    }
                    p++;
                } while (++i < n);
                n = x[g]; // set n to length of v

                // Generate the Huffman codes and for each, make the table entries
                x[0] = i = 0; // first Huffman code is zero
                p = 0; // grab values in bit order
                h = -1; // no tables yet--level -1
                w = -l; // bits decoded == (l * h)
                u[0] = 0; // just to keep compilers happy
                q = 0; // ditto
                z = 0; // ditto

                // go through the bit lengths (k already is bits in shortest code)
                for (k; k <= g; k++) {
                    a = c[k];
                    while (a-- !== 0) {
                        // here i is the Huffman code of length k bits for value *p
                        // make tables up to required level
                        while (k > w + l) {
                            h++;
                            w += l; // previous table always l bits
                            // compute minimum size table less than or equal to l bits
                            z = g - w;
                            z = (z > l) ? l : z; // table size upper limit
                            if ((f = 1 << (j = k - w)) > a + 1) { // try a k-w bit table
                                // too few codes for
                                // k-w bit table
                                f -= a + 1; // deduct codes from patterns left
                                xp = k;
                                if (j < z) {
                                    while (++j < z) { // try smaller tables up to z bits
                                        if ((f <<= 1) <= c[++xp]) {
                                            break;
                                        } // enough codes to use up j bits
                                        f -= c[xp]; // else deduct codes from patterns
                                    }
                                }
                            }
                            z = 1 << j; // table entries for j-bit table

                            // allocate new table
                            if (hn[0] + z > MANY) { // (note: doesn't matter for fixed)
                                return Z_DATA_ERROR; // overflow of MANY
                            }
                            u[h] = q = /* hp+ */ hn[0]; // DEBUG
                            hn[0] += z;

                            // connect to last table, if there is one
                            if (h !== 0) {
                                x[h] = i; // save pattern for backing up
                                r[0] = /* (byte) */ j; // bits in this table
                                r[1] = /* (byte) */ l; // bits to dump before this table
                                j = i >>> (w - l);
                                r[2] = /* (int) */ (q - u[h - 1] - j); // offset to this table
                                hp.set(r, (u[h - 1] + j) * 3);
                                // to
                                // last
                                // table
                            } else {
                                t[0] = q; // first table is returned result
                            }
                        }

                        // set up table entry in r
                        r[1] = /* (byte) */ (k - w);
                        if (p >= n) {
                            r[0] = 128 + 64; // out of values--invalid code
                        } else if (v[p] < s) {
                            r[0] = /* (byte) */ (v[p] < 256 ? 0 : 32 + 64); // 256 is
                            // end-of-block
                            r[2] = v[p++]; // simple code is just the value
                        } else {
                            r[0] = /* (byte) */ (e[v[p] - s] + 16 + 64); // non-simple--look
                            // up in lists
                            r[2] = d[v[p++] - s];
                        }

                        // fill code-like entries with r
                        f = 1 << (k - w);
                        for (j = i >>> w; j < z; j += f) {
                            hp.set(r, (q + j) * 3);
                        }

                        // backwards increment the k-bit code i
                        for (j = 1 << (k - 1);
                            (i & j) !== 0; j >>>= 1) {
                            i ^= j;
                        }
                        i ^= j;

                        // backup over finished tables
                        mask = (1 << w) - 1; // needed on HP, cc -O bug
                        while ((i & mask) != x[h]) {
                            h--; // don't need to update q
                            w -= l;
                            mask = (1 << w) - 1;
                        }
                    }
                }
                // Return Z_BUF_ERROR if we were given an incomplete table
                return y !== 0 && g != 1 ? Z_BUF_ERROR : Z_OK;
            }

            function initWorkArea(vsize) {
                var i;
                if (!hn) {
                    hn = []; // []; //new Array(1);
                    v = []; // new Array(vsize);
                    c = new Int32Array(BMAX + 1); // new Array(BMAX + 1);
                    r = []; // new Array(3);
                    u = new Int32Array(BMAX); // new Array(BMAX);
                    x = new Int32Array(BMAX + 1); // new Array(BMAX + 1);
                }
                if (v.length < vsize) {
                    v = []; // new Array(vsize);
                }
                for (i = 0; i < vsize; i++) {
                    v[i] = 0;
                }
                for (i = 0; i < BMAX + 1; i++) {
                    c[i] = 0;
                }
                for (i = 0; i < 3; i++) {
                    r[i] = 0;
                }
                // for(int i=0; i<BMAX; i++){u[i]=0;}
                u.set(c.subarray(0, BMAX), 0);
                // for(int i=0; i<BMAX+1; i++){x[i]=0;}
                x.set(c.subarray(0, BMAX + 1), 0);
            }

            that.inflate_trees_bits = function (c, // 19 code lengths
                bb, // bits tree desired/actual depth
                tb, // bits tree result
                hp, // space for trees
                z // for messages
            ) {
                var result;
                initWorkArea(19);
                hn[0] = 0;
                result = huft_build(c, 0, 19, 19, null, null, tb, bb, hp, hn, v);

                if (result == Z_DATA_ERROR) {
                    z.msg = "oversubscribed dynamic bit lengths tree";
                } else if (result == Z_BUF_ERROR || bb[0] === 0) {
                    z.msg = "incomplete dynamic bit lengths tree";
                    result = Z_DATA_ERROR;
                }
                return result;
            };

            that.inflate_trees_dynamic = function (nl, // number of literal/length codes
                nd, // number of distance codes
                c, // that many (total) code lengths
                bl, // literal desired/actual bit depth
                bd, // distance desired/actual bit depth
                tl, // literal/length tree result
                td, // distance tree result
                hp, // space for trees
                z // for messages
            ) {
                var result;

                // build literal/length tree
                initWorkArea(288);
                hn[0] = 0;
                result = huft_build(c, 0, nl, 257, cplens, cplext, tl, bl, hp, hn, v);
                if (result != Z_OK || bl[0] === 0) {
                    if (result == Z_DATA_ERROR) {
                        z.msg = "oversubscribed literal/length tree";
                    } else if (result != Z_MEM_ERROR) {
                        z.msg = "incomplete literal/length tree";
                        result = Z_DATA_ERROR;
                    }
                    return result;
                }

                // build distance tree
                initWorkArea(288);
                result = huft_build(c, nl, nd, 0, cpdist, cpdext, td, bd, hp, hn, v);

                if (result != Z_OK || (bd[0] === 0 && nl > 257)) {
                    if (result == Z_DATA_ERROR) {
                        z.msg = "oversubscribed distance tree";
                    } else if (result == Z_BUF_ERROR) {
                        z.msg = "incomplete distance tree";
                        result = Z_DATA_ERROR;
                    } else if (result != Z_MEM_ERROR) {
                        z.msg = "empty distance tree with lengths";
                        result = Z_DATA_ERROR;
                    }
                    return result;
                }

                return Z_OK;
            };

        }

        InfTree.inflate_trees_fixed = function (bl, // literal desired/actual bit depth
            bd, // distance desired/actual bit depth
            tl, // literal/length tree result
            td, // distance tree result
            z // for memory allocation
        ) {
            bl[0] = fixed_bl;
            bd[0] = fixed_bd;
            tl[0] = fixed_tl;
            td[0] = fixed_td;
            return Z_OK;
        };

        // InfCodes

        // waiting for "i:"=input,
        // "o:"=output,
        // "x:"=nothing
        var START = 0; // x: set up for LEN
        var LEN = 1; // i: get length/literal/eob next
        var LENEXT = 2; // i: getting length extra (have base)
        var DIST = 3; // i: get distance next
        var DISTEXT = 4; // i: getting distance extra
        var COPY = 5; // o: copying bytes in window, waiting
        // for space
        var LIT = 6; // o: got literal, waiting for output
        // space
        var WASH = 7; // o: got eob, possibly still output
        // waiting
        var END = 8; // x: got eob and all data flushed
        var BADCODE = 9; // x: got error

        function InfCodes() {
            var that = this;

            var mode; // current inflate_codes mode

            // mode dependent information
            var len = 0;

            var tree; // pointer into tree
            var tree_index = 0;
            var need = 0; // bits needed

            var lit = 0;

            // if EXT or COPY, where and how much
            var get = 0; // bits to get for extra
            var dist = 0; // distance back to copy from

            var lbits = 0; // ltree bits decoded per branch
            var dbits = 0; // dtree bits decoder per branch
            var ltree; // literal/length/eob tree
            var ltree_index = 0; // literal/length/eob tree
            var dtree; // distance tree
            var dtree_index = 0; // distance tree

            // Called with number of bytes left to write in window at least 258
            // (the maximum string length) and number of input bytes available
            // at least ten. The ten bytes are six bytes for the longest length/
            // distance pair plus four bytes for overloading the bit buffer.

            function inflate_fast(bl, bd, tl, tl_index, td, td_index, s, z) {
                var t; // temporary pointer
                var tp; // temporary pointer
                var tp_index; // temporary pointer
                var e; // extra bits or operation
                var b; // bit buffer
                var k; // bits in bit buffer
                var p; // input data pointer
                var n; // bytes available there
                var q; // output window write pointer
                var m; // bytes to end of window or read pointer
                var ml; // mask for literal/length tree
                var md; // mask for distance tree
                var c; // bytes to copy
                var d; // distance back to copy from
                var r; // copy source pointer

                var tp_index_t_3; // (tp_index+t)*3

                // load input, output, bit values
                p = z.next_in_index;
                n = z.avail_in;
                b = s.bitb;
                k = s.bitk;
                q = s.write;
                m = q < s.read ? s.read - q - 1 : s.end - q;

                // initialize masks
                ml = inflate_mask[bl];
                md = inflate_mask[bd];

                // do until not enough input or output space for fast loop
                do { // assume called with m >= 258 && n >= 10
                    // get literal/length code
                    while (k < (20)) { // max bits for literal/length code
                        n--;
                        b |= (z.read_byte(p++) & 0xff) << k;
                        k += 8;
                    }

                    t = b & ml;
                    tp = tl;
                    tp_index = tl_index;
                    tp_index_t_3 = (tp_index + t) * 3;
                    if ((e = tp[tp_index_t_3]) === 0) {
                        b >>= (tp[tp_index_t_3 + 1]);
                        k -= (tp[tp_index_t_3 + 1]);

                        s.window[q++] = /* (byte) */ tp[tp_index_t_3 + 2];
                        m--;
                        continue;
                    }
                    do {

                        b >>= (tp[tp_index_t_3 + 1]);
                        k -= (tp[tp_index_t_3 + 1]);

                        if ((e & 16) !== 0) {
                            e &= 15;
                            c = tp[tp_index_t_3 + 2] + (b & inflate_mask[e]);

                            b >>= e;
                            k -= e;

                            // decode distance base of block to copy
                            while (k < (15)) { // max bits for distance code
                                n--;
                                b |= (z.read_byte(p++) & 0xff) << k;
                                k += 8;
                            }

                            t = b & md;
                            tp = td;
                            tp_index = td_index;
                            tp_index_t_3 = (tp_index + t) * 3;
                            e = tp[tp_index_t_3];

                            do {

                                b >>= (tp[tp_index_t_3 + 1]);
                                k -= (tp[tp_index_t_3 + 1]);

                                if ((e & 16) !== 0) {
                                    // get extra bits to add to distance base
                                    e &= 15;
                                    while (k < (e)) { // get extra bits (up to 13)
                                        n--;
                                        b |= (z.read_byte(p++) & 0xff) << k;
                                        k += 8;
                                    }

                                    d = tp[tp_index_t_3 + 2] + (b & inflate_mask[e]);

                                    b >>= (e);
                                    k -= (e);

                                    // do the copy
                                    m -= c;
                                    if (q >= d) { // offset before dest
                                        // just copy
                                        r = q - d;
                                        if (q - r > 0 && 2 > (q - r)) {
                                            s.window[q++] = s.window[r++]; // minimum
                                            // count is
                                            // three,
                                            s.window[q++] = s.window[r++]; // so unroll
                                            // loop a
                                            // little
                                            c -= 2;
                                        } else {
                                            s.window.set(s.window.subarray(r, r + 2), q);
                                            q += 2;
                                            r += 2;
                                            c -= 2;
                                        }
                                    } else { // else offset after destination
                                        r = q - d;
                                        do {
                                            r += s.end; // force pointer in window
                                        } while (r < 0); // covers invalid distances
                                        e = s.end - r;
                                        if (c > e) { // if source crosses,
                                            c -= e; // wrapped copy
                                            if (q - r > 0 && e > (q - r)) {
                                                do {
                                                    s.window[q++] = s.window[r++];
                                                } while (--e !== 0);
                                            } else {
                                                s.window.set(s.window.subarray(r, r + e), q);
                                                q += e;
                                                r += e;
                                                e = 0;
                                            }
                                            r = 0; // copy rest from start of window
                                        }

                                    }

                                    // copy all or what's left
                                    if (q - r > 0 && c > (q - r)) {
                                        do {
                                            s.window[q++] = s.window[r++];
                                        } while (--c !== 0);
                                    } else {
                                        s.window.set(s.window.subarray(r, r + c), q);
                                        q += c;
                                        r += c;
                                        c = 0;
                                    }
                                    break;
                                } else if ((e & 64) === 0) {
                                    t += tp[tp_index_t_3 + 2];
                                    t += (b & inflate_mask[e]);
                                    tp_index_t_3 = (tp_index + t) * 3;
                                    e = tp[tp_index_t_3];
                                } else {
                                    z.msg = "invalid distance code";

                                    c = z.avail_in - n;
                                    c = (k >> 3) < c ? k >> 3 : c;
                                    n += c;
                                    p -= c;
                                    k -= c << 3;

                                    s.bitb = b;
                                    s.bitk = k;
                                    z.avail_in = n;
                                    z.total_in += p - z.next_in_index;
                                    z.next_in_index = p;
                                    s.write = q;

                                    return Z_DATA_ERROR;
                                }
                            } while (true);
                            break;
                        }

                        if ((e & 64) === 0) {
                            t += tp[tp_index_t_3 + 2];
                            t += (b & inflate_mask[e]);
                            tp_index_t_3 = (tp_index + t) * 3;
                            if ((e = tp[tp_index_t_3]) === 0) {

                                b >>= (tp[tp_index_t_3 + 1]);
                                k -= (tp[tp_index_t_3 + 1]);

                                s.window[q++] = /* (byte) */ tp[tp_index_t_3 + 2];
                                m--;
                                break;
                            }
                        } else if ((e & 32) !== 0) {

                            c = z.avail_in - n;
                            c = (k >> 3) < c ? k >> 3 : c;
                            n += c;
                            p -= c;
                            k -= c << 3;

                            s.bitb = b;
                            s.bitk = k;
                            z.avail_in = n;
                            z.total_in += p - z.next_in_index;
                            z.next_in_index = p;
                            s.write = q;

                            return Z_STREAM_END;
                        } else {
                            z.msg = "invalid literal/length code";

                            c = z.avail_in - n;
                            c = (k >> 3) < c ? k >> 3 : c;
                            n += c;
                            p -= c;
                            k -= c << 3;

                            s.bitb = b;
                            s.bitk = k;
                            z.avail_in = n;
                            z.total_in += p - z.next_in_index;
                            z.next_in_index = p;
                            s.write = q;

                            return Z_DATA_ERROR;
                        }
                    } while (true);
                } while (m >= 258 && n >= 10);

                // not enough input or output--restore pointers and return
                c = z.avail_in - n;
                c = (k >> 3) < c ? k >> 3 : c;
                n += c;
                p -= c;
                k -= c << 3;

                s.bitb = b;
                s.bitk = k;
                z.avail_in = n;
                z.total_in += p - z.next_in_index;
                z.next_in_index = p;
                s.write = q;

                return Z_OK;
            }

            that.init = function (bl, bd, tl, tl_index, td, td_index, z) {
                mode = START;
                lbits = /* (byte) */ bl;
                dbits = /* (byte) */ bd;
                ltree = tl;
                ltree_index = tl_index;
                dtree = td;
                dtree_index = td_index;
                tree = null;
            };

            that.proc = function (s, z, r) {
                var j; // temporary storage
                var t; // temporary pointer
                var tindex; // temporary pointer
                var e; // extra bits or operation
                var b = s.bitb; // bit buffer
                var k = s.bitk; // bits in bit buffer
                var p = z.next_in_index; // input data pointer
                var n = z.avail_in; // bytes available there
                var q = s.write; // output window write pointer
                var m = q < s.read ? s.read - q - 1 : s.end - q; // bytes to end of window or read pointer
                var f; // pointer to copy strings from

                // process input and output based on current state
                while (true) {
                    switch (mode) {
                        // waiting for "i:"=input, "o:"=output, "x:"=nothing
                    case START: // x: set up for LEN
                        if (m >= 258 && n >= 10) {

                            s.bitb = b;
                            s.bitk = k;
                            z.avail_in = n;
                            z.total_in += p - z.next_in_index;
                            z.next_in_index = p;
                            s.write = q;
                            r = inflate_fast(lbits, dbits, ltree, ltree_index, dtree, dtree_index, s, z);

                            p = z.next_in_index;
                            n = z.avail_in;
                            b = s.bitb;
                            k = s.bitk;
                            q = s.write;
                            m = q < s.read ? s.read - q - 1 : s.end - q;

                            if (r != Z_OK) {
                                mode = r == Z_STREAM_END ? WASH : BADCODE;
                                break;
                            }
                        }
                        need = lbits;
                        tree = ltree;
                        tree_index = ltree_index;

                        mode = LEN;
                    case LEN: // i: get length/literal/eob next
                        j = need;

                        while (k < (j)) {
                            if (n !== 0) {
                                r = Z_OK;
                            } else {

                                s.bitb = b;
                                s.bitk = k;
                                z.avail_in = n;
                                z.total_in += p - z.next_in_index;
                                z.next_in_index = p;
                                s.write = q;
                                return s.inflate_flush(z, r);
                            }
                            n--;
                            b |= (z.read_byte(p++) & 0xff) << k;
                            k += 8;
                        }

                        tindex = (tree_index + (b & inflate_mask[j])) * 3;

                        b >>>= (tree[tindex + 1]);
                        k -= (tree[tindex + 1]);

                        e = tree[tindex];

                        if (e === 0) { // literal
                            lit = tree[tindex + 2];
                            mode = LIT;
                            break;
                        }
                        if ((e & 16) !== 0) { // length
                            get = e & 15;
                            len = tree[tindex + 2];
                            mode = LENEXT;
                            break;
                        }
                        if ((e & 64) === 0) { // next table
                            need = e;
                            tree_index = tindex / 3 + tree[tindex + 2];
                            break;
                        }
                        if ((e & 32) !== 0) { // end of block
                            mode = WASH;
                            break;
                        }
                        mode = BADCODE; // invalid code
                        z.msg = "invalid literal/length code";
                        r = Z_DATA_ERROR;

                        s.bitb = b;
                        s.bitk = k;
                        z.avail_in = n;
                        z.total_in += p - z.next_in_index;
                        z.next_in_index = p;
                        s.write = q;
                        return s.inflate_flush(z, r);

                    case LENEXT: // i: getting length extra (have base)
                        j = get;

                        while (k < (j)) {
                            if (n !== 0) {
                                r = Z_OK;
                            } else {

                                s.bitb = b;
                                s.bitk = k;
                                z.avail_in = n;
                                z.total_in += p - z.next_in_index;
                                z.next_in_index = p;
                                s.write = q;
                                return s.inflate_flush(z, r);
                            }
                            n--;
                            b |= (z.read_byte(p++) & 0xff) << k;
                            k += 8;
                        }

                        len += (b & inflate_mask[j]);

                        b >>= j;
                        k -= j;

                        need = dbits;
                        tree = dtree;
                        tree_index = dtree_index;
                        mode = DIST;
                    case DIST: // i: get distance next
                        j = need;

                        while (k < (j)) {
                            if (n !== 0) {
                                r = Z_OK;
                            } else {

                                s.bitb = b;
                                s.bitk = k;
                                z.avail_in = n;
                                z.total_in += p - z.next_in_index;
                                z.next_in_index = p;
                                s.write = q;
                                return s.inflate_flush(z, r);
                            }
                            n--;
                            b |= (z.read_byte(p++) & 0xff) << k;
                            k += 8;
                        }

                        tindex = (tree_index + (b & inflate_mask[j])) * 3;

                        b >>= tree[tindex + 1];
                        k -= tree[tindex + 1];

                        e = (tree[tindex]);
                        if ((e & 16) !== 0) { // distance
                            get = e & 15;
                            dist = tree[tindex + 2];
                            mode = DISTEXT;
                            break;
                        }
                        if ((e & 64) === 0) { // next table
                            need = e;
                            tree_index = tindex / 3 + tree[tindex + 2];
                            break;
                        }
                        mode = BADCODE; // invalid code
                        z.msg = "invalid distance code";
                        r = Z_DATA_ERROR;

                        s.bitb = b;
                        s.bitk = k;
                        z.avail_in = n;
                        z.total_in += p - z.next_in_index;
                        z.next_in_index = p;
                        s.write = q;
                        return s.inflate_flush(z, r);

                    case DISTEXT: // i: getting distance extra
                        j = get;

                        while (k < (j)) {
                            if (n !== 0) {
                                r = Z_OK;
                            } else {

                                s.bitb = b;
                                s.bitk = k;
                                z.avail_in = n;
                                z.total_in += p - z.next_in_index;
                                z.next_in_index = p;
                                s.write = q;
                                return s.inflate_flush(z, r);
                            }
                            n--;
                            b |= (z.read_byte(p++) & 0xff) << k;
                            k += 8;
                        }

                        dist += (b & inflate_mask[j]);

                        b >>= j;
                        k -= j;

                        mode = COPY;
                    case COPY: // o: copying bytes in window, waiting for space
                        f = q - dist;
                        while (f < 0) { // modulo window size-"while" instead
                            f += s.end; // of "if" handles invalid distances
                        }
                        while (len !== 0) {

                            if (m === 0) {
                                if (q == s.end && s.read !== 0) {
                                    q = 0;
                                    m = q < s.read ? s.read - q - 1 : s.end - q;
                                }
                                if (m === 0) {
                                    s.write = q;
                                    r = s.inflate_flush(z, r);
                                    q = s.write;
                                    m = q < s.read ? s.read - q - 1 : s.end - q;

                                    if (q == s.end && s.read !== 0) {
                                        q = 0;
                                        m = q < s.read ? s.read - q - 1 : s.end - q;
                                    }

                                    if (m === 0) {
                                        s.bitb = b;
                                        s.bitk = k;
                                        z.avail_in = n;
                                        z.total_in += p - z.next_in_index;
                                        z.next_in_index = p;
                                        s.write = q;
                                        return s.inflate_flush(z, r);
                                    }
                                }
                            }

                            s.window[q++] = s.window[f++];
                            m--;

                            if (f == s.end) {
                                f = 0;
                            }
                            len--;
                        }
                        mode = START;
                        break;
                    case LIT: // o: got literal, waiting for output space
                        if (m === 0) {
                            if (q == s.end && s.read !== 0) {
                                q = 0;
                                m = q < s.read ? s.read - q - 1 : s.end - q;
                            }
                            if (m === 0) {
                                s.write = q;
                                r = s.inflate_flush(z, r);
                                q = s.write;
                                m = q < s.read ? s.read - q - 1 : s.end - q;

                                if (q == s.end && s.read !== 0) {
                                    q = 0;
                                    m = q < s.read ? s.read - q - 1 : s.end - q;
                                }
                                if (m === 0) {
                                    s.bitb = b;
                                    s.bitk = k;
                                    z.avail_in = n;
                                    z.total_in += p - z.next_in_index;
                                    z.next_in_index = p;
                                    s.write = q;
                                    return s.inflate_flush(z, r);
                                }
                            }
                        }
                        r = Z_OK;

                        s.window[q++] = /* (byte) */ lit;
                        m--;

                        mode = START;
                        break;
                    case WASH: // o: got eob, possibly more output
                        if (k > 7) { // return unused byte, if any
                            k -= 8;
                            n++;
                            p--; // can always return one
                        }

                        s.write = q;
                        r = s.inflate_flush(z, r);
                        q = s.write;
                        m = q < s.read ? s.read - q - 1 : s.end - q;

                        if (s.read != s.write) {
                            s.bitb = b;
                            s.bitk = k;
                            z.avail_in = n;
                            z.total_in += p - z.next_in_index;
                            z.next_in_index = p;
                            s.write = q;
                            return s.inflate_flush(z, r);
                        }
                        mode = END;
                    case END:
                        r = Z_STREAM_END;
                        s.bitb = b;
                        s.bitk = k;
                        z.avail_in = n;
                        z.total_in += p - z.next_in_index;
                        z.next_in_index = p;
                        s.write = q;
                        return s.inflate_flush(z, r);

                    case BADCODE: // x: got error

                        r = Z_DATA_ERROR;

                        s.bitb = b;
                        s.bitk = k;
                        z.avail_in = n;
                        z.total_in += p - z.next_in_index;
                        z.next_in_index = p;
                        s.write = q;
                        return s.inflate_flush(z, r);

                    default:
                        r = Z_STREAM_ERROR;

                        s.bitb = b;
                        s.bitk = k;
                        z.avail_in = n;
                        z.total_in += p - z.next_in_index;
                        z.next_in_index = p;
                        s.write = q;
                        return s.inflate_flush(z, r);
                    }
                }
            };

            that.free = function (z) {
                // ZFREE(z, c);
            };

        }

        // InfBlocks

        // Table for deflate from PKZIP's appnote.txt.
        var border = [ // Order of the bit length code lengths
            16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15
        ];

        var TYPE = 0; // get type bits (3, including end bit)
        var LENS = 1; // get lengths for stored
        var STORED = 2; // processing stored block
        var TABLE = 3; // get table lengths
        var BTREE = 4; // get bit lengths tree for a dynamic
        // block
        var DTREE = 5; // get length, distance trees for a
        // dynamic block
        var CODES = 6; // processing fixed or dynamic block
        var DRY = 7; // output remaining window bytes
        var DONELOCKS = 8; // finished last block, done
        var BADBLOCKS = 9; // ot a data error--stuck here

        function InfBlocks(z, w) {
            var that = this;

            var mode = TYPE; // current inflate_block mode

            var left = 0; // if STORED, bytes left to copy

            var table = 0; // table lengths (14 bits)
            var index = 0; // index into blens (or border)
            var blens; // bit lengths of codes
            var bb = [0]; // bit length tree depth
            var tb = [0]; // bit length decoding tree

            var codes = new InfCodes(); // if CODES, current state

            var last = 0; // true if this block is the last block

            var hufts = new Int32Array(MANY * 3); // single malloc for tree space
            var check = 0; // check on output
            var inftree = new InfTree();

            that.bitk = 0; // bits in bit buffer
            that.bitb = 0; // bit buffer
            that.window = new Uint8Array(w); // sliding window
            that.end = w; // one byte after sliding window
            that.read = 0; // window read pointer
            that.write = 0; // window write pointer

            that.reset = function (z, c) {
                if (c) {
                    c[0] = check;
                }
                // if (mode == BTREE || mode == DTREE) {
                // }
                if (mode == CODES) {
                    codes.free(z);
                }
                mode = TYPE;
                that.bitk = 0;
                that.bitb = 0;
                that.read = that.write = 0;
            };

            that.reset(z, null);

            // copy as much as possible from the sliding window to the output area
            that.inflate_flush = function (z, r) {
                var n;
                var p;
                var q;

                // local copies of source and destination pointers
                p = z.next_out_index;
                q = that.read;

                // compute number of bytes to copy as far as end of window
                n = /* (int) */ ((q <= that.write ? that.write : that.end) - q);
                if (n > z.avail_out) {
                    n = z.avail_out;
                }
                if (n !== 0 && r == Z_BUF_ERROR) {
                    r = Z_OK;
                }

                // update counters
                z.avail_out -= n;
                z.total_out += n;

                // copy as far as end of window
                z.next_out.set(that.window.subarray(q, q + n), p);
                p += n;
                q += n;

                // see if more to copy at beginning of window
                if (q == that.end) {
                    // wrap pointers
                    q = 0;
                    if (that.write == that.end) {
                        that.write = 0;
                    }

                    // compute bytes to copy
                    n = that.write - q;
                    if (n > z.avail_out) {
                        n = z.avail_out;
                    }
                    if (n !== 0 && r == Z_BUF_ERROR) {
                        r = Z_OK;
                    }

                    // update counters
                    z.avail_out -= n;
                    z.total_out += n;

                    // copy
                    z.next_out.set(that.window.subarray(q, q + n), p);
                    p += n;
                    q += n;
                }

                // update pointers
                z.next_out_index = p;
                that.read = q;

                // done
                return r;
            };

            that.proc = function (z, r) {
                var t; // temporary storage
                var b; // bit buffer
                var k; // bits in bit buffer
                var p; // input data pointer
                var n; // bytes available there
                var q; // output window write pointer
                var m; // bytes to end of window or read pointer

                var i;

                // copy input/output information to locals (UPDATE macro restores)
                // {
                p = z.next_in_index;
                n = z.avail_in;
                b = that.bitb;
                k = that.bitk;
                // }
                // {
                q = that.write;
                m = /* (int) */ (q < that.read ? that.read - q - 1 : that.end - q);
                // }

                // process input based on current state
                // DEBUG dtree
                while (true) {
                    switch (mode) {
                    case TYPE:

                        while (k < (3)) {
                            if (n !== 0) {
                                r = Z_OK;
                            } else {
                                that.bitb = b;
                                that.bitk = k;
                                z.avail_in = n;
                                z.total_in += p - z.next_in_index;
                                z.next_in_index = p;
                                that.write = q;
                                return that.inflate_flush(z, r);
                            }
                            n--;
                            b |= (z.read_byte(p++) & 0xff) << k;
                            k += 8;
                        }
                        t = /* (int) */ (b & 7);
                        last = t & 1;

                        switch (t >>> 1) {
                        case 0: // stored
                            // {
                            b >>>= (3);
                            k -= (3);
                            // }
                            t = k & 7; // go to byte boundary

                            // {
                            b >>>= (t);
                            k -= (t);
                            // }
                            mode = LENS; // get length of stored block
                            break;
                        case 1: // fixed
                            // {
                            var bl = []; // new Array(1);
                            var bd = []; // new Array(1);
                            var tl = [
                                []
                            ]; // new Array(1);
                            var td = [
                                []
                            ]; // new Array(1);

                            InfTree.inflate_trees_fixed(bl, bd, tl, td, z);
                            codes.init(bl[0], bd[0], tl[0], 0, td[0], 0, z);
                            // }

                            // {
                            b >>>= (3);
                            k -= (3);
                            // }

                            mode = CODES;
                            break;
                        case 2: // dynamic

                            // {
                            b >>>= (3);
                            k -= (3);
                            // }

                            mode = TABLE;
                            break;
                        case 3: // illegal

                            // {
                            b >>>= (3);
                            k -= (3);
                            // }
                            mode = BADBLOCKS;
                            z.msg = "invalid block type";
                            r = Z_DATA_ERROR;

                            that.bitb = b;
                            that.bitk = k;
                            z.avail_in = n;
                            z.total_in += p - z.next_in_index;
                            z.next_in_index = p;
                            that.write = q;
                            return that.inflate_flush(z, r);
                        }
                        break;
                    case LENS:

                        while (k < (32)) {
                            if (n !== 0) {
                                r = Z_OK;
                            } else {
                                that.bitb = b;
                                that.bitk = k;
                                z.avail_in = n;
                                z.total_in += p - z.next_in_index;
                                z.next_in_index = p;
                                that.write = q;
                                return that.inflate_flush(z, r);
                            }
                            n--;
                            b |= (z.read_byte(p++) & 0xff) << k;
                            k += 8;
                        }

                        if ((((~b) >>> 16) & 0xffff) != (b & 0xffff)) {
                            mode = BADBLOCKS;
                            z.msg = "invalid stored block lengths";
                            r = Z_DATA_ERROR;

                            that.bitb = b;
                            that.bitk = k;
                            z.avail_in = n;
                            z.total_in += p - z.next_in_index;
                            z.next_in_index = p;
                            that.write = q;
                            return that.inflate_flush(z, r);
                        }
                        left = (b & 0xffff);
                        b = k = 0; // dump bits
                        mode = left !== 0 ? STORED : (last !== 0 ? DRY : TYPE);
                        break;
                    case STORED:
                        if (n === 0) {
                            that.bitb = b;
                            that.bitk = k;
                            z.avail_in = n;
                            z.total_in += p - z.next_in_index;
                            z.next_in_index = p;
                            that.write = q;
                            return that.inflate_flush(z, r);
                        }

                        if (m === 0) {
                            if (q == that.end && that.read !== 0) {
                                q = 0;
                                m = /* (int) */ (q < that.read ? that.read - q - 1 : that.end - q);
                            }
                            if (m === 0) {
                                that.write = q;
                                r = that.inflate_flush(z, r);
                                q = that.write;
                                m = /* (int) */ (q < that.read ? that.read - q - 1 : that.end - q);
                                if (q == that.end && that.read !== 0) {
                                    q = 0;
                                    m = /* (int) */ (q < that.read ? that.read - q - 1 : that.end - q);
                                }
                                if (m === 0) {
                                    that.bitb = b;
                                    that.bitk = k;
                                    z.avail_in = n;
                                    z.total_in += p - z.next_in_index;
                                    z.next_in_index = p;
                                    that.write = q;
                                    return that.inflate_flush(z, r);
                                }
                            }
                        }
                        r = Z_OK;

                        t = left;
                        if (t > n) {
                            t = n;
                        }
                        if (t > m) {
                            t = m;
                        }
                        that.window.set(z.read_buf(p, t), q);
                        p += t;
                        n -= t;
                        q += t;
                        m -= t;
                        if ((left -= t) !== 0) {
                            break;
                        }
                        mode = last !== 0 ? DRY : TYPE;
                        break;
                    case TABLE:

                        while (k < (14)) {
                            if (n !== 0) {
                                r = Z_OK;
                            } else {
                                that.bitb = b;
                                that.bitk = k;
                                z.avail_in = n;
                                z.total_in += p - z.next_in_index;
                                z.next_in_index = p;
                                that.write = q;
                                return that.inflate_flush(z, r);
                            }

                            n--;
                            b |= (z.read_byte(p++) & 0xff) << k;
                            k += 8;
                        }

                        table = t = (b & 0x3fff);
                        if ((t & 0x1f) > 29 || ((t >> 5) & 0x1f) > 29) {
                            mode = BADBLOCKS;
                            z.msg = "too many length or distance symbols";
                            r = Z_DATA_ERROR;

                            that.bitb = b;
                            that.bitk = k;
                            z.avail_in = n;
                            z.total_in += p - z.next_in_index;
                            z.next_in_index = p;
                            that.write = q;
                            return that.inflate_flush(z, r);
                        }
                        t = 258 + (t & 0x1f) + ((t >> 5) & 0x1f);
                        if (!blens || blens.length < t) {
                            blens = []; // new Array(t);
                        } else {
                            for (i = 0; i < t; i++) {
                                blens[i] = 0;
                            }
                        }

                        // {
                        b >>>= (14);
                        k -= (14);
                        // }

                        index = 0;
                        mode = BTREE;
                    case BTREE:
                        while (index < 4 + (table >>> 10)) {
                            while (k < (3)) {
                                if (n !== 0) {
                                    r = Z_OK;
                                } else {
                                    that.bitb = b;
                                    that.bitk = k;
                                    z.avail_in = n;
                                    z.total_in += p - z.next_in_index;
                                    z.next_in_index = p;
                                    that.write = q;
                                    return that.inflate_flush(z, r);
                                }
                                n--;
                                b |= (z.read_byte(p++) & 0xff) << k;
                                k += 8;
                            }

                            blens[border[index++]] = b & 7;

                            // {
                            b >>>= (3);
                            k -= (3);
                            // }
                        }

                        while (index < 19) {
                            blens[border[index++]] = 0;
                        }

                        bb[0] = 7;
                        t = inftree.inflate_trees_bits(blens, bb, tb, hufts, z);
                        if (t != Z_OK) {
                            r = t;
                            if (r == Z_DATA_ERROR) {
                                blens = null;
                                mode = BADBLOCKS;
                            }

                            that.bitb = b;
                            that.bitk = k;
                            z.avail_in = n;
                            z.total_in += p - z.next_in_index;
                            z.next_in_index = p;
                            that.write = q;
                            return that.inflate_flush(z, r);
                        }

                        index = 0;
                        mode = DTREE;
                    case DTREE:
                        while (true) {
                            t = table;
                            if (!(index < 258 + (t & 0x1f) + ((t >> 5) & 0x1f))) {
                                break;
                            }

                            var h;
                            var j, c;

                            t = bb[0];

                            while (k < (t)) {
                                if (n !== 0) {
                                    r = Z_OK;
                                } else {
                                    that.bitb = b;
                                    that.bitk = k;
                                    z.avail_in = n;
                                    z.total_in += p - z.next_in_index;
                                    z.next_in_index = p;
                                    that.write = q;
                                    return that.inflate_flush(z, r);
                                }
                                n--;
                                b |= (z.read_byte(p++) & 0xff) << k;
                                k += 8;
                            }

                            // if (tb[0] == -1) {
                            // System.err.println("null...");
                            // }

                            t = hufts[(tb[0] + (b & inflate_mask[t])) * 3 + 1];
                            c = hufts[(tb[0] + (b & inflate_mask[t])) * 3 + 2];

                            if (c < 16) {
                                b >>>= (t);
                                k -= (t);
                                blens[index++] = c;
                            } else { // c == 16..18
                                i = c == 18 ? 7 : c - 14;
                                j = c == 18 ? 11 : 3;

                                while (k < (t + i)) {
                                    if (n !== 0) {
                                        r = Z_OK;
                                    } else {
                                        that.bitb = b;
                                        that.bitk = k;
                                        z.avail_in = n;
                                        z.total_in += p - z.next_in_index;
                                        z.next_in_index = p;
                                        that.write = q;
                                        return that.inflate_flush(z, r);
                                    }
                                    n--;
                                    b |= (z.read_byte(p++) & 0xff) << k;
                                    k += 8;
                                }

                                b >>>= (t);
                                k -= (t);

                                j += (b & inflate_mask[i]);

                                b >>>= (i);
                                k -= (i);

                                i = index;
                                t = table;
                                if (i + j > 258 + (t & 0x1f) + ((t >> 5) & 0x1f) || (c == 16 && i < 1)) {
                                    blens = null;
                                    mode = BADBLOCKS;
                                    z.msg = "invalid bit length repeat";
                                    r = Z_DATA_ERROR;

                                    that.bitb = b;
                                    that.bitk = k;
                                    z.avail_in = n;
                                    z.total_in += p - z.next_in_index;
                                    z.next_in_index = p;
                                    that.write = q;
                                    return that.inflate_flush(z, r);
                                }

                                c = c == 16 ? blens[i - 1] : 0;
                                do {
                                    blens[i++] = c;
                                } while (--j !== 0);
                                index = i;
                            }
                        }

                        tb[0] = -1;
                        // {
                        var bl_ = []; // new Array(1);
                        var bd_ = []; // new Array(1);
                        var tl_ = []; // new Array(1);
                        var td_ = []; // new Array(1);
                        bl_[0] = 9; // must be <= 9 for lookahead assumptions
                        bd_[0] = 6; // must be <= 9 for lookahead assumptions

                        t = table;
                        t = inftree.inflate_trees_dynamic(257 + (t & 0x1f), 1 + ((t >> 5) & 0x1f), blens, bl_, bd_, tl_, td_, hufts, z);

                        if (t != Z_OK) {
                            if (t == Z_DATA_ERROR) {
                                blens = null;
                                mode = BADBLOCKS;
                            }
                            r = t;

                            that.bitb = b;
                            that.bitk = k;
                            z.avail_in = n;
                            z.total_in += p - z.next_in_index;
                            z.next_in_index = p;
                            that.write = q;
                            return that.inflate_flush(z, r);
                        }
                        codes.init(bl_[0], bd_[0], hufts, tl_[0], hufts, td_[0], z);
                        // }
                        mode = CODES;
                    case CODES:
                        that.bitb = b;
                        that.bitk = k;
                        z.avail_in = n;
                        z.total_in += p - z.next_in_index;
                        z.next_in_index = p;
                        that.write = q;

                        if ((r = codes.proc(that, z, r)) != Z_STREAM_END) {
                            return that.inflate_flush(z, r);
                        }
                        r = Z_OK;
                        codes.free(z);

                        p = z.next_in_index;
                        n = z.avail_in;
                        b = that.bitb;
                        k = that.bitk;
                        q = that.write;
                        m = /* (int) */ (q < that.read ? that.read - q - 1 : that.end - q);

                        if (last === 0) {
                            mode = TYPE;
                            break;
                        }
                        mode = DRY;
                    case DRY:
                        that.write = q;
                        r = that.inflate_flush(z, r);
                        q = that.write;
                        m = /* (int) */ (q < that.read ? that.read - q - 1 : that.end - q);
                        if (that.read != that.write) {
                            that.bitb = b;
                            that.bitk = k;
                            z.avail_in = n;
                            z.total_in += p - z.next_in_index;
                            z.next_in_index = p;
                            that.write = q;
                            return that.inflate_flush(z, r);
                        }
                        mode = DONELOCKS;
                    case DONELOCKS:
                        r = Z_STREAM_END;

                        that.bitb = b;
                        that.bitk = k;
                        z.avail_in = n;
                        z.total_in += p - z.next_in_index;
                        z.next_in_index = p;
                        that.write = q;
                        return that.inflate_flush(z, r);
                    case BADBLOCKS:
                        r = Z_DATA_ERROR;

                        that.bitb = b;
                        that.bitk = k;
                        z.avail_in = n;
                        z.total_in += p - z.next_in_index;
                        z.next_in_index = p;
                        that.write = q;
                        return that.inflate_flush(z, r);

                    default:
                        r = Z_STREAM_ERROR;

                        that.bitb = b;
                        that.bitk = k;
                        z.avail_in = n;
                        z.total_in += p - z.next_in_index;
                        z.next_in_index = p;
                        that.write = q;
                        return that.inflate_flush(z, r);
                    }
                }
            };

            that.free = function (z) {
                that.reset(z, null);
                that.window = null;
                hufts = null;
                // ZFREE(z, s);
            };

            that.set_dictionary = function (d, start, n) {
                that.window.set(d.subarray(start, start + n), 0);
                that.read = that.write = n;
            };

            // Returns true if inflate is currently at the end of a block generated
            // by Z_SYNC_FLUSH or Z_FULL_FLUSH.
            that.sync_point = function () {
                return mode == LENS ? 1 : 0;
            };

        }

        // Inflate

        // preset dictionary flag in zlib header
        var PRESET_DICT = 0x20;

        var Z_DEFLATED = 8;

        var METHOD = 0; // waiting for method byte
        var FLAG = 1; // waiting for flag byte
        var DICT4 = 2; // four dictionary check bytes to go
        var DICT3 = 3; // three dictionary check bytes to go
        var DICT2 = 4; // two dictionary check bytes to go
        var DICT1 = 5; // one dictionary check byte to go
        var DICT0 = 6; // waiting for inflateSetDictionary
        var BLOCKS = 7; // decompressing blocks
        var DONE = 12; // finished check, done
        var BAD = 13; // got an error--stay here

        var mark = [0, 0, 0xff, 0xff];

        function Inflate() {
            var that = this;

            that.mode = 0; // current inflate mode

            // mode dependent information
            that.method = 0; // if FLAGS, method byte

            // if CHECK, check values to compare
            that.was = [0]; // new Array(1); // computed check value
            that.need = 0; // stream check value

            // if BAD, inflateSync's marker bytes count
            that.marker = 0;

            // mode independent information
            that.wbits = 0; // log2(window size) (8..15, defaults to 15)

            // this.blocks; // current inflate_blocks state

            function inflateReset(z) {
                if (!z || !z.istate) {
                    return Z_STREAM_ERROR;
                }

                z.total_in = z.total_out = 0;
                z.msg = null;
                z.istate.mode = BLOCKS;
                z.istate.blocks.reset(z, null);
                return Z_OK;
            }

            that.inflateEnd = function (z) {
                if (that.blocks) {
                    that.blocks.free(z);
                }
                that.blocks = null;
                // ZFREE(z, z->state);
                return Z_OK;
            };

            that.inflateInit = function (z, w) {
                z.msg = null;
                that.blocks = null;

                // set window size
                if (w < 8 || w > 15) {
                    that.inflateEnd(z);
                    return Z_STREAM_ERROR;
                }
                that.wbits = w;

                z.istate.blocks = new InfBlocks(z, 1 << w);

                // reset state
                inflateReset(z);
                return Z_OK;
            };

            that.inflate = function (z, f) {
                var r;
                var b;

                if (!z || !z.istate || !z.next_in) {
                    return Z_STREAM_ERROR;
                }
                f = f == Z_FINISH ? Z_BUF_ERROR : Z_OK;
                r = Z_BUF_ERROR;
                while (true) {
                    // System.out.println("mode: "+z.istate.mode);
                    switch (z.istate.mode) {
                    case METHOD:

                        if (z.avail_in === 0) {
                            return r;
                        }
                        r = f;

                        z.avail_in--;
                        z.total_in++;
                        if (((z.istate.method = z.read_byte(z.next_in_index++)) & 0xf) != Z_DEFLATED) {
                            z.istate.mode = BAD;
                            z.msg = "unknown compression method";
                            z.istate.marker = 5; // can't try inflateSync
                            break;
                        }
                        if ((z.istate.method >> 4) + 8 > z.istate.wbits) {
                            z.istate.mode = BAD;
                            z.msg = "invalid window size";
                            z.istate.marker = 5; // can't try inflateSync
                            break;
                        }
                        z.istate.mode = FLAG;
                    case FLAG:

                        if (z.avail_in === 0) {
                            return r;
                        }
                        r = f;

                        z.avail_in--;
                        z.total_in++;
                        b = (z.read_byte(z.next_in_index++)) & 0xff;

                        if ((((z.istate.method << 8) + b) % 31) !== 0) {
                            z.istate.mode = BAD;
                            z.msg = "incorrect header check";
                            z.istate.marker = 5; // can't try inflateSync
                            break;
                        }

                        if ((b & PRESET_DICT) === 0) {
                            z.istate.mode = BLOCKS;
                            break;
                        }
                        z.istate.mode = DICT4;
                    case DICT4:

                        if (z.avail_in === 0) {
                            return r;
                        }
                        r = f;

                        z.avail_in--;
                        z.total_in++;
                        z.istate.need = ((z.read_byte(z.next_in_index++) & 0xff) << 24) & 0xff000000;
                        z.istate.mode = DICT3;
                    case DICT3:

                        if (z.avail_in === 0) {
                            return r;
                        }
                        r = f;

                        z.avail_in--;
                        z.total_in++;
                        z.istate.need += ((z.read_byte(z.next_in_index++) & 0xff) << 16) & 0xff0000;
                        z.istate.mode = DICT2;
                    case DICT2:

                        if (z.avail_in === 0) {
                            return r;
                        }
                        r = f;

                        z.avail_in--;
                        z.total_in++;
                        z.istate.need += ((z.read_byte(z.next_in_index++) & 0xff) << 8) & 0xff00;
                        z.istate.mode = DICT1;
                    case DICT1:

                        if (z.avail_in === 0) {
                            return r;
                        }
                        r = f;

                        z.avail_in--;
                        z.total_in++;
                        z.istate.need += (z.read_byte(z.next_in_index++) & 0xff);
                        z.istate.mode = DICT0;
                        return Z_NEED_DICT;
                    case DICT0:
                        z.istate.mode = BAD;
                        z.msg = "need dictionary";
                        z.istate.marker = 0; // can try inflateSync
                        return Z_STREAM_ERROR;
                    case BLOCKS:

                        r = z.istate.blocks.proc(z, r);
                        if (r == Z_DATA_ERROR) {
                            z.istate.mode = BAD;
                            z.istate.marker = 0; // can try inflateSync
                            break;
                        }
                        if (r == Z_OK) {
                            r = f;
                        }
                        if (r != Z_STREAM_END) {
                            return r;
                        }
                        r = f;
                        z.istate.blocks.reset(z, z.istate.was);
                        z.istate.mode = DONE;
                    case DONE:
                        return Z_STREAM_END;
                    case BAD:
                        return Z_DATA_ERROR;
                    default:
                        return Z_STREAM_ERROR;
                    }
                }
            };

            that.inflateSetDictionary = function (z, dictionary, dictLength) {
                var index = 0;
                var length = dictLength;
                if (!z || !z.istate || z.istate.mode != DICT0) {
                    return Z_STREAM_ERROR;
                }

                if (length >= (1 << z.istate.wbits)) {
                    length = (1 << z.istate.wbits) - 1;
                    index = dictLength - length;
                }
                z.istate.blocks.set_dictionary(dictionary, index, length);
                z.istate.mode = BLOCKS;
                return Z_OK;
            };

            that.inflateSync = function (z) {
                var n; // number of bytes to look at
                var p; // pointer to bytes
                var m; // number of marker bytes found in a row
                var r, w; // temporaries to save total_in and total_out

                // set up
                if (!z || !z.istate) {
                    return Z_STREAM_ERROR;
                }
                if (z.istate.mode != BAD) {
                    z.istate.mode = BAD;
                    z.istate.marker = 0;
                }
                if ((n = z.avail_in) === 0) {
                    return Z_BUF_ERROR;
                }
                p = z.next_in_index;
                m = z.istate.marker;

                // search
                while (n !== 0 && m < 4) {
                    if (z.read_byte(p) == mark[m]) {
                        m++;
                    } else if (z.read_byte(p) !== 0) {
                        m = 0;
                    } else {
                        m = 4 - m;
                    }
                    p++;
                    n--;
                }

                // restore
                z.total_in += p - z.next_in_index;
                z.next_in_index = p;
                z.avail_in = n;
                z.istate.marker = m;

                // return no joy or set up to restart on a new block
                if (m != 4) {
                    return Z_DATA_ERROR;
                }
                r = z.total_in;
                w = z.total_out;
                inflateReset(z);
                z.total_in = r;
                z.total_out = w;
                z.istate.mode = BLOCKS;
                return Z_OK;
            };

            // Returns true if inflate is currently at the end of a block generated
            // by Z_SYNC_FLUSH or Z_FULL_FLUSH. This function is used by one PPP
            // implementation to provide an additional safety check. PPP uses
            // Z_SYNC_FLUSH
            // but removes the length bytes of the resulting empty stored block. When
            // decompressing, PPP checks that at the end of input packet, inflate is
            // waiting for these length bytes.
            that.inflateSyncPoint = function (z) {
                if (!z || !z.istate || !z.istate.blocks) {
                    return Z_STREAM_ERROR;
                }
                return z.istate.blocks.sync_point();
            };
        }

        // ZStream

        function ZStream() {}

        ZStream.prototype = {
            inflateInit: function (bits) {
                var that = this;
                that.istate = new Inflate();
                if (!bits) {
                    bits = MAX_BITS;
                }
                return that.istate.inflateInit(that, bits);
            },

            inflate: function (f) {
                var that = this;
                if (!that.istate) {
                    return Z_STREAM_ERROR;
                }
                return that.istate.inflate(that, f);
            },

            inflateEnd: function () {
                var that = this;
                if (!that.istate) {
                    return Z_STREAM_ERROR;
                }
                var ret = that.istate.inflateEnd(that);
                that.istate = null;
                return ret;
            },

            inflateSync: function () {
                var that = this;
                if (!that.istate) {
                    return Z_STREAM_ERROR;
                }
                return that.istate.inflateSync(that);
            },
            inflateSetDictionary: function (dictionary, dictLength) {
                var that = this;
                if (!that.istate) {
                    return Z_STREAM_ERROR;
                }
                return that.istate.inflateSetDictionary(that, dictionary, dictLength);
            },
            read_byte: function (start) {
                var that = this;
                return that.next_in.subarray(start, start + 1)[0];
            },
            read_buf: function (start, size) {
                var that = this;
                return that.next_in.subarray(start, start + size);
            }
        };

        // Inflater

        function Inflater() {
            var that = this;
            var z = new ZStream();
            var bufsize = 512;
            var flush = Z_NO_FLUSH;
            var buf = new Uint8Array(bufsize);
            var nomoreinput = false;

            z.inflateInit();
            z.next_out = buf;

            that.append = function (data, onprogress) {
                var err, buffers = [],
                    lastIndex = 0,
                    bufferIndex = 0,
                    bufferSize = 0,
                    array;
                if (data.length === 0) {
                    return;
                }
                z.next_in_index = 0;
                z.next_in = data;
                z.avail_in = data.length;
                do {
                    z.next_out_index = 0;
                    z.avail_out = bufsize;
                    if ((z.avail_in === 0) && (!nomoreinput)) { // if buffer is empty and more input is available, refill it
                        z.next_in_index = 0;
                        nomoreinput = true;
                    }
                    err = z.inflate(flush);
                    if (nomoreinput && (err == Z_BUF_ERROR)) {
                        return -1;
                    }
                    if (err != Z_OK && err != Z_STREAM_END) {
                        throw "inflating: " + z.msg;
                    }
                    if ((nomoreinput || err == Z_STREAM_END) && (z.avail_out == data.length)) {
                        return -1;
                    }
                    if (z.next_out_index) {
                        if (z.next_out_index == bufsize) {
                            buffers.push(new Uint8Array(buf));
                        } else {
                            buffers.push(new Uint8Array(buf.subarray(0, z.next_out_index)));
                        }
                    }
                    bufferSize += z.next_out_index;
                    if (onprogress && z.next_in_index > 0 && z.next_in_index != lastIndex) {
                        onprogress(z.next_in_index);
                        lastIndex = z.next_in_index;
                    }
                } while (z.avail_in > 0 || z.avail_out === 0);
                array = new Uint8Array(bufferSize);
                buffers.forEach(function (chunk) {
                    array.set(chunk, bufferIndex);
                    bufferIndex += chunk.length;
                });
                return array;
            };
            that.flush = function () {
                z.inflateEnd();
            };
        }

        namespace.zip.Inflater = Inflater;

        /*
    Copyright (c) 2012 Gildas Lormeau. All rights reserved.

    Redistribution and use in source and binary forms, with or without
    modification, are permitted provided that the following conditions are met:

    1. Redistributions of source code must retain the above copyright notice,
    this list of conditions and the following disclaimer.

    2. Redistributions in binary form must reproduce the above copyright
    notice, this list of conditions and the following disclaimer in
    the documentation and/or other materials provided with the distribution.

    3. The names of the authors may not be used to endorse or promote products
    derived from this software without specific prior written permission.

    THIS SOFTWARE IS PROVIDED ``AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
    INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
    FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
    INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
    INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
    LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
    OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
    LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
    NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
    EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
    */

        /*
         * This program is based on JZlib 1.0.2 ymnk, JCraft,Inc.
         * JZlib is based on zlib-1.1.3, so all credit should go authors
         * Jean-loup Gailly(jloup@gzip.org) and Mark Adler(madler@alumni.caltech.edu)
         * and contributors of zlib.
         */

        // Global
        var MAX_BITS = 15;

        var Z_OK = 0;
        var Z_STREAM_END = 1;
        var Z_NEED_DICT = 2;
        var Z_STREAM_ERROR = -2;
        var Z_DATA_ERROR = -3;
        var Z_MEM_ERROR = -4;
        var Z_BUF_ERROR = -5;

        var inflate_mask = [0x00000000, 0x00000001, 0x00000003, 0x00000007, 0x0000000f, 0x0000001f, 0x0000003f, 0x0000007f, 0x000000ff, 0x000001ff, 0x000003ff,
            0x000007ff, 0x00000fff, 0x00001fff, 0x00003fff, 0x00007fff, 0x0000ffff
        ];

        var MANY = 1440;

        // JZlib version : "1.0.2"
        var Z_NO_FLUSH = 0;
        var Z_FINISH = 4;

        // InfTree
        var fixed_bl = 9;
        var fixed_bd = 5;

        var fixed_tl = [96, 7, 256, 0, 8, 80, 0, 8, 16, 84, 8, 115, 82, 7, 31, 0, 8, 112, 0, 8, 48, 0, 9, 192, 80, 7, 10, 0, 8, 96, 0, 8, 32, 0, 9, 160, 0, 8, 0,
            0, 8, 128, 0, 8, 64, 0, 9, 224, 80, 7, 6, 0, 8, 88, 0, 8, 24, 0, 9, 144, 83, 7, 59, 0, 8, 120, 0, 8, 56, 0, 9, 208, 81, 7, 17, 0, 8, 104, 0, 8, 40,
            0, 9, 176, 0, 8, 8, 0, 8, 136, 0, 8, 72, 0, 9, 240, 80, 7, 4, 0, 8, 84, 0, 8, 20, 85, 8, 227, 83, 7, 43, 0, 8, 116, 0, 8, 52, 0, 9, 200, 81, 7, 13,
            0, 8, 100, 0, 8, 36, 0, 9, 168, 0, 8, 4, 0, 8, 132, 0, 8, 68, 0, 9, 232, 80, 7, 8, 0, 8, 92, 0, 8, 28, 0, 9, 152, 84, 7, 83, 0, 8, 124, 0, 8, 60,
            0, 9, 216, 82, 7, 23, 0, 8, 108, 0, 8, 44, 0, 9, 184, 0, 8, 12, 0, 8, 140, 0, 8, 76, 0, 9, 248, 80, 7, 3, 0, 8, 82, 0, 8, 18, 85, 8, 163, 83, 7,
            35, 0, 8, 114, 0, 8, 50, 0, 9, 196, 81, 7, 11, 0, 8, 98, 0, 8, 34, 0, 9, 164, 0, 8, 2, 0, 8, 130, 0, 8, 66, 0, 9, 228, 80, 7, 7, 0, 8, 90, 0, 8,
            26, 0, 9, 148, 84, 7, 67, 0, 8, 122, 0, 8, 58, 0, 9, 212, 82, 7, 19, 0, 8, 106, 0, 8, 42, 0, 9, 180, 0, 8, 10, 0, 8, 138, 0, 8, 74, 0, 9, 244, 80,
            7, 5, 0, 8, 86, 0, 8, 22, 192, 8, 0, 83, 7, 51, 0, 8, 118, 0, 8, 54, 0, 9, 204, 81, 7, 15, 0, 8, 102, 0, 8, 38, 0, 9, 172, 0, 8, 6, 0, 8, 134, 0,
            8, 70, 0, 9, 236, 80, 7, 9, 0, 8, 94, 0, 8, 30, 0, 9, 156, 84, 7, 99, 0, 8, 126, 0, 8, 62, 0, 9, 220, 82, 7, 27, 0, 8, 110, 0, 8, 46, 0, 9, 188, 0,
            8, 14, 0, 8, 142, 0, 8, 78, 0, 9, 252, 96, 7, 256, 0, 8, 81, 0, 8, 17, 85, 8, 131, 82, 7, 31, 0, 8, 113, 0, 8, 49, 0, 9, 194, 80, 7, 10, 0, 8, 97,
            0, 8, 33, 0, 9, 162, 0, 8, 1, 0, 8, 129, 0, 8, 65, 0, 9, 226, 80, 7, 6, 0, 8, 89, 0, 8, 25, 0, 9, 146, 83, 7, 59, 0, 8, 121, 0, 8, 57, 0, 9, 210,
            81, 7, 17, 0, 8, 105, 0, 8, 41, 0, 9, 178, 0, 8, 9, 0, 8, 137, 0, 8, 73, 0, 9, 242, 80, 7, 4, 0, 8, 85, 0, 8, 21, 80, 8, 258, 83, 7, 43, 0, 8, 117,
            0, 8, 53, 0, 9, 202, 81, 7, 13, 0, 8, 101, 0, 8, 37, 0, 9, 170, 0, 8, 5, 0, 8, 133, 0, 8, 69, 0, 9, 234, 80, 7, 8, 0, 8, 93, 0, 8, 29, 0, 9, 154,
            84, 7, 83, 0, 8, 125, 0, 8, 61, 0, 9, 218, 82, 7, 23, 0, 8, 109, 0, 8, 45, 0, 9, 186, 0, 8, 13, 0, 8, 141, 0, 8, 77, 0, 9, 250, 80, 7, 3, 0, 8, 83,
            0, 8, 19, 85, 8, 195, 83, 7, 35, 0, 8, 115, 0, 8, 51, 0, 9, 198, 81, 7, 11, 0, 8, 99, 0, 8, 35, 0, 9, 166, 0, 8, 3, 0, 8, 131, 0, 8, 67, 0, 9, 230,
            80, 7, 7, 0, 8, 91, 0, 8, 27, 0, 9, 150, 84, 7, 67, 0, 8, 123, 0, 8, 59, 0, 9, 214, 82, 7, 19, 0, 8, 107, 0, 8, 43, 0, 9, 182, 0, 8, 11, 0, 8, 139,
            0, 8, 75, 0, 9, 246, 80, 7, 5, 0, 8, 87, 0, 8, 23, 192, 8, 0, 83, 7, 51, 0, 8, 119, 0, 8, 55, 0, 9, 206, 81, 7, 15, 0, 8, 103, 0, 8, 39, 0, 9, 174,
            0, 8, 7, 0, 8, 135, 0, 8, 71, 0, 9, 238, 80, 7, 9, 0, 8, 95, 0, 8, 31, 0, 9, 158, 84, 7, 99, 0, 8, 127, 0, 8, 63, 0, 9, 222, 82, 7, 27, 0, 8, 111,
            0, 8, 47, 0, 9, 190, 0, 8, 15, 0, 8, 143, 0, 8, 79, 0, 9, 254, 96, 7, 256, 0, 8, 80, 0, 8, 16, 84, 8, 115, 82, 7, 31, 0, 8, 112, 0, 8, 48, 0, 9,
            193, 80, 7, 10, 0, 8, 96, 0, 8, 32, 0, 9, 161, 0, 8, 0, 0, 8, 128, 0, 8, 64, 0, 9, 225, 80, 7, 6, 0, 8, 88, 0, 8, 24, 0, 9, 145, 83, 7, 59, 0, 8,
            120, 0, 8, 56, 0, 9, 209, 81, 7, 17, 0, 8, 104, 0, 8, 40, 0, 9, 177, 0, 8, 8, 0, 8, 136, 0, 8, 72, 0, 9, 241, 80, 7, 4, 0, 8, 84, 0, 8, 20, 85, 8,
            227, 83, 7, 43, 0, 8, 116, 0, 8, 52, 0, 9, 201, 81, 7, 13, 0, 8, 100, 0, 8, 36, 0, 9, 169, 0, 8, 4, 0, 8, 132, 0, 8, 68, 0, 9, 233, 80, 7, 8, 0, 8,
            92, 0, 8, 28, 0, 9, 153, 84, 7, 83, 0, 8, 124, 0, 8, 60, 0, 9, 217, 82, 7, 23, 0, 8, 108, 0, 8, 44, 0, 9, 185, 0, 8, 12, 0, 8, 140, 0, 8, 76, 0, 9,
            249, 80, 7, 3, 0, 8, 82, 0, 8, 18, 85, 8, 163, 83, 7, 35, 0, 8, 114, 0, 8, 50, 0, 9, 197, 81, 7, 11, 0, 8, 98, 0, 8, 34, 0, 9, 165, 0, 8, 2, 0, 8,
            130, 0, 8, 66, 0, 9, 229, 80, 7, 7, 0, 8, 90, 0, 8, 26, 0, 9, 149, 84, 7, 67, 0, 8, 122, 0, 8, 58, 0, 9, 213, 82, 7, 19, 0, 8, 106, 0, 8, 42, 0, 9,
            181, 0, 8, 10, 0, 8, 138, 0, 8, 74, 0, 9, 245, 80, 7, 5, 0, 8, 86, 0, 8, 22, 192, 8, 0, 83, 7, 51, 0, 8, 118, 0, 8, 54, 0, 9, 205, 81, 7, 15, 0, 8,
            102, 0, 8, 38, 0, 9, 173, 0, 8, 6, 0, 8, 134, 0, 8, 70, 0, 9, 237, 80, 7, 9, 0, 8, 94, 0, 8, 30, 0, 9, 157, 84, 7, 99, 0, 8, 126, 0, 8, 62, 0, 9,
            221, 82, 7, 27, 0, 8, 110, 0, 8, 46, 0, 9, 189, 0, 8, 14, 0, 8, 142, 0, 8, 78, 0, 9, 253, 96, 7, 256, 0, 8, 81, 0, 8, 17, 85, 8, 131, 82, 7, 31, 0,
            8, 113, 0, 8, 49, 0, 9, 195, 80, 7, 10, 0, 8, 97, 0, 8, 33, 0, 9, 163, 0, 8, 1, 0, 8, 129, 0, 8, 65, 0, 9, 227, 80, 7, 6, 0, 8, 89, 0, 8, 25, 0, 9,
            147, 83, 7, 59, 0, 8, 121, 0, 8, 57, 0, 9, 211, 81, 7, 17, 0, 8, 105, 0, 8, 41, 0, 9, 179, 0, 8, 9, 0, 8, 137, 0, 8, 73, 0, 9, 243, 80, 7, 4, 0, 8,
            85, 0, 8, 21, 80, 8, 258, 83, 7, 43, 0, 8, 117, 0, 8, 53, 0, 9, 203, 81, 7, 13, 0, 8, 101, 0, 8, 37, 0, 9, 171, 0, 8, 5, 0, 8, 133, 0, 8, 69, 0, 9,
            235, 80, 7, 8, 0, 8, 93, 0, 8, 29, 0, 9, 155, 84, 7, 83, 0, 8, 125, 0, 8, 61, 0, 9, 219, 82, 7, 23, 0, 8, 109, 0, 8, 45, 0, 9, 187, 0, 8, 13, 0, 8,
            141, 0, 8, 77, 0, 9, 251, 80, 7, 3, 0, 8, 83, 0, 8, 19, 85, 8, 195, 83, 7, 35, 0, 8, 115, 0, 8, 51, 0, 9, 199, 81, 7, 11, 0, 8, 99, 0, 8, 35, 0, 9,
            167, 0, 8, 3, 0, 8, 131, 0, 8, 67, 0, 9, 231, 80, 7, 7, 0, 8, 91, 0, 8, 27, 0, 9, 151, 84, 7, 67, 0, 8, 123, 0, 8, 59, 0, 9, 215, 82, 7, 19, 0, 8,
            107, 0, 8, 43, 0, 9, 183, 0, 8, 11, 0, 8, 139, 0, 8, 75, 0, 9, 247, 80, 7, 5, 0, 8, 87, 0, 8, 23, 192, 8, 0, 83, 7, 51, 0, 8, 119, 0, 8, 55, 0, 9,
            207, 81, 7, 15, 0, 8, 103, 0, 8, 39, 0, 9, 175, 0, 8, 7, 0, 8, 135, 0, 8, 71, 0, 9, 239, 80, 7, 9, 0, 8, 95, 0, 8, 31, 0, 9, 159, 84, 7, 99, 0, 8,
            127, 0, 8, 63, 0, 9, 223, 82, 7, 27, 0, 8, 111, 0, 8, 47, 0, 9, 191, 0, 8, 15, 0, 8, 143, 0, 8, 79, 0, 9, 255
        ];
        var fixed_td = [80, 5, 1, 87, 5, 257, 83, 5, 17, 91, 5, 4097, 81, 5, 5, 89, 5, 1025, 85, 5, 65, 93, 5, 16385, 80, 5, 3, 88, 5, 513, 84, 5, 33, 92, 5,
            8193, 82, 5, 9, 90, 5, 2049, 86, 5, 129, 192, 5, 24577, 80, 5, 2, 87, 5, 385, 83, 5, 25, 91, 5, 6145, 81, 5, 7, 89, 5, 1537, 85, 5, 97, 93, 5,
            24577, 80, 5, 4, 88, 5, 769, 84, 5, 49, 92, 5, 12289, 82, 5, 13, 90, 5, 3073, 86, 5, 193, 192, 5, 24577
        ];

        // Tables for deflate from PKZIP's appnote.txt.
        var cplens = [ // Copy lengths for literal codes 257..285
            3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0
        ];

        // see note #13 above about 258
        var cplext = [ // Extra bits for literal codes 257..285
            0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 112, 112 // 112==invalid
        ];

        var cpdist = [ // Copy offsets for distance codes 0..29
            1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577
        ];

        var cpdext = [ // Extra bits for distance codes
            0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13
        ];

        // If BMAX needs to be larger than 16, then h and x[] should be uLong.
        var BMAX = 15; // maximum bit length of any code

        function InfTree() {
            var that = this;

            var hn; // hufts used in space
            var v; // work area for huft_build
            var c; // bit length count table
            var r; // table entry for structure assignment
            var u; // table stack
            var x; // bit offsets, then code stack

            function huft_build(b, // code lengths in bits (all assumed <=
                // BMAX)
                bindex, n, // number of codes (assumed <= 288)
                s, // number of simple-valued codes (0..s-1)
                d, // list of base values for non-simple codes
                e, // list of extra bits for non-simple codes
                t, // result: starting table
                m, // maximum lookup bits, returns actual
                hp, // space for trees
                hn, // hufts used in space
                v // working area: values in order of bit length
            ) {
                // Given a list of code lengths and a maximum table size, make a set of
                // tables to decode that set of codes. Return Z_OK on success,
                // Z_BUF_ERROR
                // if the given code set is incomplete (the tables are still built in
                // this
                // case), Z_DATA_ERROR if the input is invalid (an over-subscribed set
                // of
                // lengths), or Z_MEM_ERROR if not enough memory.

                var a; // counter for codes of length k
                var f; // i repeats in table every f entries
                var g; // maximum code length
                var h; // table level
                var i; // counter, current code
                var j; // counter
                var k; // number of bits in current code
                var l; // bits per table (returned in m)
                var mask; // (1 << w) - 1, to avoid cc -O bug on HP
                var p; // pointer into c[], b[], or v[]
                var q; // points to current table
                var w; // bits before this table == (l * h)
                var xp; // pointer into x
                var y; // number of dummy codes added
                var z; // number of entries in current table

                // Generate counts for each bit length

                p = 0;
                i = n;
                do {
                    c[b[bindex + p]]++;
                    p++;
                    i--; // assume all entries <= BMAX
                } while (i !== 0);

                if (c[0] == n) { // null input--all zero length codes
                    t[0] = -1;
                    m[0] = 0;
                    return Z_OK;
                }

                // Find minimum and maximum length, bound *m by those
                l = m[0];
                for (j = 1; j <= BMAX; j++) {
                    if (c[j] !== 0) {
                        break;
                    }
                }
                k = j; // minimum code length
                if (l < j) {
                    l = j;
                }
                for (i = BMAX; i !== 0; i--) {
                    if (c[i] !== 0) {
                        break;
                    }
                }
                g = i; // maximum code length
                if (l > i) {
                    l = i;
                }
                m[0] = l;

                // Adjust last length count to fill out codes, if needed
                for (y = 1 << j; j < i; j++, y <<= 1) {
                    if ((y -= c[j]) < 0) {
                        return Z_DATA_ERROR;
                    }
                }
                if ((y -= c[i]) < 0) {
                    return Z_DATA_ERROR;
                }
                c[i] += y;

                // Generate starting offsets into the value table for each length
                x[1] = j = 0;
                p = 1;
                xp = 2;
                while (--i !== 0) { // note that i == g from above
                    x[xp] = (j += c[p]);
                    xp++;
                    p++;
                }

                // Make a table of values in order of bit lengths
                i = 0;
                p = 0;
                do {
                    if ((j = b[bindex + p]) !== 0) {
                        v[x[j]++] = i;
                    }
                    p++;
                } while (++i < n);
                n = x[g]; // set n to length of v

                // Generate the Huffman codes and for each, make the table entries
                x[0] = i = 0; // first Huffman code is zero
                p = 0; // grab values in bit order
                h = -1; // no tables yet--level -1
                w = -l; // bits decoded == (l * h)
                u[0] = 0; // just to keep compilers happy
                q = 0; // ditto
                z = 0; // ditto

                // go through the bit lengths (k already is bits in shortest code)
                for (k; k <= g; k++) {
                    a = c[k];
                    while (a-- !== 0) {
                        // here i is the Huffman code of length k bits for value *p
                        // make tables up to required level
                        while (k > w + l) {
                            h++;
                            w += l; // previous table always l bits
                            // compute minimum size table less than or equal to l bits
                            z = g - w;
                            z = (z > l) ? l : z; // table size upper limit
                            if ((f = 1 << (j = k - w)) > a + 1) { // try a k-w bit table
                                // too few codes for
                                // k-w bit table
                                f -= a + 1; // deduct codes from patterns left
                                xp = k;
                                if (j < z) {
                                    while (++j < z) { // try smaller tables up to z bits
                                        if ((f <<= 1) <= c[++xp]) {
                                            break;
                                        } // enough codes to use up j bits
                                        f -= c[xp]; // else deduct codes from patterns
                                    }
                                }
                            }
                            z = 1 << j; // table entries for j-bit table

                            // allocate new table
                            if (hn[0] + z > MANY) { // (note: doesn't matter for fixed)
                                return Z_DATA_ERROR; // overflow of MANY
                            }
                            u[h] = q = /* hp+ */ hn[0]; // DEBUG
                            hn[0] += z;

                            // connect to last table, if there is one
                            if (h !== 0) {
                                x[h] = i; // save pattern for backing up
                                r[0] = /* (byte) */ j; // bits in this table
                                r[1] = /* (byte) */ l; // bits to dump before this table
                                j = i >>> (w - l);
                                r[2] = /* (int) */ (q - u[h - 1] - j); // offset to this table
                                hp.set(r, (u[h - 1] + j) * 3);
                                // to
                                // last
                                // table
                            } else {
                                t[0] = q; // first table is returned result
                            }
                        }

                        // set up table entry in r
                        r[1] = /* (byte) */ (k - w);
                        if (p >= n) {
                            r[0] = 128 + 64; // out of values--invalid code
                        } else if (v[p] < s) {
                            r[0] = /* (byte) */ (v[p] < 256 ? 0 : 32 + 64); // 256 is
                            // end-of-block
                            r[2] = v[p++]; // simple code is just the value
                        } else {
                            r[0] = /* (byte) */ (e[v[p] - s] + 16 + 64); // non-simple--look
                            // up in lists
                            r[2] = d[v[p++] - s];
                        }

                        // fill code-like entries with r
                        f = 1 << (k - w);
                        for (j = i >>> w; j < z; j += f) {
                            hp.set(r, (q + j) * 3);
                        }

                        // backwards increment the k-bit code i
                        for (j = 1 << (k - 1);
                            (i & j) !== 0; j >>>= 1) {
                            i ^= j;
                        }
                        i ^= j;

                        // backup over finished tables
                        mask = (1 << w) - 1; // needed on HP, cc -O bug
                        while ((i & mask) != x[h]) {
                            h--; // don't need to update q
                            w -= l;
                            mask = (1 << w) - 1;
                        }
                    }
                }
                // Return Z_BUF_ERROR if we were given an incomplete table
                return y !== 0 && g != 1 ? Z_BUF_ERROR : Z_OK;
            }

            function initWorkArea(vsize) {
                var i;
                if (!hn) {
                    hn = []; // []; //new Array(1);
                    v = []; // new Array(vsize);
                    c = new Int32Array(BMAX + 1); // new Array(BMAX + 1);
                    r = []; // new Array(3);
                    u = new Int32Array(BMAX); // new Array(BMAX);
                    x = new Int32Array(BMAX + 1); // new Array(BMAX + 1);
                }
                if (v.length < vsize) {
                    v = []; // new Array(vsize);
                }
                for (i = 0; i < vsize; i++) {
                    v[i] = 0;
                }
                for (i = 0; i < BMAX + 1; i++) {
                    c[i] = 0;
                }
                for (i = 0; i < 3; i++) {
                    r[i] = 0;
                }
                // for(int i=0; i<BMAX; i++){u[i]=0;}
                u.set(c.subarray(0, BMAX), 0);
                // for(int i=0; i<BMAX+1; i++){x[i]=0;}
                x.set(c.subarray(0, BMAX + 1), 0);
            }

            that.inflate_trees_bits = function (c, // 19 code lengths
                bb, // bits tree desired/actual depth
                tb, // bits tree result
                hp, // space for trees
                z // for messages
            ) {
                var result;
                initWorkArea(19);
                hn[0] = 0;
                result = huft_build(c, 0, 19, 19, null, null, tb, bb, hp, hn, v);

                if (result == Z_DATA_ERROR) {
                    z.msg = "oversubscribed dynamic bit lengths tree";
                } else if (result == Z_BUF_ERROR || bb[0] === 0) {
                    z.msg = "incomplete dynamic bit lengths tree";
                    result = Z_DATA_ERROR;
                }
                return result;
            };

            that.inflate_trees_dynamic = function (nl, // number of literal/length codes
                nd, // number of distance codes
                c, // that many (total) code lengths
                bl, // literal desired/actual bit depth
                bd, // distance desired/actual bit depth
                tl, // literal/length tree result
                td, // distance tree result
                hp, // space for trees
                z // for messages
            ) {
                var result;

                // build literal/length tree
                initWorkArea(288);
                hn[0] = 0;
                result = huft_build(c, 0, nl, 257, cplens, cplext, tl, bl, hp, hn, v);
                if (result != Z_OK || bl[0] === 0) {
                    if (result == Z_DATA_ERROR) {
                        z.msg = "oversubscribed literal/length tree";
                    } else if (result != Z_MEM_ERROR) {
                        z.msg = "incomplete literal/length tree";
                        result = Z_DATA_ERROR;
                    }
                    return result;
                }

                // build distance tree
                initWorkArea(288);
                result = huft_build(c, nl, nd, 0, cpdist, cpdext, td, bd, hp, hn, v);

                if (result != Z_OK || (bd[0] === 0 && nl > 257)) {
                    if (result == Z_DATA_ERROR) {
                        z.msg = "oversubscribed distance tree";
                    } else if (result == Z_BUF_ERROR) {
                        z.msg = "incomplete distance tree";
                        result = Z_DATA_ERROR;
                    } else if (result != Z_MEM_ERROR) {
                        z.msg = "empty distance tree with lengths";
                        result = Z_DATA_ERROR;
                    }
                    return result;
                }

                return Z_OK;
            };

        }

        InfTree.inflate_trees_fixed = function (bl, // literal desired/actual bit depth
            bd, // distance desired/actual bit depth
            tl, // literal/length tree result
            td, // distance tree result
            z // for memory allocation
        ) {
            bl[0] = fixed_bl;
            bd[0] = fixed_bd;
            tl[0] = fixed_tl;
            td[0] = fixed_td;
            return Z_OK;
        };

        // InfCodes

        // waiting for "i:"=input,
        // "o:"=output,
        // "x:"=nothing
        var START = 0; // x: set up for LEN
        var LEN = 1; // i: get length/literal/eob next
        var LENEXT = 2; // i: getting length extra (have base)
        var DIST = 3; // i: get distance next
        var DISTEXT = 4; // i: getting distance extra
        var COPY = 5; // o: copying bytes in window, waiting
        // for space
        var LIT = 6; // o: got literal, waiting for output
        // space
        var WASH = 7; // o: got eob, possibly still output
        // waiting
        var END = 8; // x: got eob and all data flushed
        var BADCODE = 9; // x: got error

        function InfCodes() {
            var that = this;

            var mode; // current inflate_codes mode

            // mode dependent information
            var len = 0;

            var tree; // pointer into tree
            var tree_index = 0;
            var need = 0; // bits needed

            var lit = 0;

            // if EXT or COPY, where and how much
            var get = 0; // bits to get for extra
            var dist = 0; // distance back to copy from

            var lbits = 0; // ltree bits decoded per branch
            var dbits = 0; // dtree bits decoder per branch
            var ltree; // literal/length/eob tree
            var ltree_index = 0; // literal/length/eob tree
            var dtree; // distance tree
            var dtree_index = 0; // distance tree

            // Called with number of bytes left to write in window at least 258
            // (the maximum string length) and number of input bytes available
            // at least ten. The ten bytes are six bytes for the longest length/
            // distance pair plus four bytes for overloading the bit buffer.

            function inflate_fast(bl, bd, tl, tl_index, td, td_index, s, z) {
                var t; // temporary pointer
                var tp; // temporary pointer
                var tp_index; // temporary pointer
                var e; // extra bits or operation
                var b; // bit buffer
                var k; // bits in bit buffer
                var p; // input data pointer
                var n; // bytes available there
                var q; // output window write pointer
                var m; // bytes to end of window or read pointer
                var ml; // mask for literal/length tree
                var md; // mask for distance tree
                var c; // bytes to copy
                var d; // distance back to copy from
                var r; // copy source pointer

                var tp_index_t_3; // (tp_index+t)*3

                // load input, output, bit values
                p = z.next_in_index;
                n = z.avail_in;
                b = s.bitb;
                k = s.bitk;
                q = s.write;
                m = q < s.read ? s.read - q - 1 : s.end - q;

                // initialize masks
                ml = inflate_mask[bl];
                md = inflate_mask[bd];

                // do until not enough input or output space for fast loop
                do { // assume called with m >= 258 && n >= 10
                    // get literal/length code
                    while (k < (20)) { // max bits for literal/length code
                        n--;
                        b |= (z.read_byte(p++) & 0xff) << k;
                        k += 8;
                    }

                    t = b & ml;
                    tp = tl;
                    tp_index = tl_index;
                    tp_index_t_3 = (tp_index + t) * 3;
                    if ((e = tp[tp_index_t_3]) === 0) {
                        b >>= (tp[tp_index_t_3 + 1]);
                        k -= (tp[tp_index_t_3 + 1]);

                        s.window[q++] = /* (byte) */ tp[tp_index_t_3 + 2];
                        m--;
                        continue;
                    }
                    do {

                        b >>= (tp[tp_index_t_3 + 1]);
                        k -= (tp[tp_index_t_3 + 1]);

                        if ((e & 16) !== 0) {
                            e &= 15;
                            c = tp[tp_index_t_3 + 2] + (b & inflate_mask[e]);

                            b >>= e;
                            k -= e;

                            // decode distance base of block to copy
                            while (k < (15)) { // max bits for distance code
                                n--;
                                b |= (z.read_byte(p++) & 0xff) << k;
                                k += 8;
                            }

                            t = b & md;
                            tp = td;
                            tp_index = td_index;
                            tp_index_t_3 = (tp_index + t) * 3;
                            e = tp[tp_index_t_3];

                            do {

                                b >>= (tp[tp_index_t_3 + 1]);
                                k -= (tp[tp_index_t_3 + 1]);

                                if ((e & 16) !== 0) {
                                    // get extra bits to add to distance base
                                    e &= 15;
                                    while (k < (e)) { // get extra bits (up to 13)
                                        n--;
                                        b |= (z.read_byte(p++) & 0xff) << k;
                                        k += 8;
                                    }

                                    d = tp[tp_index_t_3 + 2] + (b & inflate_mask[e]);

                                    b >>= (e);
                                    k -= (e);

                                    // do the copy
                                    m -= c;
                                    if (q >= d) { // offset before dest
                                        // just copy
                                        r = q - d;
                                        if (q - r > 0 && 2 > (q - r)) {
                                            s.window[q++] = s.window[r++]; // minimum
                                            // count is
                                            // three,
                                            s.window[q++] = s.window[r++]; // so unroll
                                            // loop a
                                            // little
                                            c -= 2;
                                        } else {
                                            s.window.set(s.window.subarray(r, r + 2), q);
                                            q += 2;
                                            r += 2;
                                            c -= 2;
                                        }
                                    } else { // else offset after destination
                                        r = q - d;
                                        do {
                                            r += s.end; // force pointer in window
                                        } while (r < 0); // covers invalid distances
                                        e = s.end - r;
                                        if (c > e) { // if source crosses,
                                            c -= e; // wrapped copy
                                            if (q - r > 0 && e > (q - r)) {
                                                do {
                                                    s.window[q++] = s.window[r++];
                                                } while (--e !== 0);
                                            } else {
                                                s.window.set(s.window.subarray(r, r + e), q);
                                                q += e;
                                                r += e;
                                                e = 0;
                                            }
                                            r = 0; // copy rest from start of window
                                        }

                                    }

                                    // copy all or what's left
                                    if (q - r > 0 && c > (q - r)) {
                                        do {
                                            s.window[q++] = s.window[r++];
                                        } while (--c !== 0);
                                    } else {
                                        s.window.set(s.window.subarray(r, r + c), q);
                                        q += c;
                                        r += c;
                                        c = 0;
                                    }
                                    break;
                                } else if ((e & 64) === 0) {
                                    t += tp[tp_index_t_3 + 2];
                                    t += (b & inflate_mask[e]);
                                    tp_index_t_3 = (tp_index + t) * 3;
                                    e = tp[tp_index_t_3];
                                } else {
                                    z.msg = "invalid distance code";

                                    c = z.avail_in - n;
                                    c = (k >> 3) < c ? k >> 3 : c;
                                    n += c;
                                    p -= c;
                                    k -= c << 3;

                                    s.bitb = b;
                                    s.bitk = k;
                                    z.avail_in = n;
                                    z.total_in += p - z.next_in_index;
                                    z.next_in_index = p;
                                    s.write = q;

                                    return Z_DATA_ERROR;
                                }
                            } while (true);
                            break;
                        }

                        if ((e & 64) === 0) {
                            t += tp[tp_index_t_3 + 2];
                            t += (b & inflate_mask[e]);
                            tp_index_t_3 = (tp_index + t) * 3;
                            if ((e = tp[tp_index_t_3]) === 0) {

                                b >>= (tp[tp_index_t_3 + 1]);
                                k -= (tp[tp_index_t_3 + 1]);

                                s.window[q++] = /* (byte) */ tp[tp_index_t_3 + 2];
                                m--;
                                break;
                            }
                        } else if ((e & 32) !== 0) {

                            c = z.avail_in - n;
                            c = (k >> 3) < c ? k >> 3 : c;
                            n += c;
                            p -= c;
                            k -= c << 3;

                            s.bitb = b;
                            s.bitk = k;
                            z.avail_in = n;
                            z.total_in += p - z.next_in_index;
                            z.next_in_index = p;
                            s.write = q;

                            return Z_STREAM_END;
                        } else {
                            z.msg = "invalid literal/length code";

                            c = z.avail_in - n;
                            c = (k >> 3) < c ? k >> 3 : c;
                            n += c;
                            p -= c;
                            k -= c << 3;

                            s.bitb = b;
                            s.bitk = k;
                            z.avail_in = n;
                            z.total_in += p - z.next_in_index;
                            z.next_in_index = p;
                            s.write = q;

                            return Z_DATA_ERROR;
                        }
                    } while (true);
                } while (m >= 258 && n >= 10);

                // not enough input or output--restore pointers and return
                c = z.avail_in - n;
                c = (k >> 3) < c ? k >> 3 : c;
                n += c;
                p -= c;
                k -= c << 3;

                s.bitb = b;
                s.bitk = k;
                z.avail_in = n;
                z.total_in += p - z.next_in_index;
                z.next_in_index = p;
                s.write = q;

                return Z_OK;
            }

            that.init = function (bl, bd, tl, tl_index, td, td_index, z) {
                mode = START;
                lbits = /* (byte) */ bl;
                dbits = /* (byte) */ bd;
                ltree = tl;
                ltree_index = tl_index;
                dtree = td;
                dtree_index = td_index;
                tree = null;
            };

            that.proc = function (s, z, r) {
                var j; // temporary storage
                var t; // temporary pointer
                var tindex; // temporary pointer
                var e; // extra bits or operation
                var b = s.bitb; // bit buffer
                var k = s.bitk; // bits in bit buffer
                var p = z.next_in_index; // input data pointer
                var n = z.avail_in; // bytes available there
                var q = s.write; // output window write pointer
                var m = q < s.read ? s.read - q - 1 : s.end - q; // bytes to end of window or read pointer
                var f; // pointer to copy strings from

                // process input and output based on current state
                while (true) {
                    switch (mode) {
                        // waiting for "i:"=input, "o:"=output, "x:"=nothing
                    case START: // x: set up for LEN
                        if (m >= 258 && n >= 10) {

                            s.bitb = b;
                            s.bitk = k;
                            z.avail_in = n;
                            z.total_in += p - z.next_in_index;
                            z.next_in_index = p;
                            s.write = q;
                            r = inflate_fast(lbits, dbits, ltree, ltree_index, dtree, dtree_index, s, z);

                            p = z.next_in_index;
                            n = z.avail_in;
                            b = s.bitb;
                            k = s.bitk;
                            q = s.write;
                            m = q < s.read ? s.read - q - 1 : s.end - q;

                            if (r != Z_OK) {
                                mode = r == Z_STREAM_END ? WASH : BADCODE;
                                break;
                            }
                        }
                        need = lbits;
                        tree = ltree;
                        tree_index = ltree_index;

                        mode = LEN;
                    case LEN: // i: get length/literal/eob next
                        j = need;

                        while (k < (j)) {
                            if (n !== 0) {
                                r = Z_OK;
                            } else {

                                s.bitb = b;
                                s.bitk = k;
                                z.avail_in = n;
                                z.total_in += p - z.next_in_index;
                                z.next_in_index = p;
                                s.write = q;
                                return s.inflate_flush(z, r);
                            }
                            n--;
                            b |= (z.read_byte(p++) & 0xff) << k;
                            k += 8;
                        }

                        tindex = (tree_index + (b & inflate_mask[j])) * 3;

                        b >>>= (tree[tindex + 1]);
                        k -= (tree[tindex + 1]);

                        e = tree[tindex];

                        if (e === 0) { // literal
                            lit = tree[tindex + 2];
                            mode = LIT;
                            break;
                        }
                        if ((e & 16) !== 0) { // length
                            get = e & 15;
                            len = tree[tindex + 2];
                            mode = LENEXT;
                            break;
                        }
                        if ((e & 64) === 0) { // next table
                            need = e;
                            tree_index = tindex / 3 + tree[tindex + 2];
                            break;
                        }
                        if ((e & 32) !== 0) { // end of block
                            mode = WASH;
                            break;
                        }
                        mode = BADCODE; // invalid code
                        z.msg = "invalid literal/length code";
                        r = Z_DATA_ERROR;

                        s.bitb = b;
                        s.bitk = k;
                        z.avail_in = n;
                        z.total_in += p - z.next_in_index;
                        z.next_in_index = p;
                        s.write = q;
                        return s.inflate_flush(z, r);

                    case LENEXT: // i: getting length extra (have base)
                        j = get;

                        while (k < (j)) {
                            if (n !== 0) {
                                r = Z_OK;
                            } else {

                                s.bitb = b;
                                s.bitk = k;
                                z.avail_in = n;
                                z.total_in += p - z.next_in_index;
                                z.next_in_index = p;
                                s.write = q;
                                return s.inflate_flush(z, r);
                            }
                            n--;
                            b |= (z.read_byte(p++) & 0xff) << k;
                            k += 8;
                        }

                        len += (b & inflate_mask[j]);

                        b >>= j;
                        k -= j;

                        need = dbits;
                        tree = dtree;
                        tree_index = dtree_index;
                        mode = DIST;
                    case DIST: // i: get distance next
                        j = need;

                        while (k < (j)) {
                            if (n !== 0) {
                                r = Z_OK;
                            } else {

                                s.bitb = b;
                                s.bitk = k;
                                z.avail_in = n;
                                z.total_in += p - z.next_in_index;
                                z.next_in_index = p;
                                s.write = q;
                                return s.inflate_flush(z, r);
                            }
                            n--;
                            b |= (z.read_byte(p++) & 0xff) << k;
                            k += 8;
                        }

                        tindex = (tree_index + (b & inflate_mask[j])) * 3;

                        b >>= tree[tindex + 1];
                        k -= tree[tindex + 1];

                        e = (tree[tindex]);
                        if ((e & 16) !== 0) { // distance
                            get = e & 15;
                            dist = tree[tindex + 2];
                            mode = DISTEXT;
                            break;
                        }
                        if ((e & 64) === 0) { // next table
                            need = e;
                            tree_index = tindex / 3 + tree[tindex + 2];
                            break;
                        }
                        mode = BADCODE; // invalid code
                        z.msg = "invalid distance code";
                        r = Z_DATA_ERROR;

                        s.bitb = b;
                        s.bitk = k;
                        z.avail_in = n;
                        z.total_in += p - z.next_in_index;
                        z.next_in_index = p;
                        s.write = q;
                        return s.inflate_flush(z, r);

                    case DISTEXT: // i: getting distance extra
                        j = get;

                        while (k < (j)) {
                            if (n !== 0) {
                                r = Z_OK;
                            } else {

                                s.bitb = b;
                                s.bitk = k;
                                z.avail_in = n;
                                z.total_in += p - z.next_in_index;
                                z.next_in_index = p;
                                s.write = q;
                                return s.inflate_flush(z, r);
                            }
                            n--;
                            b |= (z.read_byte(p++) & 0xff) << k;
                            k += 8;
                        }

                        dist += (b & inflate_mask[j]);

                        b >>= j;
                        k -= j;

                        mode = COPY;
                    case COPY: // o: copying bytes in window, waiting for space
                        f = q - dist;
                        while (f < 0) { // modulo window size-"while" instead
                            f += s.end; // of "if" handles invalid distances
                        }
                        while (len !== 0) {

                            if (m === 0) {
                                if (q == s.end && s.read !== 0) {
                                    q = 0;
                                    m = q < s.read ? s.read - q - 1 : s.end - q;
                                }
                                if (m === 0) {
                                    s.write = q;
                                    r = s.inflate_flush(z, r);
                                    q = s.write;
                                    m = q < s.read ? s.read - q - 1 : s.end - q;

                                    if (q == s.end && s.read !== 0) {
                                        q = 0;
                                        m = q < s.read ? s.read - q - 1 : s.end - q;
                                    }

                                    if (m === 0) {
                                        s.bitb = b;
                                        s.bitk = k;
                                        z.avail_in = n;
                                        z.total_in += p - z.next_in_index;
                                        z.next_in_index = p;
                                        s.write = q;
                                        return s.inflate_flush(z, r);
                                    }
                                }
                            }

                            s.window[q++] = s.window[f++];
                            m--;

                            if (f == s.end) {
                                f = 0;
                            }
                            len--;
                        }
                        mode = START;
                        break;
                    case LIT: // o: got literal, waiting for output space
                        if (m === 0) {
                            if (q == s.end && s.read !== 0) {
                                q = 0;
                                m = q < s.read ? s.read - q - 1 : s.end - q;
                            }
                            if (m === 0) {
                                s.write = q;
                                r = s.inflate_flush(z, r);
                                q = s.write;
                                m = q < s.read ? s.read - q - 1 : s.end - q;

                                if (q == s.end && s.read !== 0) {
                                    q = 0;
                                    m = q < s.read ? s.read - q - 1 : s.end - q;
                                }
                                if (m === 0) {
                                    s.bitb = b;
                                    s.bitk = k;
                                    z.avail_in = n;
                                    z.total_in += p - z.next_in_index;
                                    z.next_in_index = p;
                                    s.write = q;
                                    return s.inflate_flush(z, r);
                                }
                            }
                        }
                        r = Z_OK;

                        s.window[q++] = /* (byte) */ lit;
                        m--;

                        mode = START;
                        break;
                    case WASH: // o: got eob, possibly more output
                        if (k > 7) { // return unused byte, if any
                            k -= 8;
                            n++;
                            p--; // can always return one
                        }

                        s.write = q;
                        r = s.inflate_flush(z, r);
                        q = s.write;
                        m = q < s.read ? s.read - q - 1 : s.end - q;

                        if (s.read != s.write) {
                            s.bitb = b;
                            s.bitk = k;
                            z.avail_in = n;
                            z.total_in += p - z.next_in_index;
                            z.next_in_index = p;
                            s.write = q;
                            return s.inflate_flush(z, r);
                        }
                        mode = END;
                    case END:
                        r = Z_STREAM_END;
                        s.bitb = b;
                        s.bitk = k;
                        z.avail_in = n;
                        z.total_in += p - z.next_in_index;
                        z.next_in_index = p;
                        s.write = q;
                        return s.inflate_flush(z, r);

                    case BADCODE: // x: got error

                        r = Z_DATA_ERROR;

                        s.bitb = b;
                        s.bitk = k;
                        z.avail_in = n;
                        z.total_in += p - z.next_in_index;
                        z.next_in_index = p;
                        s.write = q;
                        return s.inflate_flush(z, r);

                    default:
                        r = Z_STREAM_ERROR;

                        s.bitb = b;
                        s.bitk = k;
                        z.avail_in = n;
                        z.total_in += p - z.next_in_index;
                        z.next_in_index = p;
                        s.write = q;
                        return s.inflate_flush(z, r);
                    }
                }
            };

            that.free = function (z) {
                // ZFREE(z, c);
            };

        }

        // InfBlocks

        // Table for deflate from PKZIP's appnote.txt.
        var border = [ // Order of the bit length code lengths
            16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15
        ];

        var TYPE = 0; // get type bits (3, including end bit)
        var LENS = 1; // get lengths for stored
        var STORED = 2; // processing stored block
        var TABLE = 3; // get table lengths
        var BTREE = 4; // get bit lengths tree for a dynamic
        // block
        var DTREE = 5; // get length, distance trees for a
        // dynamic block
        var CODES = 6; // processing fixed or dynamic block
        var DRY = 7; // output remaining window bytes
        var DONELOCKS = 8; // finished last block, done
        var BADBLOCKS = 9; // ot a data error--stuck here

        function InfBlocks(z, w) {
            var that = this;

            var mode = TYPE; // current inflate_block mode

            var left = 0; // if STORED, bytes left to copy

            var table = 0; // table lengths (14 bits)
            var index = 0; // index into blens (or border)
            var blens; // bit lengths of codes
            var bb = [0]; // bit length tree depth
            var tb = [0]; // bit length decoding tree

            var codes = new InfCodes(); // if CODES, current state

            var last = 0; // true if this block is the last block

            var hufts = new Int32Array(MANY * 3); // single malloc for tree space
            var check = 0; // check on output
            var inftree = new InfTree();

            that.bitk = 0; // bits in bit buffer
            that.bitb = 0; // bit buffer
            that.window = new Uint8Array(w); // sliding window
            that.end = w; // one byte after sliding window
            that.read = 0; // window read pointer
            that.write = 0; // window write pointer

            that.reset = function (z, c) {
                if (c) {
                    c[0] = check;
                }
                // if (mode == BTREE || mode == DTREE) {
                // }
                if (mode == CODES) {
                    codes.free(z);
                }
                mode = TYPE;
                that.bitk = 0;
                that.bitb = 0;
                that.read = that.write = 0;
            };

            that.reset(z, null);

            // copy as much as possible from the sliding window to the output area
            that.inflate_flush = function (z, r) {
                var n;
                var p;
                var q;

                // local copies of source and destination pointers
                p = z.next_out_index;
                q = that.read;

                // compute number of bytes to copy as far as end of window
                n = /* (int) */ ((q <= that.write ? that.write : that.end) - q);
                if (n > z.avail_out) {
                    n = z.avail_out;
                }
                if (n !== 0 && r == Z_BUF_ERROR) {
                    r = Z_OK;
                }

                // update counters
                z.avail_out -= n;
                z.total_out += n;

                // copy as far as end of window
                z.next_out.set(that.window.subarray(q, q + n), p);
                p += n;
                q += n;

                // see if more to copy at beginning of window
                if (q == that.end) {
                    // wrap pointers
                    q = 0;
                    if (that.write == that.end) {
                        that.write = 0;
                    }

                    // compute bytes to copy
                    n = that.write - q;
                    if (n > z.avail_out) {
                        n = z.avail_out;
                    }
                    if (n !== 0 && r == Z_BUF_ERROR) {
                        r = Z_OK;
                    }

                    // update counters
                    z.avail_out -= n;
                    z.total_out += n;

                    // copy
                    z.next_out.set(that.window.subarray(q, q + n), p);
                    p += n;
                    q += n;
                }

                // update pointers
                z.next_out_index = p;
                that.read = q;

                // done
                return r;
            };

            that.proc = function (z, r) {
                var t; // temporary storage
                var b; // bit buffer
                var k; // bits in bit buffer
                var p; // input data pointer
                var n; // bytes available there
                var q; // output window write pointer
                var m; // bytes to end of window or read pointer

                var i;

                // copy input/output information to locals (UPDATE macro restores)
                // {
                p = z.next_in_index;
                n = z.avail_in;
                b = that.bitb;
                k = that.bitk;
                // }
                // {
                q = that.write;
                m = /* (int) */ (q < that.read ? that.read - q - 1 : that.end - q);
                // }

                // process input based on current state
                // DEBUG dtree
                while (true) {
                    switch (mode) {
                    case TYPE:

                        while (k < (3)) {
                            if (n !== 0) {
                                r = Z_OK;
                            } else {
                                that.bitb = b;
                                that.bitk = k;
                                z.avail_in = n;
                                z.total_in += p - z.next_in_index;
                                z.next_in_index = p;
                                that.write = q;
                                return that.inflate_flush(z, r);
                            }
                            n--;
                            b |= (z.read_byte(p++) & 0xff) << k;
                            k += 8;
                        }
                        t = /* (int) */ (b & 7);
                        last = t & 1;

                        switch (t >>> 1) {
                        case 0: // stored
                            // {
                            b >>>= (3);
                            k -= (3);
                            // }
                            t = k & 7; // go to byte boundary

                            // {
                            b >>>= (t);
                            k -= (t);
                            // }
                            mode = LENS; // get length of stored block
                            break;
                        case 1: // fixed
                            // {
                            var bl = []; // new Array(1);
                            var bd = []; // new Array(1);
                            var tl = [
                                []
                            ]; // new Array(1);
                            var td = [
                                []
                            ]; // new Array(1);

                            InfTree.inflate_trees_fixed(bl, bd, tl, td, z);
                            codes.init(bl[0], bd[0], tl[0], 0, td[0], 0, z);
                            // }

                            // {
                            b >>>= (3);
                            k -= (3);
                            // }

                            mode = CODES;
                            break;
                        case 2: // dynamic

                            // {
                            b >>>= (3);
                            k -= (3);
                            // }

                            mode = TABLE;
                            break;
                        case 3: // illegal

                            // {
                            b >>>= (3);
                            k -= (3);
                            // }
                            mode = BADBLOCKS;
                            z.msg = "invalid block type";
                            r = Z_DATA_ERROR;

                            that.bitb = b;
                            that.bitk = k;
                            z.avail_in = n;
                            z.total_in += p - z.next_in_index;
                            z.next_in_index = p;
                            that.write = q;
                            return that.inflate_flush(z, r);
                        }
                        break;
                    case LENS:

                        while (k < (32)) {
                            if (n !== 0) {
                                r = Z_OK;
                            } else {
                                that.bitb = b;
                                that.bitk = k;
                                z.avail_in = n;
                                z.total_in += p - z.next_in_index;
                                z.next_in_index = p;
                                that.write = q;
                                return that.inflate_flush(z, r);
                            }
                            n--;
                            b |= (z.read_byte(p++) & 0xff) << k;
                            k += 8;
                        }

                        if ((((~b) >>> 16) & 0xffff) != (b & 0xffff)) {
                            mode = BADBLOCKS;
                            z.msg = "invalid stored block lengths";
                            r = Z_DATA_ERROR;

                            that.bitb = b;
                            that.bitk = k;
                            z.avail_in = n;
                            z.total_in += p - z.next_in_index;
                            z.next_in_index = p;
                            that.write = q;
                            return that.inflate_flush(z, r);
                        }
                        left = (b & 0xffff);
                        b = k = 0; // dump bits
                        mode = left !== 0 ? STORED : (last !== 0 ? DRY : TYPE);
                        break;
                    case STORED:
                        if (n === 0) {
                            that.bitb = b;
                            that.bitk = k;
                            z.avail_in = n;
                            z.total_in += p - z.next_in_index;
                            z.next_in_index = p;
                            that.write = q;
                            return that.inflate_flush(z, r);
                        }

                        if (m === 0) {
                            if (q == that.end && that.read !== 0) {
                                q = 0;
                                m = /* (int) */ (q < that.read ? that.read - q - 1 : that.end - q);
                            }
                            if (m === 0) {
                                that.write = q;
                                r = that.inflate_flush(z, r);
                                q = that.write;
                                m = /* (int) */ (q < that.read ? that.read - q - 1 : that.end - q);
                                if (q == that.end && that.read !== 0) {
                                    q = 0;
                                    m = /* (int) */ (q < that.read ? that.read - q - 1 : that.end - q);
                                }
                                if (m === 0) {
                                    that.bitb = b;
                                    that.bitk = k;
                                    z.avail_in = n;
                                    z.total_in += p - z.next_in_index;
                                    z.next_in_index = p;
                                    that.write = q;
                                    return that.inflate_flush(z, r);
                                }
                            }
                        }
                        r = Z_OK;

                        t = left;
                        if (t > n) {
                            t = n;
                        }
                        if (t > m) {
                            t = m;
                        }
                        that.window.set(z.read_buf(p, t), q);
                        p += t;
                        n -= t;
                        q += t;
                        m -= t;
                        if ((left -= t) !== 0) {
                            break;
                        }
                        mode = last !== 0 ? DRY : TYPE;
                        break;
                    case TABLE:

                        while (k < (14)) {
                            if (n !== 0) {
                                r = Z_OK;
                            } else {
                                that.bitb = b;
                                that.bitk = k;
                                z.avail_in = n;
                                z.total_in += p - z.next_in_index;
                                z.next_in_index = p;
                                that.write = q;
                                return that.inflate_flush(z, r);
                            }

                            n--;
                            b |= (z.read_byte(p++) & 0xff) << k;
                            k += 8;
                        }

                        table = t = (b & 0x3fff);
                        if ((t & 0x1f) > 29 || ((t >> 5) & 0x1f) > 29) {
                            mode = BADBLOCKS;
                            z.msg = "too many length or distance symbols";
                            r = Z_DATA_ERROR;

                            that.bitb = b;
                            that.bitk = k;
                            z.avail_in = n;
                            z.total_in += p - z.next_in_index;
                            z.next_in_index = p;
                            that.write = q;
                            return that.inflate_flush(z, r);
                        }
                        t = 258 + (t & 0x1f) + ((t >> 5) & 0x1f);
                        if (!blens || blens.length < t) {
                            blens = []; // new Array(t);
                        } else {
                            for (i = 0; i < t; i++) {
                                blens[i] = 0;
                            }
                        }

                        // {
                        b >>>= (14);
                        k -= (14);
                        // }

                        index = 0;
                        mode = BTREE;
                    case BTREE:
                        while (index < 4 + (table >>> 10)) {
                            while (k < (3)) {
                                if (n !== 0) {
                                    r = Z_OK;
                                } else {
                                    that.bitb = b;
                                    that.bitk = k;
                                    z.avail_in = n;
                                    z.total_in += p - z.next_in_index;
                                    z.next_in_index = p;
                                    that.write = q;
                                    return that.inflate_flush(z, r);
                                }
                                n--;
                                b |= (z.read_byte(p++) & 0xff) << k;
                                k += 8;
                            }

                            blens[border[index++]] = b & 7;

                            // {
                            b >>>= (3);
                            k -= (3);
                            // }
                        }

                        while (index < 19) {
                            blens[border[index++]] = 0;
                        }

                        bb[0] = 7;
                        t = inftree.inflate_trees_bits(blens, bb, tb, hufts, z);
                        if (t != Z_OK) {
                            r = t;
                            if (r == Z_DATA_ERROR) {
                                blens = null;
                                mode = BADBLOCKS;
                            }

                            that.bitb = b;
                            that.bitk = k;
                            z.avail_in = n;
                            z.total_in += p - z.next_in_index;
                            z.next_in_index = p;
                            that.write = q;
                            return that.inflate_flush(z, r);
                        }

                        index = 0;
                        mode = DTREE;
                    case DTREE:
                        while (true) {
                            t = table;
                            if (!(index < 258 + (t & 0x1f) + ((t >> 5) & 0x1f))) {
                                break;
                            }

                            var h;
                            var j, c;

                            t = bb[0];

                            while (k < (t)) {
                                if (n !== 0) {
                                    r = Z_OK;
                                } else {
                                    that.bitb = b;
                                    that.bitk = k;
                                    z.avail_in = n;
                                    z.total_in += p - z.next_in_index;
                                    z.next_in_index = p;
                                    that.write = q;
                                    return that.inflate_flush(z, r);
                                }
                                n--;
                                b |= (z.read_byte(p++) & 0xff) << k;
                                k += 8;
                            }

                            // if (tb[0] == -1) {
                            // System.err.println("null...");
                            // }

                            t = hufts[(tb[0] + (b & inflate_mask[t])) * 3 + 1];
                            c = hufts[(tb[0] + (b & inflate_mask[t])) * 3 + 2];

                            if (c < 16) {
                                b >>>= (t);
                                k -= (t);
                                blens[index++] = c;
                            } else { // c == 16..18
                                i = c == 18 ? 7 : c - 14;
                                j = c == 18 ? 11 : 3;

                                while (k < (t + i)) {
                                    if (n !== 0) {
                                        r = Z_OK;
                                    } else {
                                        that.bitb = b;
                                        that.bitk = k;
                                        z.avail_in = n;
                                        z.total_in += p - z.next_in_index;
                                        z.next_in_index = p;
                                        that.write = q;
                                        return that.inflate_flush(z, r);
                                    }
                                    n--;
                                    b |= (z.read_byte(p++) & 0xff) << k;
                                    k += 8;
                                }

                                b >>>= (t);
                                k -= (t);

                                j += (b & inflate_mask[i]);

                                b >>>= (i);
                                k -= (i);

                                i = index;
                                t = table;
                                if (i + j > 258 + (t & 0x1f) + ((t >> 5) & 0x1f) || (c == 16 && i < 1)) {
                                    blens = null;
                                    mode = BADBLOCKS;
                                    z.msg = "invalid bit length repeat";
                                    r = Z_DATA_ERROR;

                                    that.bitb = b;
                                    that.bitk = k;
                                    z.avail_in = n;
                                    z.total_in += p - z.next_in_index;
                                    z.next_in_index = p;
                                    that.write = q;
                                    return that.inflate_flush(z, r);
                                }

                                c = c == 16 ? blens[i - 1] : 0;
                                do {
                                    blens[i++] = c;
                                } while (--j !== 0);
                                index = i;
                            }
                        }

                        tb[0] = -1;
                        // {
                        var bl_ = []; // new Array(1);
                        var bd_ = []; // new Array(1);
                        var tl_ = []; // new Array(1);
                        var td_ = []; // new Array(1);
                        bl_[0] = 9; // must be <= 9 for lookahead assumptions
                        bd_[0] = 6; // must be <= 9 for lookahead assumptions

                        t = table;
                        t = inftree.inflate_trees_dynamic(257 + (t & 0x1f), 1 + ((t >> 5) & 0x1f), blens, bl_, bd_, tl_, td_, hufts, z);

                        if (t != Z_OK) {
                            if (t == Z_DATA_ERROR) {
                                blens = null;
                                mode = BADBLOCKS;
                            }
                            r = t;

                            that.bitb = b;
                            that.bitk = k;
                            z.avail_in = n;
                            z.total_in += p - z.next_in_index;
                            z.next_in_index = p;
                            that.write = q;
                            return that.inflate_flush(z, r);
                        }
                        codes.init(bl_[0], bd_[0], hufts, tl_[0], hufts, td_[0], z);
                        // }
                        mode = CODES;
                    case CODES:
                        that.bitb = b;
                        that.bitk = k;
                        z.avail_in = n;
                        z.total_in += p - z.next_in_index;
                        z.next_in_index = p;
                        that.write = q;

                        if ((r = codes.proc(that, z, r)) != Z_STREAM_END) {
                            return that.inflate_flush(z, r);
                        }
                        r = Z_OK;
                        codes.free(z);

                        p = z.next_in_index;
                        n = z.avail_in;
                        b = that.bitb;
                        k = that.bitk;
                        q = that.write;
                        m = /* (int) */ (q < that.read ? that.read - q - 1 : that.end - q);

                        if (last === 0) {
                            mode = TYPE;
                            break;
                        }
                        mode = DRY;
                    case DRY:
                        that.write = q;
                        r = that.inflate_flush(z, r);
                        q = that.write;
                        m = /* (int) */ (q < that.read ? that.read - q - 1 : that.end - q);
                        if (that.read != that.write) {
                            that.bitb = b;
                            that.bitk = k;
                            z.avail_in = n;
                            z.total_in += p - z.next_in_index;
                            z.next_in_index = p;
                            that.write = q;
                            return that.inflate_flush(z, r);
                        }
                        mode = DONELOCKS;
                    case DONELOCKS:
                        r = Z_STREAM_END;

                        that.bitb = b;
                        that.bitk = k;
                        z.avail_in = n;
                        z.total_in += p - z.next_in_index;
                        z.next_in_index = p;
                        that.write = q;
                        return that.inflate_flush(z, r);
                    case BADBLOCKS:
                        r = Z_DATA_ERROR;

                        that.bitb = b;
                        that.bitk = k;
                        z.avail_in = n;
                        z.total_in += p - z.next_in_index;
                        z.next_in_index = p;
                        that.write = q;
                        return that.inflate_flush(z, r);

                    default:
                        r = Z_STREAM_ERROR;

                        that.bitb = b;
                        that.bitk = k;
                        z.avail_in = n;
                        z.total_in += p - z.next_in_index;
                        z.next_in_index = p;
                        that.write = q;
                        return that.inflate_flush(z, r);
                    }
                }
            };

            that.free = function (z) {
                that.reset(z, null);
                that.window = null;
                hufts = null;
                // ZFREE(z, s);
            };

            that.set_dictionary = function (d, start, n) {
                that.window.set(d.subarray(start, start + n), 0);
                that.read = that.write = n;
            };

            // Returns true if inflate is currently at the end of a block generated
            // by Z_SYNC_FLUSH or Z_FULL_FLUSH.
            that.sync_point = function () {
                return mode == LENS ? 1 : 0;
            };

        }

        // Inflate

        // preset dictionary flag in zlib header
        var PRESET_DICT = 0x20;

        var Z_DEFLATED = 8;

        var METHOD = 0; // waiting for method byte
        var FLAG = 1; // waiting for flag byte
        var DICT4 = 2; // four dictionary check bytes to go
        var DICT3 = 3; // three dictionary check bytes to go
        var DICT2 = 4; // two dictionary check bytes to go
        var DICT1 = 5; // one dictionary check byte to go
        var DICT0 = 6; // waiting for inflateSetDictionary
        var BLOCKS = 7; // decompressing blocks
        var DONE = 12; // finished check, done
        var BAD = 13; // got an error--stay here

        var mark = [0, 0, 0xff, 0xff];

        function Inflate() {
            var that = this;

            that.mode = 0; // current inflate mode

            // mode dependent information
            that.method = 0; // if FLAGS, method byte

            // if CHECK, check values to compare
            that.was = [0]; // new Array(1); // computed check value
            that.need = 0; // stream check value

            // if BAD, inflateSync's marker bytes count
            that.marker = 0;

            // mode independent information
            that.wbits = 0; // log2(window size) (8..15, defaults to 15)

            // this.blocks; // current inflate_blocks state

            function inflateReset(z) {
                if (!z || !z.istate) {
                    return Z_STREAM_ERROR;
                }

                z.total_in = z.total_out = 0;
                z.msg = null;
                z.istate.mode = BLOCKS;
                z.istate.blocks.reset(z, null);
                return Z_OK;
            }

            that.inflateEnd = function (z) {
                if (that.blocks) {
                    that.blocks.free(z);
                }
                that.blocks = null;
                // ZFREE(z, z->state);
                return Z_OK;
            };

            that.inflateInit = function (z, w) {
                z.msg = null;
                that.blocks = null;

                // set window size
                if (w < 8 || w > 15) {
                    that.inflateEnd(z);
                    return Z_STREAM_ERROR;
                }
                that.wbits = w;

                z.istate.blocks = new InfBlocks(z, 1 << w);

                // reset state
                inflateReset(z);
                return Z_OK;
            };

            that.inflate = function (z, f) {
                var r;
                var b;

                if (!z || !z.istate || !z.next_in) {
                    return Z_STREAM_ERROR;
                }
                f = f == Z_FINISH ? Z_BUF_ERROR : Z_OK;
                r = Z_BUF_ERROR;
                while (true) {
                    // System.out.println("mode: "+z.istate.mode);
                    switch (z.istate.mode) {
                    case METHOD:

                        if (z.avail_in === 0) {
                            return r;
                        }
                        r = f;

                        z.avail_in--;
                        z.total_in++;
                        if (((z.istate.method = z.read_byte(z.next_in_index++)) & 0xf) != Z_DEFLATED) {
                            z.istate.mode = BAD;
                            z.msg = "unknown compression method";
                            z.istate.marker = 5; // can't try inflateSync
                            break;
                        }
                        if ((z.istate.method >> 4) + 8 > z.istate.wbits) {
                            z.istate.mode = BAD;
                            z.msg = "invalid window size";
                            z.istate.marker = 5; // can't try inflateSync
                            break;
                        }
                        z.istate.mode = FLAG;
                    case FLAG:

                        if (z.avail_in === 0) {
                            return r;
                        }
                        r = f;

                        z.avail_in--;
                        z.total_in++;
                        b = (z.read_byte(z.next_in_index++)) & 0xff;

                        if ((((z.istate.method << 8) + b) % 31) !== 0) {
                            z.istate.mode = BAD;
                            z.msg = "incorrect header check";
                            z.istate.marker = 5; // can't try inflateSync
                            break;
                        }

                        if ((b & PRESET_DICT) === 0) {
                            z.istate.mode = BLOCKS;
                            break;
                        }
                        z.istate.mode = DICT4;
                    case DICT4:

                        if (z.avail_in === 0) {
                            return r;
                        }
                        r = f;

                        z.avail_in--;
                        z.total_in++;
                        z.istate.need = ((z.read_byte(z.next_in_index++) & 0xff) << 24) & 0xff000000;
                        z.istate.mode = DICT3;
                    case DICT3:

                        if (z.avail_in === 0) {
                            return r;
                        }
                        r = f;

                        z.avail_in--;
                        z.total_in++;
                        z.istate.need += ((z.read_byte(z.next_in_index++) & 0xff) << 16) & 0xff0000;
                        z.istate.mode = DICT2;
                    case DICT2:

                        if (z.avail_in === 0) {
                            return r;
                        }
                        r = f;

                        z.avail_in--;
                        z.total_in++;
                        z.istate.need += ((z.read_byte(z.next_in_index++) & 0xff) << 8) & 0xff00;
                        z.istate.mode = DICT1;
                    case DICT1:

                        if (z.avail_in === 0) {
                            return r;
                        }
                        r = f;

                        z.avail_in--;
                        z.total_in++;
                        z.istate.need += (z.read_byte(z.next_in_index++) & 0xff);
                        z.istate.mode = DICT0;
                        return Z_NEED_DICT;
                    case DICT0:
                        z.istate.mode = BAD;
                        z.msg = "need dictionary";
                        z.istate.marker = 0; // can try inflateSync
                        return Z_STREAM_ERROR;
                    case BLOCKS:

                        r = z.istate.blocks.proc(z, r);
                        if (r == Z_DATA_ERROR) {
                            z.istate.mode = BAD;
                            z.istate.marker = 0; // can try inflateSync
                            break;
                        }
                        if (r == Z_OK) {
                            r = f;
                        }
                        if (r != Z_STREAM_END) {
                            return r;
                        }
                        r = f;
                        z.istate.blocks.reset(z, z.istate.was);
                        z.istate.mode = DONE;
                    case DONE:
                        return Z_STREAM_END;
                    case BAD:
                        return Z_DATA_ERROR;
                    default:
                        return Z_STREAM_ERROR;
                    }
                }
            };

            that.inflateSetDictionary = function (z, dictionary, dictLength) {
                var index = 0;
                var length = dictLength;
                if (!z || !z.istate || z.istate.mode != DICT0) {
                    return Z_STREAM_ERROR;
                }

                if (length >= (1 << z.istate.wbits)) {
                    length = (1 << z.istate.wbits) - 1;
                    index = dictLength - length;
                }
                z.istate.blocks.set_dictionary(dictionary, index, length);
                z.istate.mode = BLOCKS;
                return Z_OK;
            };

            that.inflateSync = function (z) {
                var n; // number of bytes to look at
                var p; // pointer to bytes
                var m; // number of marker bytes found in a row
                var r, w; // temporaries to save total_in and total_out

                // set up
                if (!z || !z.istate) {
                    return Z_STREAM_ERROR;
                }
                if (z.istate.mode != BAD) {
                    z.istate.mode = BAD;
                    z.istate.marker = 0;
                }
                if ((n = z.avail_in) === 0) {
                    return Z_BUF_ERROR;
                }
                p = z.next_in_index;
                m = z.istate.marker;

                // search
                while (n !== 0 && m < 4) {
                    if (z.read_byte(p) == mark[m]) {
                        m++;
                    } else if (z.read_byte(p) !== 0) {
                        m = 0;
                    } else {
                        m = 4 - m;
                    }
                    p++;
                    n--;
                }

                // restore
                z.total_in += p - z.next_in_index;
                z.next_in_index = p;
                z.avail_in = n;
                z.istate.marker = m;

                // return no joy or set up to restart on a new block
                if (m != 4) {
                    return Z_DATA_ERROR;
                }
                r = z.total_in;
                w = z.total_out;
                inflateReset(z);
                z.total_in = r;
                z.total_out = w;
                z.istate.mode = BLOCKS;
                return Z_OK;
            };

            // Returns true if inflate is currently at the end of a block generated
            // by Z_SYNC_FLUSH or Z_FULL_FLUSH. This function is used by one PPP
            // implementation to provide an additional safety check. PPP uses
            // Z_SYNC_FLUSH
            // but removes the length bytes of the resulting empty stored block. When
            // decompressing, PPP checks that at the end of input packet, inflate is
            // waiting for these length bytes.
            that.inflateSyncPoint = function (z) {
                if (!z || !z.istate || !z.istate.blocks) {
                    return Z_STREAM_ERROR;
                }
                return z.istate.blocks.sync_point();
            };
        }

        // ZStream

        function ZStream() {}

        ZStream.prototype = {
            inflateInit: function (bits) {
                var that = this;
                that.istate = new Inflate();
                if (!bits) {
                    bits = MAX_BITS;
                }
                return that.istate.inflateInit(that, bits);
            },

            inflate: function (f) {
                var that = this;
                if (!that.istate) {
                    return Z_STREAM_ERROR;
                }
                return that.istate.inflate(that, f);
            },

            inflateEnd: function () {
                var that = this;
                if (!that.istate) {
                    return Z_STREAM_ERROR;
                }
                var ret = that.istate.inflateEnd(that);
                that.istate = null;
                return ret;
            },

            inflateSync: function () {
                var that = this;
                if (!that.istate) {
                    return Z_STREAM_ERROR;
                }
                return that.istate.inflateSync(that);
            },
            inflateSetDictionary: function (dictionary, dictLength) {
                var that = this;
                if (!that.istate) {
                    return Z_STREAM_ERROR;
                }
                return that.istate.inflateSetDictionary(that, dictionary, dictLength);
            },
            read_byte: function (start) {
                var that = this;
                return that.next_in.subarray(start, start + 1)[0];
            },
            read_buf: function (start, size) {
                var that = this;
                return that.next_in.subarray(start, start + size);
            }
        };

        // Inflater

        function Inflater() {
            var that = this;
            var z = new ZStream();
            var bufsize = 512;
            var flush = Z_NO_FLUSH;
            var buf = new Uint8Array(bufsize);
            var nomoreinput = false;

            z.inflateInit();
            z.next_out = buf;

            that.append = function (data, onprogress) {
                var err, buffers = [],
                    lastIndex = 0,
                    bufferIndex = 0,
                    bufferSize = 0,
                    array;
                if (data.length === 0) {
                    return;
                }
                z.next_in_index = 0;
                z.next_in = data;
                z.avail_in = data.length;
                do {
                    z.next_out_index = 0;
                    z.avail_out = bufsize;
                    if ((z.avail_in === 0) && (!nomoreinput)) { // if buffer is empty and more input is available, refill it
                        z.next_in_index = 0;
                        nomoreinput = true;
                    }
                    err = z.inflate(flush);
                    if (nomoreinput && (err == Z_BUF_ERROR)) {
                        return -1;
                    }
                    if (err != Z_OK && err != Z_STREAM_END) {
                        throw "inflating: " + z.msg;
                    }
                    if ((nomoreinput || err == Z_STREAM_END) && (z.avail_out == data.length)) {
                        return -1;
                    }
                    if (z.next_out_index) {
                        if (z.next_out_index == bufsize) {
                            buffers.push(new Uint8Array(buf));
                        } else {
                            buffers.push(new Uint8Array(buf.subarray(0, z.next_out_index)));
                        }
                    }
                    bufferSize += z.next_out_index;
                    if (onprogress && z.next_in_index > 0 && z.next_in_index != lastIndex) {
                        onprogress(z.next_in_index);
                        lastIndex = z.next_in_index;
                    }
                } while (z.avail_in > 0 || z.avail_out === 0);
                array = new Uint8Array(bufferSize);
                buffers.forEach(function (chunk) {
                    array.set(chunk, bufferIndex);
                    bufferIndex += chunk.length;
                });
                return array;
            };
            that.flush = function () {
                z.inflateEnd();
            };
        }

        namespace.zip.Inflater = Inflater;
    }(window, libsRoot));
    var zipEngine = {
        /**
         *
         * @param entry
         * @param creationMethod
         * @param onend
         * @param onprogress
         * @private
         */
        _getEntryFile: function (entry, creationMethod, onend, onprogress) {
            entry.getData(new libsRoot.zip.BlobWriter(), function (blob) {
                onend(entry, blob);
            }, onprogress);
        },
        /**
         *
         * @param options
         */
        read: function (options) {
            libsRoot.zip.createReader(new libsRoot.zip.BlobReader(options.file), function (zipReader) {
                zipReader.getEntries(function (entries) {
                    if (typeof options.success === 'function') {
                        options.success(entries);
                    }
                });
            }, function () {
                if (typeof options.error === 'function') {
                    options.error();
                }
            });
        },
        /**
         *
         * @param options
         */
        readEntry: function (options) {
            var self = this;
            this._getEntryFile(options.entry, options.type, function (entryObject, file) {
                if (typeof options.success === 'function') {
                    options.success.apply(self, arguments);
                }
            });
        }
    };
    /**
     *
     * @param el {HTMLElement}
     * @param prop
     * @param val
     * @returns {HTMLElement}
     * @private
     */
    function addVendorPrefix(el, prop, val) {
        var i,
            len = (vendorPrefixes[prop] && vendorPrefixes[prop].length) || 0;

        for (i = len - 1; i >= 0; i--) {
            el.style[vendorPrefixes[prop][i]] = val;
        }

        el.style[prop] = val;

        return el;
    }
    /**
     *
     * @param prop {string}
     * @returns {string}
     * @private
     */
    function prepareCSSProperty(prop) {
        var mask = (/-(\w)/g),
            result = prop,
            data = mask.exec(result);

        while (data) {
            result = result.replace("-" + data[1], data[1].toUpperCase());
            data = mask.exec(result);
        }

        return result;
    }
    var vendorPrefixes = {
        "boxSizing": ["moz", "o", "ms", "webkit"]
    };
    var eventSplitter = /\s+/;

    function eventsAPI(obj, action, name, rest) {
        if (!name) return true;

        // Handle event maps.
        if (typeof name === 'object') {
            for (var key in name) {
                obj[action].apply(obj, [key, name[key]].concat(rest));
            }
            return false;
        }

        // Handle space separated event names.
        if (eventSplitter.test(name)) {
            var names = name.split(eventSplitter);
            for (var i = 0, l = names.length; i < l; i++) {
                obj[action].apply(obj, [names[i]].concat(rest));
            }
            return false;
        }

        return true;
    }

    function triggerEvents(events, args) {
        var ev,
            i = -1,
            l = events.length,
            a1 = args[0],
            a2 = args[1],
            a3 = args[2];

        switch (args.length) {
        case 0:
            while (++i < l)(ev = events[i]).callback.call(ev.ctx);
            return;
        case 1:
            while (++i < l)(ev = events[i]).callback.call(ev.ctx, a1);
            return;
        case 2:
            while (++i < l)(ev = events[i]).callback.call(ev.ctx, a1, a2);
            return;
        case 3:
            while (++i < l)(ev = events[i]).callback.call(ev.ctx, a1, a2, a3);
            return;
        default:
            while (++i < l)(ev = events[i]).callback.apply(ev.ctx, args);
            return;
        }
    }
    /**
     *
     * @param node
     * @param data
     * @param options
     * @private
     */
    function addAttributes(node, data, options) {
        var prop;

        options = options || {};

        for (prop in data.attributes) {
            node.setAttribute(prop, data.attributes[prop]);
        }
    }
    /**
     *
     * @param node
     * @param data
     * @param options
     * @private
     */
    function addProperties(node, data, options) {
        var prop;

        options = options || {};

        for (prop in data.properties) {
            node[prop] = data.properties[prop];
        }
    }
    /**
     *
     * @param node
     * @param data
     * @param options
     * @private
     */
    function applyCSS(node, data, options) {
        var prop,
            htmlOptions = this._htmlOptions,
            elementUnit = htmlOptions.unit,
            resultUnit;

        options = options || {};

        for (prop in data.css) {
            node.style[prop] = data.css[prop];
        }

        for (prop in data.dimensionCSSRules) {
            resultUnit = elementUnit.base;

            if (prop == "lineHeight" || prop.indexOf('font') >= 0) {
                resultUnit = elementUnit.font;
            } else if (prop.indexOf('border') >= 0) {
                resultUnit = elementUnit.border;
            } else if (prop.indexOf('margin') >= 0) {
                resultUnit = elementUnit.margin;
            } else if (prop.indexOf('padding') >= 0) {
                resultUnit = elementUnit.padding;
            }

            node.style[prop] = unit.convert({
                from: data.dimensionCSSRules[prop].unit,
                to: resultUnit,
                value: data.dimensionCSSRules[prop].value
            }) + resultUnit;
        }
    }
    /**
     *
     * @param data
     * @private
     */
    function buildElement(data) {
        var el,
            i,
            options = data.options || {},
            len;

        if (options.isParagraph) {
            return buildParagraph.call(this, data);
        }

        if (options.isTable) {
            return buildTable.call(this, data);
        }

        if (options.isList) {
            return buildList.call(this, data);
        }

        if (options.isImage) {
            return buildImage.call(this, data);
        }

        if (options.isEmptyLine) {
            return buildEmptyLine.call(this, data);
        }

        if (options.isSchema) {
            return buildSchema.call(this, data);
        }

        if (options.isLink) {
            return buildLink.call(this, data);
        }

        if (data.children) {
            el = document.createElement('div');
            len = data.children.length;

            for (i = 0; i < len; i++) {
                el.appendChild(buildElement.call(this, data.children[i]));
            }
        } else {
            el = document.createElement('span');
        }

        applyCSS.call(this, el, data);
        addAttributes.call(this, el, data);
        addProperties.call(this, el, data);

        return el;
    }
    /**
     *
     * @param data
     * @returns {HTMLElement}
     * @private
     */
    function buildEmptyLine(data) {
        var el = document.createElement('br');

        applyCSS.call(this, el, data);
        addAttributes.call(this, el, data);
        addProperties.call(this, el, data);

        return el;
    }
    /**
     *
     * @param data
     * @returns {HTMLElement}
     * @private
     */
    function buildImage(data) {
        var el = document.createElement('img');

        applyCSS.call(this, el, data);
        addAttributes.call(this, el, data);
        addProperties.call(this, el, data);

        return el;
    }
    /**
     *
     * @param data
     * @returns {HTMLElement}
     * @private
     */
    function buildLink(data) {
        var el = document.createElement('a'),
            len = data.children ? data.children.length : 0,
            i;

        applyCSS.call(this, el, data);
        addAttributes.call(this, el, data);
        addProperties.call(this, el, data);

        for (i = 0; i < len; i++) {
            el.appendChild(buildElement.call(this, data.children[i]));
        }

        return el;
    }
    /**
     *
     * @param data
     * @returns {HTMLElement}
     * @private
     */
    function buildList(data) {
        var el = document.createElement('ul'),
            children = data.children,
            len = children.length,
            item,
            i,
            j,
            llen;

        applyCSS.call(this, el, data);
        addAttributes.call(this, el, data);
        addProperties.call(this, el, data);

        for (i = 0; i < len; i++) {
            item = document.createElement('li');

            applyCSS.call(this, item, children[i]);
            addAttributes.call(this, item, children[i]);
            addProperties.call(this, item, children[i]);

            llen = children[i].children.length;

            for (j = 0; j < llen; j++) {
                item.appendChild(buildElement.call(this, children[i].children[j]));
            }

            el.appendChild(item);
        }

        return el;
    }

    function buildPageNumber(el, data) {
        var numberBlock = document.createElement('div'),
            options = data.options;

        el.style.position = "relative";
        numberBlock.style.position = "absolute";
        numberBlock.style.top = options.header.dimensionCSSRules.height ?
            unit.convert({
                from: options.header.dimensionCSSRules.height.unit,
                to: this._htmlOptions.unit.base,
                value: options.header.dimensionCSSRules.height.value
            }) + this._htmlOptions.unit.base : 0;
        numberBlock.style.right = el.style.paddingRight || 0;

        numberBlock.appendChild(document.createTextNode(options.pageNumber.value));
        el.appendChild(numberBlock);

        return el;
    }
    /**
     *
     * @param data
     * @returns {HTMLElement}
     * @private
     */
    function buildParagraph(data) {
        var el = document.createElement('p'),
            len = data.children.length,
            l;

        applyCSS.call(this, el, data);
        addAttributes.call(this, el, data);
        addProperties.call(this, el, data);

        for (l = 0; l < len; l++) {
            el.appendChild(buildElement.call(this, data.children[l]));
        }

        return el;
    }
    /**
     *
     * @param data
     * @returns {HTMLElement}
     * @private
     */
    function buildSchema(data) {
        var el = document.createElement('div'),
            children = data.children,
            len = children.length,
            llen,
            i,
            j,
            part;

        applyCSS.call(this, el, data);
        addAttributes.call(this, el, data);
        addProperties.call(this, el, data);

        for (i = 0; i < len; i++) {
            part = document.createElement('div');

            applyCSS.call(this, part, children[i]);
            addAttributes.call(this, part, children[i]);
            addProperties.call(this, part, children[i]);

            llen = children[i].children.length;

            for (j = 0; j < llen; j++) {
                part.appendChild(buildElement.call(this, children[i].children[j]));
            }

            el.appendChild(part);
        }

        return el;
    }
    /**
     *
     * @param data
     * @returns {HTMLElement}
     * @private
     */
    function buildTable(data) {
        var i,
            table = document.createElement('table'),
            children = data.children,
            len = children.length;

        applyCSS.call(this, table, data);
        addAttributes.call(this, table, data);
        addProperties.call(this, table, data);

        for (i = 0; i < len; i++) {
            table.appendChild(buildTablePart.call(this, children[i]));
        }

        return table;
    }
    /**
     *
     * @param data
     * @param options
     * @returns {HTMLElement}
     * @private
     */
    function buildTablePart(data, options) {
        var children = data.children || [],
            partOptions = data.options || {},
            len = children.length,
            el,
            i,
            j,
            c,
            cLen,
            eLen,
            chEl,
            elem,
            partTagName = "tbody",
            rowTagName = "tr",
            cellTagName = "td";

        options = options || {};

        if (partOptions.isHeader) {
            partTagName = "thead";
            cellTagName = "th";
        } else if (partOptions.isFooter) {
            partTagName = "tfoot";
        }

        el = document.createElement(partTagName);

        applyCSS.call(this, el, data);
        addAttributes.call(this, el, data);
        addProperties.call(this, el, data);

        for (i = 0; i < len; i++) {
            chEl = document.createElement(rowTagName);

            applyCSS.call(this, chEl, children[i]);
            addAttributes.call(this, chEl, children[i]);
            addProperties.call(this, chEl, children[i]);

            eLen = children[i].children.length;

            for (j = 0; j < eLen; j++) {
                elem = document.createElement(cellTagName);

                applyCSS.call(this, elem, children[i].children[j]);
                addAttributes.call(this, elem, children[i].children[j]);
                addProperties.call(this, elem, children[i].children[j]);

                cLen = children[i].children[j].children.length;

                for (c = 0; c < cLen; c++) {
                    elem.appendChild(buildElement.call(this, children[i].children[j].children[c]));
                }

                chEl.appendChild(elem);
            }

            el.appendChild(chEl);
        }

        return el;
    }
    var fileDataClasses = {
        page: "jdoc-page"
    };

    function setHTMLOptions(options) {
        this._htmlOptions = copy({}, options, {
            unit: {
                font: "px",
                border: "px",
                margin: "px",
                padding: "px",
                base: "px"
            }
        });
    }
    /**
     *
     * @private
     */
    var colorList = {
        "black": "#000000",
        "navy": "#000080",
        "darkblue": "#00008B",
        "mediumblue": "#0000CD",
        "blue": "#0000FF",
        "darkgreen": "#006400",
        "green": "#008000",
        "teal": "#008080",
        "darkcyan": "#008B8B",
        "deepskyblue": "#00BFFF",
        "darkturquoise": "#00CED1",
        "mediumspringgreen": "#00FA9A",
        "lime": "#00FF00",
        "springgreen": "#00FF7F",
        "aqua": "#00FFFF",
        "cyan": "#00FFFF",
        "midnightblue": "#191970",
        "dodgerblue": "#1E90FF",
        "lightseagreen": "#20B2AA",
        "forestgreen": "#228B22",
        "seagreen": "#2E8B57",
        "darkslategray": "#2F4F4F",
        "limegreen": "#32CD32",
        "mediumseagreen": "#3CB371",
        "turquoise": "#40E0D0",
        "royalblue": "#4169E1",
        "steelblue": "#4682B4",
        "darkslateblue": "#483D8B",
        "mediumturquoise": "#48D1CC",
        "white": "#FFFFFF",
        "indigo": "#4B0082",
        "darkolivegreen": "#556B2F",
        "cadetblue": "#5F9EA0",
        "cornflowerblue": "#6495ED",
        "mediumaquamarine": "#66CDAA",
        "dimgray": "#696969",
        "slateblue": "#6A5ACD",
        "olivedrab": "#6B8E23",
        "slategray": "#708090",
        "lightslategray": "#778899",
        "mediumslateblue": "#7B68EE",
        "lawngreen": "#7CFC00",
        "chartreuse": "#7FFF00",
        "aquamarine": "#7FFFD4",
        "maroon": "#800000",
        "purple": "#800080",
        "olive": "#808000",
        "gray": "#808080",
        "skyblue": "#87CEEB",
        "lightskyblue": "#87CEFA",
        "blueviolet": "#8A2BE2",
        "darkred": "#8B0000",
        "darkmagenta": "#8B008B",
        "saddlebrown": "#8B4513",
        "darkseagreen": "#8FBC8F",
        "lightgreen": "#90EE90",
        "mediumpurple": "#9370D8",
        "darkviolet": "#9400D3",
        "palegreen": "#98FB98",
        "darkorchid": "#9932CC",
        "yellowgreen": "#9ACD32",
        "sienna": "#A0522D",
        "brown": "#A52A2A",
        "darkgray": "#A9A9A9",
        "lightblue": "#ADD8E6",
        "greenyellow": "#ADFF2F",
        "paleturquoise": "#AFEEEE",
        "lightsteelblue": "#B0C4DE",
        "powderblue": "#B0E0E6",
        "firebrick": "#B22222",
        "darkgoldenrod": "#B8860B",
        "mediumorchid": "#BA55D3",
        "rosybrown": "#BC8F8F",
        "darkkhaki": "#BDB76B",
        "silver": "#C0C0C0",
        "mediumvioletred": "#C71585",
        "indianred": "#CD5C5C",
        "peru": "#CD853F",
        "chocolate": "#D2691E",
        "tan": "#D2B48C",
        "lightgray": "#D3D3D3",
        "palevioletred": "#D87093",
        "thistle": "#D8BFD8",
        "orchid": "#DA70D6",
        "goldenrod": "#DAA520",
        "crimson": "#DC143C",
        "gainsboro": "#DCDCDC",
        "plum": "#DDA0DD",
        "burlywood": "#DEB887",
        "lightcyan": "#E0FFFF",
        "lavender": "#E6E6FA",
        "darksalmon": "#E9967A",
        "violet": "#EE82EE",
        "palegoldenrod": "#EE82EE",
        "airforceblue": "#5D8AA8",
        "aliceblue": "#F0F8FF",
        "alizarincrimson": "#E32636",
        "almond": "#EFDECD",
        "amaranth": "#E52B50",
        "lightcoral": "#F08080",
        "khaki": "#F0E68C",
        "honeydew": "#F0FFF0",
        "azure": "#F0FFFF",
        "sandybrown": "#F4A460",
        "wheat": "#F5DEB3",
        "beige": "#F5F5DC",
        "whitesmoke": "#F5F5F5",
        "mintcream": "#F5FFFA",
        "ghostwhite": "#F8F8FF",
        "salmon": "#FA8072",
        "antiqueWhite": "#FAEBD7",
        "linen": "#FAF0E6",
        "lightgoldenrodyellow": "#FAFAD2",
        "oldlace": "#FDF5E6",
        "red": "#FF0000",
        "fuchsia": "#FF00FF",
        "magenta": "#FF00FF",
        "deeppink": "#FF1493",
        "orangered": "#FF4500",
        "tomato": "#FF6347",
        "hotpink": "#FF69B4",
        "coral": "#FF7F50",
        "darkorange": "#FF8C00",
        "lightSalmon": "#FFA07A",
        "orange": "#FFA500",
        "lightpink": "#FFB6C1",
        "pink": "#FFC0CB",
        "gold": "#FFD700",
        "peachpuff": "#FFDAB9",
        "navajowhite": "#FFDEAD",
        "moccasin": "#FFE4B5",
        "bisque": "#FFE4C4",
        "mistyrose": "#FFE4E1",
        "blanchedalmond": "#FFEBCD",
        "papayawhip": "#FFEFD5",
        "lavenderblush": "#FFF0F5",
        "seashell": "#FFF5EE",
        "cornsilk": "#FFF8DC",
        "lemonchiffon": "#FFFACD",
        "floralwhite": "#FFFAF0",
        "snow": "#FFFAFA",
        "yellow": "#FFFF00",
        "lightyellow": "#FFFFE0",
        "ivory": "#FFFFF0",
        "none": "inherit"
    };
    /**
     * @description error objects
     */
    var errors = {
        invalidReadFirstArgument: {
            message: 'First argument must be type of File or Blob'
        },
        invalidFileType: {
            message: 'Invalid file type'
        },
        invalidLoadFile: {
            message: "Can't load the file"
        },
        invalidReadFile: {
            message: "Can't read the file"
        },
        requiredTechnologies: {
            message: "Not have required technologies"
        },
        invalidParseMethods: {
            message: "Not have parse method"
        },
        invalidReadZIPFile: {
            message: "Can not read file"
        },
        notFoundMethodCreateFileData: {
            message: "Method `createFileData` not found"
        }
    };
    /**
     *
     * @param file
     * @param options
     * @private
     */
    function selectEngine(file, options) {
        options = options || {};

        var engines = jDoc._engines,
            k,
            engineObj;

        // Select engine for file
        this._currentEngine = null;

        for (k in engines) {
            if (engines.hasOwnProperty(k) && typeof engines[k] === 'function') {
                engineObj = new engines[k](file);

                if (engineObj.validate()) {
                    this._currentEngine = engineObj;
                    break;
                }
            }
        }

        return this;
    }
    /**
     * @private
     * @description validators
     */
    var validators = {
        email: (/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i),
        url: (/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i)
    };
    /**
     *
     * @private
     */
    var unitRatio = {
        "pt": {
            "px": function (val) {
                var res = 0;
                if (!isNaN(val)) {
                    res = Math.round(val / 0.75);
                    if (val > 0 && res == 0) {
                        res = 1;
                    }
                }

                return res;
            }
        },
        "cm": {
            "px": function (val) {
                var res = 0;
                if (!isNaN(val)) {
                    res = Math.round(val / 0.0265);
                    if (val > 0 && res == 0) {
                        res = 1;
                    }
                }

                return res;
            }
        },
        "mm": {
            "px": function (val) {
                var res = 0;
                if (!isNaN(val)) {
                    res = Math.round((val * 1.7) / 4);
                    if (val > 0 && res == 0) {
                        res = 1;
                    }
                }

                return res;
            }
        },
        "in": {
            "px": function (val) {
                var res = 0;
                if (!isNaN(val)) {
                    res = Math.round(val * 96);
                    if (val > 0 && res == 0) {
                        res = 1;
                    }
                }

                return res;
            }
        },
        "pc": {
            "px": function (val) {
                var res = 0;
                if (!isNaN(val)) {
                    res = Math.round(val * 6);
                    if (val > 0 && res == 0) {
                        res = 1;
                    }
                }

                return res;
            }
        },
        "emu": {
            "px": function (val) {
                // 1inch = 914400 EMUs
                return unitRatio['in'].px(val / 914400);
            }
        }
    };
    /**
     *
     * @type {{}}
     */
    var $ = {
        children: function (element) {
            return element ? this.siblings(element.firstChild) : [];
        },
        css: function (el, key, val) {
            var prop;

            if (!el) {
                return el;
            }

            if (typeof key === "object") {
                for (prop in key) {
                    prop = prepareCSSProperty(prop);

                    if (vendorPrefix[prop]) {
                        addVendorPrefix(el, prop, key[prop]);
                    }

                    el.style[prop] = key[prop];
                }
            } else {
                key = prepareCSSProperty(key);

                if (vendorPrefixes[key]) {
                    addVendorPrefix(el, key, val);
                }

                el.style[key] = val;
            }

            return el;
        },
        find: function (element, tagName) {
            var i,
                childrenCount;

            if (!element || !element.childNodes || !tagName) {
                return null;
            }

            childrenCount = element.childNodes.length;

            if (!childrenCount) {
                return null;
            }

            for (i = 0; i < childrenCount; i++) {
                if (element.childNodes[i].localName == tagName || element.childNodes[i].nodeName == tagName) {
                    return element.childNodes[i];
                }
            }

            return null;
        },
        findAll: function (element, tagName) {
            var i,
                childrenCount,
                result = [];

            if (!element || !element.childNodes || !tagName) {
                return result;
            }

            childrenCount = element.childNodes.length;

            if (!childrenCount) {
                return result;
            }

            for (i = 0; i < childrenCount; i++) {
                if (element.childNodes[i].localName == tagName || element.childNodes[i].nodeName == tagName) {
                    result.push(element.childNodes[i]);
                }
            }
            return result;
        },
        siblings: function (n, elem) {
            var arr = [];

            for (; n; n = n.nextSibling) {
                if (n.nodeType === 1 && n !== elem) {
                    arr.push(n);
                }
            }

            return arr;
        }
    };
    /**
     *
     * @type {{}}
     */
    var Events = {
        off: function (name, callback, context) {
            var retain,
                ev,
                events,
                names,
                i,
                l,
                j,
                k;

            if (!this._events || !eventsAPI(this, 'off', name, [callback, context])) {
                return this;
            }

            if (!name && !callback && !context) {
                this._events = void 0;
                return this;
            }
            names = name ? [name] : Object.keys(this._events);
            l = names.length;

            for (i = 0; i < l; i++) {
                name = names[i];
                events = this._events[name];

                if (events) {
                    this._events[name] = retain = [];

                    if (callback || context) {
                        k = events.length;

                        for (j = 0; j < k; j++) {
                            ev = events[j];

                            if (
                                (
                                    callback &&
                                    callback !== ev.callback &&
                                    callback !== ev.callback._callback
                                ) || (
                                    context && context !== ev.context
                                )
                            ) {
                                retain.push(ev);
                            }
                        }
                    }
                    if (!retain.length) {
                        delete this._events[name];
                    }
                }
            }

            return this;
        },
        on: function (name, callback, context) {
            if (!eventsAPI(this, 'on', name, [callback, context]) || !callback) {
                return this;
            }
            this._events = this._events || {};
            this._events[name] = this._events[name] || [];

            this._events[name].push({
                callback: callback,
                context: context,
                ctx: context || this
            });

            return this;
        },
        once: function (name, callback, context) {
            var self = this,
                onceFn;

            if (!eventsAPI(this, 'once', name, [callback, context]) || !callback) {
                return this;
            }

            onceFn = once(function () {
                self.off(name, onceFn);
                callback.apply(this, arguments);
            });

            onceFn._callback = callback;

            return this.on(name, onceFn, context);
        },
        trigger: function (name) {
            var args;

            if (!this._events) {
                return this;
            }

            args = ArrayPrototype.slice.call(arguments, 1);

            if (!eventsAPI(this, 'trigger', name, args)) {
                return this;
            }

            if (this._events[name]) {
                triggerEvents(this._events[name], args);
            }
            if (this._events.all) {
                triggerEvents(this._events.all, arguments);
            }
            return this;
        }
    };
    //
    var jDoc = function () {
        this._currentEngine = null;
    };
    jDoc.prototype = {
        read: function (file, options) {
            options = options || {};

            this.trigger('readstart');

            var parse;

            if (!jDoc.isSupported()) {
                this.trigger('error', errors.requiredTechnologies);
                this.trigger('readend');

                return this;
            }

            if (!(file instanceof File || file instanceof Blob)) {
                this.trigger('error', errors.invalidReadFirstArgument);
                this.trigger('readend');
            } else {
                selectEngine.call(this, file, options);
            }

            if (!this._currentEngine) {
                this.trigger('error', errors.invalidFileType);
            } else {
                if (this._currentEngine.options && this._currentEngine.options.parseMethod) {
                    parse = this._currentEngine[this._currentEngine.options.parseMethod];
                } else {
                    parse = this._currentEngine.parse;
                }

                if (typeof parse === "function") {
                    this._currentEngine.once('parse', function (fileData) {
                        this.trigger('read', fileData);
                    }.bind(this));
                    this._currentEngine.once('error', function (error) {
                        this.trigger('error', error);
                    }.bind(this));
                    this._currentEngine.once('parseend', function () {
                        this.trigger('readend');
                    }.bind(this));
                    parse.call(this._currentEngine);
                } else {
                    this.trigger('error', errors.invalidParseMethods);
                }
            }

            return this;
        }
    };
    copy(jDoc.prototype, Events);
    copy(jDoc, {
        _formats: [],

        _engines: {},

        /**
         * @description
         */
        clone: clone,

        /**
         * @description
         */
        copy: copy,

        /**
         * @description
         */
        getA4DimensionCSSRules: getA4DimensionCSSRules,

        /**
         * @description This browser support required technologies for jDoc or no.
         * @returns {boolean}
         */
        isSupported: function () {
            return !!(
                localStorage &&
                window.File &&
                window.Blob &&
                window.Blob.prototype.slice &&
                window.FileReader &&
                window.ArrayBuffer &&
                window.Uint8Array &&
                window.DataView
            );
        },

        /**
         * @description
         * @param name
         * @param formats
         * @param engine
         * @returns {*}
         */
        defineEngine: function (name, formats, engine) {
            if (
                name &&
                formats &&
                engine &&
                typeof engine.prototype.validate === "function"
            ) {
                if (!Array.isArray(formats)) {
                    formats = [String(formats).toLowerCase()];
                }

                this._formats = this._formats.concat(formats);
                this._engines[name] = engine;
            }

            return this;
        },

        /**
         * @description
         * @returns {*}
         */
        getSupportedFormats: function () {
            return this._formats.slice(0);
        }

        ,
        validateEmail: function (val) {
            return validators.email.test(val);
        },
        validateURL: function (val) {
            return validators.url.test(val);
        }
    }, Events);
    var unit = {

        convert: function (params) {
            var result = 0;

            params = params || {};

            if (params.value && params.from && params.to) {
                params.from = params.from.toLowerCase();
                params.to = params.to.toLowerCase();

                if (params.from == params.to) {
                    result = params.value;
                } else if (unitRatio[params.from] && unitRatio[params.from][params.to]) {
                    result = unitRatio[params.from][params.to](params.value);
                }
            }

            return result;
        }
    };
    /**
     *
     * @param attrs
     */
    jDoc.FileData = function (attrs) {
        attrs = attrs || {};

        this._data = copy({
            name: "",
            language: "",
            wordsCount: 0,
            zoom: 100,
            pages: []
        }, attrs);

        this._clonedData = clone(this._data);
        this._htmlOptions = {};
    };

    jDoc.FileData.prototype = {
        data: function () {
            return this._clonedData;
        },
        getExtension: function () {
            return "";
        },
        getLanguage: function () {
            return this._data.language;
        },
        getName: function () {
            return this._data.name;
        },
        getPage: function (index) {
            return this._data.pages[index];
        },
        getPagesCount: function () {
            return this._data.pages.length;
        },
        getWordsCount: function () {
            return this._data.wordsCount;
        },
        getZoom: function () {
            return this._data.zoom;
        },
        html: function (options) {
            var doc = document.createDocumentFragment(),
                pages = this._data.pages,
                pagesCount = pages.length,
                elementsCount,
                i,
                p,
                pageEl;

            setHTMLOptions.call(this, options);

            for (i = 0; i < pagesCount; i++) {
                pageEl = document.createElement('div');
                pageEl.setAttribute('class', fileDataClasses.page);

                if (pages[i].dimensionCSSRules && i < pagesCount - 1 && !pages[i].dimensionCSSRules.marginBottom) {
                    pages[i].dimensionCSSRules.marginBottom = {
                        unit: "px",
                        value: 10
                    };
                }

                applyCSS.call(this, pageEl, pages[i]);
                addAttributes.call(this, pageEl, pages[i]);
                addProperties.call(this, pageEl, pages[i]);
                $.css(pageEl, "box-sizing", "border-box");

                if (pages[i].options && pages[i].options.pageNumber) {
                    buildPageNumber.call(this, pageEl, pages[i]);
                }

                elementsCount = pages[i].children.length;

                for (p = 0; p < elementsCount; p++) {
                    pageEl.appendChild(buildElement.call(this, pages[i].children[p]));
                }

                doc.appendChild(pageEl);
            }

            return doc;
        },
        isEmpty: function () {
            return !!(!this._data || !this._data.pages || !this._data.pages.length);
        },
        isTextDocument: function () {
            return !!this._data.isTextDocument;
        }
    };
    //
    jDoc.Engine = function (file) {
        var fileType = this.getFileType(file);

        if (fileType) {
            this.file = file;
            this.options.isValid = true;
            this.options.fileType = fileType;
        } else {
            this.options.isValid = false;
        }

        if (typeof this.initialize === 'function') {
            this.initialize.apply(this, arguments);
        }
    };

    jDoc.Engine.prototype = {
        options: {
            isValid: false,
            fileType: ""
        },

        errors: clone(errors),

        colorList: clone(colorList),

        fileTypeParsers: []

        ,
        _readFilesEntriesWithWorkers: function (options) {
            options = options || {};

            var entries = options.entries,
                len = entries.length,
                worker,
                results = [],
                path,
                counter = 0,
                i,
                onError = function () {
                    this.trigger('error', this.errors.invalidReadFile);
                }.bind(this);

            if (!this._workerFileForReading) {
                this._workerFileForReading = this.createWorkerFile(function () {
                    self.addEventListener('message', function (e) {
                        var data = e.data,
                            method = data.method || "readAsText",
                            filename = data.filename,
                            file = data.file;

                        var reader = new FileReaderSync();

                        if (filename && (filename.indexOf('media/') >= 0 || filename.indexOf('Pictures') >= 0)) {
                            method = "readAsDataURL";
                        }

                        self.postMessage(reader[method](file));
                    }, false);
                });
            }

            path = this._workerFileForReading;

            for (i = len - 1; i >= 0; i--) {
                worker = new Worker(path);

                (function (entry, options) {
                    worker.addEventListener('message', function (e) {
                        var data = e.data;

                        results.push(data);

                        if (options.read && typeof options.read === "function") {
                            options.read(data, entry);
                        }
                        counter++;

                        if (counter === len && options.success && typeof options.success === "function") {
                            options.success(results, entries, len);
                        }
                    }, false);

                    worker.addEventListener('error', onError, false);

                    worker.postMessage({
                        method: options.method,
                        filename: entry.entry.filename,
                        file: entry.file
                    });
                }(entries[i], options));
            }
        },
        _readFilesEntriesWithoutWorkers: function (options) {
            options = options || {};

            var entries = options.entries,
                len = entries.length,
                counter = 0,
                results = [],
                readerMethod = options.method || "readAsText",
                i;

            for (i = len - 1; i >= 0; i--) {
                (function (entry, method, read, success) {
                    var reader = new FileReader(),
                        filename = entries[i].entry.filename,
                        file = entries[i].file;

                    reader.addEventListener('load', function (e) {
                        var data = e.target.result;
                        results.push(data);

                        if (read && typeof read === "function") {
                            read(data, entry);
                        }
                        counter++;

                        if (counter === len && success && typeof success === "function") {
                            success(results, entries, len);
                        }
                    }, false);
                    reader.addEventListener('error', options.error, false);

                    if (filename.indexOf('media/') >= 0 || filename.indexOf('Pictures') >= 0) {
                        method = "readAsDataURL";
                    }

                    reader[method](file);
                }(entries[i], readerMethod, options.read, options.success));
            }
        },
        attributeToBoolean: function (attribute) {
            return ( !! attribute && (attribute.value == 'true' || attribute.value == '1' || attribute.value == 'on'));
        },
        calculateElementHeight: function (options) {
            options = options || {};

            var lineHeight = options.lineHeight || 1,
                parentFontSize = options.parentFontSize || 1,
                len = options.el.textContent ? options.el.textContent.length : 0,
                height = (
                    (len * options.fontSize) / options.width
                ) * (
                    (
                        options.fontSize > parentFontSize ? options.fontSize : parentFontSize
                    ) * lineHeight
                );

            return isNaN(height) ? 0 : Math.round(height);
        },
        createWorkerFile: function (workerFunction) {
            var functionBody = workerFunction.toString().replace(/\s*function[^\{]+\{\s*/, '').replace(/\s*\}\s*$/, '');

            return URL.createObjectURL(new Blob([functionBody], {
                type: 'text/javascript'
            }));
        },
        cropUnit: function (value) {
            value = +(String(value).replace(/,/g, '.').replace(/[^0-9.]+/g, ''));
            return !isNaN(value) ? value : 0;
        },
        getCharFromHex: function (hex) {
            var code = parseInt(hex, 16);
            return !isNaN(code) ? String.fromCharCode(code) : "";
        },
        getEmDash: function () {
            return "—";
        },
        getEnDash: function () {
            return "–";
        },
        getFileName: function () {
            return (this.file && this.file.name) || "";
        },
        getFileType: function (file) {
            var result = null,
                fileExtensions,
                mimeTypes,
                fileNameData = String(file.name).split('.'),
                parsers = Array.isArray(this.fileTypeParsers) ? this.fileTypeParsers : [],
                fileTypesCount = parsers.length,
                len = fileNameData.length,
                extension,
                e,
                found = false,
                i;

            extension = len > 1 ? fileNameData[len - 1] : '';

            for (i = 0; i < fileTypesCount; i++) {
                mimeTypes = parsers[i].mime;
                if (!(mimeTypes instanceof Array)) {
                    mimeTypes = [mimeTypes];
                }

                for (e = mimeTypes.length - 1; e >= 0; e--) {
                    if (file.type.indexOf(mimeTypes[e]) >= 0) {
                        found = true;
                        break;
                    }
                }

                // if not found by mime type find by file extension
                if (!found) {
                    fileExtensions = parsers[i].extension;

                    if (!Array.isArray(fileExtensions)) {
                        fileExtensions = [fileExtensions];
                    }

                    for (e = fileExtensions.length - 1; e >= 0; e--) {
                        if (extension.indexOf(fileExtensions[e]) >= 0) {
                            found = true;
                            break;
                        }
                    }
                }

                if (found) {
                    result = parsers[i];
                    break;
                }
            }

            return result;
        },
        getHalfTabAsSpaces: function () {
            return "\u2000\u2000";
        },
        getMaxEntriesCountForWebWorker: function () {
            return 40;
        },
        getMaxFontSize: function (element) {
            var i,
                len = element.children ? element.children.length : 0,
                fontSize = (
                    element.dimensionCSSRules.fontSize && element.dimensionCSSRules.fontSize.value
                ) || 0;

            for (i = len - 1; i >= 0; i--) {
                if (element.children[i].dimensionCSSRules.fontSize && element.children[i].dimensionCSSRules.fontSize.value > fontSize) {
                    fontSize = element.children[i].dimensionCSSRules.fontSize.value;
                }
            }

            return fontSize;
        },
        getNonbreakingSpace: function () {
            return "\u00A0";
        },
        getTabAsSpaces: function () {
            var halfTab = this.getHalfTabAsSpaces();

            return halfTab + halfTab;
        },
        getWordsCountInText: function (text) {
            var words = (text || "").split(/\s+/),
                len = words.length,
                i,
                wordsCount = 0;

            for (i = len - 1; i >= 0; i--) {
                wordsCount += (words[i].length > 1);
            }

            return wordsCount;
        },
        normalizeColorValue: function (value) {
            var colorList = this.colorList,
                defaultColor = colorList.black;

            if (!value || typeof value !== 'string') {
                return defaultColor;
            }

            value = value.replace(/\s+/g, '');
            if (/^#/.test(value)) {
                return value.toUpperCase();
            }

            if (!isNaN(+("0" + "x" + value))) {
                return "#" + value.toUpperCase();
            }

            value = value.toLowerCase();

            return colorList[value] || defaultColor;
        },
        normalizeDataURI: function (dataURI, filename) {
            return dataURI.replace(/data:[^;]*;/, 'data:' + getMimeTypeByName(filename) + ';');
        },
        normalizeDate: function (str) {
            var date = "",
                data;

            if (str) {
                // yyyy-mm-dd
                if ((/^[0-9]{4}-(0[1-9]|1[0-2])-([0-2][0-9]|3[01])$/).test(str)) {
                    data = str.split("-");
                    date = data[2] + "." + data[1] + "." + data[0];
                }
            }

            return date;
        },
        normalizeEncodingValue: function (value) {
            var result = "utf-8";

            if (value) {
                value = value.toLowerCase();

                if (value == "windows-1251") {
                    result = "cp1251";
                }
            }

            return result;
        },
        normalizeVerticalAlign: function (value) {
            var result = "baseline";

            value = String(value).toLowerCase();

            if (value == "superscript") {
                result = "top";
            } else if (value == "subscript") {
                result = "bottom";
            }

            return result;
        },
        parseFromArchive: function () {
            var errors = this.errors;

            this.trigger('parsefromarchivestart');

            if (!this.validate()) {
                this.trigger('error', errors.invalidFileType);
                this.trigger('parsefromarchiveend');
                return false;
            }

            this.readFilesFromZIP({
                success: function (fileEntries) {
                    this.createFileData(fileEntries, function (fileData) {
                        this.trigger('parsefromarchive', fileData);
                        this.trigger('parsefromarchiveend');
                    }.bind(this));
                }.bind(this),
                error: function () {
                    this.trigger('error', errors.invalidReadZIPFile);
                    this.trigger('parsefromarchiveend');
                }.bind(this)
            });

            return null;
        },
        parseFromSimpleFile: function () {
            this.trigger('parsefromsimplefilestart');

            if (!this.validate()) {
                this.trigger('error', this.errors.invalidFileType);
                this.trigger('parsefromsimplefileend');

                return null;
            }

            this.readFilesEntries({
                error: function () {
                    this.trigger('error', this.errors.invalidFileType);
                    this.trigger('parsefromsimplefileend');
                }.bind(this),
                entries: [{
                    file: this.file,
                    entry: {}
                }],
                read: function (result) {
                    if (typeof this.createFileData !== 'function') {
                        this.trigger('error', this.errors.notFoundMethodCreateFileData);
                        return;
                    }

                    this.createFileData(result, function (fileData) {
                        this.trigger('parsefromsimplefile', fileData);
                        this.trigger('parsefromsimplefileend');
                    }.bind(this));
                }.bind(this)
            });

            return null;
        },
        readFilesEntries: function (options) {
            options = options || {};

            /**
             * @description 1. IE does not support creating files for worker "on the fly".
             * @description 2. Memory leak when using WebWorkers
             * @description https://code.google.com/p/chromium/issues/detail?id=39653
             * @description https://code.google.com/p/chromium/issues/detail?id=263289
             */
            if (Worker && URL && !browser.isMSIE() && options.entries && options.entries.length <= this.getMaxEntriesCountForWebWorker()) {
                return this._readFilesEntriesWithWorkers(options);
            }

            return this._readFilesEntriesWithoutWorkers(options);
        },
        readFilesFromZIP: function (options) {
            var fileEntries = [];

            options = options || {};

            zipEngine.read({
                file: this.file,
                success: function (entries) {
                    var counter = 0,
                        entriesCount = entries.length,
                        i;

                    for (i = 0; i < entriesCount; i++) {
                        zipEngine.readEntry({
                            entry: entries[i],
                            type: "Blob",
                            success: function (entryObject, file, blobURL) {
                                if (file) {
                                    fileEntries.push({
                                        entry: entryObject,
                                        file: file,
                                        blobURL: blobURL
                                    });
                                }

                                counter++;

                                // If all files was processed - run parser
                                if (counter == entriesCount) {
                                    if (typeof options.success === 'function') {
                                        options.success(fileEntries);
                                    }
                                    return null;
                                }

                                return null;
                            }
                        });
                    }
                },
                error: function () {
                    if (typeof options.error === 'function') {
                        options.error();
                    }
                }
            });
        },
        replaceAttributeNamespace: function (attributeName) {
            return attributeName ? attributeName.replace(/^[0-9a-zA-Z-_]+:/, '') : "";
        },
        replaceSpaces: function (str) {
            str = (str || "").replace(/\s{2}/g, this.getHalfTabAsSpaces());
            return str;
        },
        spotElementHeight: function (options) {
            options = options || {};

            var lineHeight = options.lineHeight || 1,
                parentFontSize = options.parentFontSize || 1,
                len = options.el.textContent ? options.el.textContent.length : 0,
                height = (
                    (len * options.fontSize) / options.width
                ) * (
                    (
                        options.fontSize > parentFontSize ? options.fontSize : parentFontSize
                    ) * lineHeight
                );

            return isNaN(height) ? 0 : Math.round(height);
        },
        isChartDocument: function () {
            return !!(this.options.fileType && this.options.fileType.isChartDocument);
        },
        isFormulaDocument: function () {
            return !!(this.options.fileType && this.options.fileType.isFormulaDocument);
        },
        isGraphicDocument: function () {
            return !!(this.options.fileType && this.options.fileType.isGraphicDocument);
        },
        isImageDocument: function () {
            return !!(this.options.fileType && this.options.fileType.isImageDocument);
        },
        isPresentationDocument: function () {
            return !!(this.options.fileType && this.options.fileType.isPresentationDocument);
        },
        isSpreadsheetDocument: function () {
            return !!(this.options.fileType && this.options.fileType.isSpreadsheetDocument);
        },
        isTemplate: function () {
            return !!(this.options.fileType && this.options.fileType.isTemplate);
        },
        isTextDocument: function () {
            return !!(this.options.fileType && this.options.fileType.isTextDocument);
        },
        isTextDocumentMaster: function () {
            return (this.options.fileType && !! this.options.fileType.isTextDocumentMaster);
        },
        isTextDocumentMasterWeb: function () {
            return (this.options.fileType && !! this.options.fileType.isTextDocumentMasterWeb);
        },
        validate: function () {
            return !!this.options.isValid;
        }
    };

    copy(jDoc.Engine.prototype, Events);

    /**
     * @description Extend function
     * @param props
     * @return {Object}
     */
    jDoc.Engine.extend = function (props) {
        var Child = function () {},
            F = function () {},
            prop,
            self = this;

        if (this && this.hasOwnProperty('constructor')) {
            Child = this.constructor;
        } else {
            Child = function () {
                self.apply(this, arguments);
            };
        }

        F.prototype = this.prototype;
        Child.prototype = new F();
        Child.prototype.constructor = Child;

        /**
         * Set properties
         */
        for (prop in props) {
            if (props.hasOwnProperty(prop)) {
                if (prop === "options") {
                    Child.prototype[prop] = copy({}, Child.prototype[prop], props[prop]);
                } else if (Array.isArray(props[prop])) {
                    Child.prototype[prop] = props[prop].slice(0);
                } else {
                    Child.prototype[prop] = props[prop];
                }
            }
        }
        return Child;
    };
    /**
     *
     * @description Delimiter-separated values. Delimiters: comma, tab
     * @type {Object}
     */
    var DSV = jDoc.Engine.extend(
        /** @lends DSV.prototype */
        {
            createFileData: function (text, callback) {
                var delimiterType = this.options.fileType.delimiterType || "comma",
                    delimiterMask,
                    delimiter = "",
                    escapedDelimiterKey = "DSV_DELIMITER_ESCAPED",
                    escapedCommaMask = (/".*(,).*"/g),
                    escapedCommaPart,
                    escapedCommaPartModified,
                    result = {
                        options: {
                            isTable: true
                        },
                        children: [],
                        attributes: {},
                        dimensionCSSRules: {},
                        css: {}
                    },
                    el,
                    i,
                    j,
                    length,
                    len,
                    rows,
                    cells;

                if (delimiterType === "comma") {
                    delimiterMask = /,/;
                    delimiter = ",";

                    escapedCommaPart = escapedCommaMask.exec(text);

                    while (escapedCommaPart && escapedCommaPart[0] && escapedCommaPart[1]) {
                        escapedCommaPartModified = escapedCommaPart[0].replace(/,/g, escapedDelimiterKey);
                        text = text.replace(escapedCommaPart[0], escapedCommaPartModified);

                        escapedCommaPart = escapedCommaMask.exec(text);
                    }
                } else if (delimiterType === 'tab') {
                    delimiterMask = /\t/;
                    delimiter = this._getTabAsSpaces();
                }

                rows = text.split(/\n+/);
                cells = rows[0].split(delimiterMask);
                len = cells.length;

                if (len) {
                    el = {
                        options: {
                            isHeader: true
                        },
                        children: [{
                            children: []
                        }]
                    };
                    result.children.push(el);
                }

                for (i = 0; i < len; i++) {
                    el.children[0].children[i] = {
                        css: {},
                        dimensionCSSRules: {},
                        options: {},
                        children: [{
                            options: {},
                            properties: {
                                textContent: cells[i].replace(/DSV_DELIMITER_ESCAPED/g, delimiter)
                            }
                        }]
                    };
                }

                length = rows.length;

                if (length) {
                    el = {
                        options: {},
                        children: []
                    };
                    result.children.push(el);
                }

                for (j = 1; j < length; j++) {
                    cells = rows[j].split(delimiterMask);
                    len = cells.length;
                    el.children[j - 1] = {
                        children: [],
                        css: {},
                        options: {},
                        dimensionCSSRules: {}
                    };

                    for (i = 0; i < len; i++) {
                        el.children[j - 1].children[i] = {
                            css: {},
                            dimensionCSSRules: {},
                            options: {},
                            children: [{
                                options: {},
                                properties: {
                                    textContent: cells[i].replace(/DSV_DELIMITER_ESCAPED/g, delimiter)
                                }
                            }]
                        };
                    }
                }

                if (typeof callback === 'function') {
                    callback.call(
                        this,
                        new jDoc.FileData({
                            name: this.getFileName(),
                            pages: [{
                                options: {},
                                css: {},
                                children: [result]
                            }]
                        })
                    );
                }
            },
            fileTypeParsers: [{
                extension: ['csv'],
                mime: ['text/csv'],
                delimiterType: "comma",
                isTextDocument: true
            }, {
                extension: ['tsv', 'tab'],
                mime: ['text/tab-separated-values'],
                delimiterType: "tab",
                isTextDocument: true
            }],
            initialize: function () {
                this.on('parsefromsimplefilestart', function () {
                    this.trigger('parsestart');
                }.bind(this));
                this.on('parsefromsimplefile', function (fileData) {
                    this.trigger('parse', fileData);
                }.bind(this));
                this.on('parsefromsimplefileend', function () {
                    this.trigger('parseend');
                }.bind(this));
            },
            options: {
                parseMethod: "parseFromSimpleFile"
            }
        }
    );

    jDoc.defineEngine('DSV', [
        'text/csv',
        'text/tab-separated-values'
    ], DSV);
    /**
     *
     * @type {Object}
     */
    var FictionBook = jDoc.Engine.extend(
        /** @lends FictionBook.prototype */
        {
            _getPersonInfo: function (xml) {
                var i,
                    nodes = $.children(xml),
                    len = nodes.length,
                    info = {};

                for (i = len - 1; i >= 0; i--) {
                    // firstName, middleName, lastName
                    if (nodes[i].localName) {
                        info[nodes[i].localName.replace(/-\w+$/, '') + "Name"] = nodes[i].textContent || "";
                    }
                }

                return info;
            },
            _normalizeEncodingValue: function (value) {
                var result = "utf-8";

                if (value) {
                    result = value.replace(/^windows-/i, 'cp');
                }

                return result;
            },
            _parseBinaryItems: function (nodes) {
                var result = {},
                    i;

                for (i = nodes.length - 1; i >= 0; i--) {
                    if (
                        nodes[i].attributes.id &&
                        nodes[i].attributes.id.value &&
                        nodes[i].attributes["content-type"] &&
                        nodes[i].attributes["content-type"].value &&
                        nodes[i].textContent
                    ) {
                        result[nodes[i].attributes.id.value] =
                            "data:" + nodes[i].attributes["content-type"].value + ";base64," + nodes[i].textContent;
                    }
                }

                return result;
            },
            _parseBlockElement: function (options) {
                var result,
                    node = options.node;

                switch (node.localName) {
                case "p":
                    result = this._parseParagraph({
                        node: node,
                        documentData: options.documentData
                    });
                    break;
                case "empty-line":
                    result = {
                        options: {
                            isEmptyLine: true
                        }
                    };
                    break;
                case "subtitle":
                    result = this._parseParagraph({
                        node: node,
                        documentData: options.documentData
                    });
                    result.css.textAlign = "center";
                    break;
                case "image":
                    result = this._prepareImage({
                        node: node,
                        documentData: options.documentData
                    });
                    break;
                default:
                    result = this._prepareBlock(node, options.documentData);
                }

                return result;
            },
            _parseDocumentInfo: function (xml, documentData) {
                var nodes = $.children(xml),
                    len = nodes.length,
                    i,
                    j,
                    length,
                    arr,
                    tmp,
                    info = {
                        isTextDocument: true,
                        programs: []
                    };

                for (i = len - 1; i >= 0; i--) {
                    switch (nodes[i].localName) {
                    case "author":
                        info.author = this._getPersonInfo(nodes[i]);
                        break;
                    case "src-url":
                        info.sourceURL = nodes[i].textContent || "";
                        break;
                    case "id":
                        info.id = nodes[i].textContent || "";
                        break;
                    case "version":
                        info.version = nodes[i].textContent || "";
                        break;
                    case "history":
                        info.history = this._prepareBlock(nodes[i], documentData);
                        break;
                    case "date":
                        arr = (nodes[i].textContent || "").split("-");
                        tmp = arr[0];
                        arr[0] = arr[2];
                        arr[2] = tmp;
                        info.date = arr.join('.');
                        break;
                    case "program-used":
                        arr = (nodes[i].textContent || "").split(",");
                        length = arr.length;

                        for (j = length - 1; j >= 0; j--) {
                            info.programs[j] = arr[j].replace(/^\s+/, '');
                        }
                        break;
                    }
                }

                return info;
            },
            _parseFileHelper: function (text) {
                var domParser = new DOMParser();

                this.createFileData(domParser.parseFromString(text, "application/xml"), function (fileData) {
                    this.trigger('parse', fileData);
                    this.trigger('parseend');
                });
            },
            _parseFileInfo: function (xml, documentData) {
                var info = {},
                    nodes = $.children(xml),
                    len = nodes.length,
                    i;

                for (i = len - 1; i >= 0; i--) {
                    switch (nodes[i].localName) {
                    case "genre":
                        info.genre = nodes[i].textContent || "";
                        break;
                    case "book-title":
                        info.title = nodes[i].textContent || "";
                        break;
                    case "lang":
                        info.language = nodes[i].textContent || "";
                        break;
                    case "src-lang":
                        info.sourceLanguage = nodes[i].textContent || "";
                        break;
                    case "author":
                        info.author = this._getPersonInfo(nodes[i]);
                        break;
                    case "translator":
                        info.translator = this._getPersonInfo(nodes[i]);
                        break;
                    case "annotation":
                        info.annotation = this._prepareBlock(nodes[i], documentData);
                        break;
                    case "date":
                        info.date = nodes[i].textContent || "";
                        break;
                    case "coverpage":
                        var imageNode = nodes[i].querySelector('image');
                        info.coverpage = {
                            image: imageNode.attributes['l:href'] ? (imageNode.attributes['l:href'].value || "").replace("#", '') : ""
                        };
                        break;
                    case "sequence":
                        info.sequence = {
                            name: nodes[i].attributes.name ? nodes[i].attributes.name.value || "" : "",
                            number: nodes[i].attributes.number ? (
                                isNaN(nodes[i].attributes.number.value) ? 0 : +nodes[i].attributes.number.value
                            ) : 0
                        };
                        break;
                    }
                }

                return info;
            },
            _parseLinkElement: function (node) {
                var result = {
                    options: {
                        isLink: true
                    },
                    attributes: {},
                    properties: {
                        textContent: ""
                    },
                    css: {},
                    dimensionCSSRules: {}
                },
                    link = (
                        node.attributes['l:href'] && node.attributes['l:href'].value
                    ) ? node.attributes['l:href'].value : "";

                result.attributes.href = link;

                if (!(/^#/).test(link)) {
                    result.attributes.target = '_blank';
                }

                result.properties.textContent = node.textContent;

                return result;
            },
            _parsePages: function (xml, documentData, list) {
                var i,
                    nodes = $.children(xml),
                    len = nodes.length,
                    childElement;

                for (i = 0; i < len; i++) {
                    if (nodes[i].localName === "title") {
                        list.push(this._prepareBlock(nodes[i], documentData));
                    } else if (nodes[i].localName === "section") {
                        this._parsePages(nodes[i], documentData, list);
                    } else if (nodes[i].localName) {
                        list.push(
                            this._parseBlockElement({
                                node: nodes[i],
                                documentData: documentData
                            })
                        );
                    }
                }

                if (xml.attributes.id && xml.attributes.id.value) {
                    childElement = document.createElement('a');
                    childElement.setAttribute("name", xml.attributes.id.value);
                    list[list.length - 1].appendChild(childElement);
                }
            },
            _parseParagraph: function (params) {
                var node = params.node,
                    children = $.children(node),
                    len = children.length,
                    i,
                    element,
                    result = {
                        params: {
                            isParagraph: true
                        },
                        css: {},
                        dimensionCSSRules: {
                            margin: {
                                value: 0,
                                unit: "px"
                            },
                            padding: {
                                value: 0,
                                unit: "px"
                            }
                        },
                        children: []
                    };

                for (i = 0; i < len; i++) {
                    if (children[i].localName === "a") {
                        result.children.push(this._parseLinkElement(children[i]));
                    } else {
                        element = {
                            params: {},
                            css: {},
                            attributes: {},
                            properties: {
                                textContent: children[i].textContent
                            }
                        };

                        if (children[i].localName === "strong") {
                            element.css.fontWeight = "bold";
                        } else if (children[i].localName === "emphasis") {
                            element.css.fontStyle = "italic";
                        }

                        result.children.push(element);
                    }
                }

                if (!len && node.textContent) {
                    result.children.push({
                        params: {},
                        css: {},
                        attributes: {},
                        properties: {
                            textContent: node.textContent
                        }
                    });
                }

                return result;
            },
            _parsePublishInfo: function (xml) {
                var nodes = $.children(xml),
                    i,
                    len = nodes.length,
                    info = {};

                for (i = len - 1; i >= 0; i--) {
                    info[nodes[i].localName] = nodes[i].textContent || "";
                }

                return info;
            },
            _prepareBlock: function (xml, documentData) {
                var i,
                    nodes = $.children(xml),
                    len = nodes.length,
                    result = {
                        options: {},
                        css: {},
                        dimensionCSSRules: {},
                        children: []
                    };

                for (i = 0; i < len; i++) {
                    if (nodes[i].localName) {
                        result.children.push(this._parseBlockElement({
                            node: nodes[i],
                            documentData: documentData
                        }));
                    }
                }

                return result;
            },
            _prepareImage: function (options) {
                options = options || {};

                var result = {
                    options: {
                        isImage: true
                    },
                    css: {},
                    dimensionCSSRules: {},
                    attributes: {
                        src: "",
                        alt: ""
                    }
                },
                    node = options.node;

                if (!options.imageName &&
                    node &&
                    node.attributes['l:href'] &&
                    node.attributes['l:href'].value
                ) {
                    result.attributes.src = options.documentData.binaryItems[
                        node.attributes['l:href'].value.replace("#", '')
                    ] || result.attributes.src;
                } else {
                    result.attributes.src = options.documentData.binaryItems[options.imageName] || result.attributes.src;
                }

                return result;
            },
            createFileData: function (xml, callback) {
                var nodes,
                    i,
                    len,
                    documentData = {
                        binaryItems: this._parseBinaryItems(xml.querySelectorAll('binary'))
                    },
                    result = {
                        name: this.getFileName(),
                        pages: [{
                            options: {},
                            css: {},
                            dimensionCSSRules: {},
                            children: []
                        }]
                    };

                nodes = $.children(xml.querySelector('FictionBook'));
                len = nodes.length;

                for (i = 0; i < len; i++) {
                    switch (nodes[i].localName) {
                    case "description":
                        var descriptionNode = xml.querySelector('description');

                        documentData.publishInfo = this._parsePublishInfo(descriptionNode.querySelector('publish-info'));
                        documentData.fileInfo = this._parseFileInfo(descriptionNode.querySelector('title-info'), documentData);
                        documentData.documentInfo = this._parseDocumentInfo(descriptionNode.querySelector('document-info'), documentData);

                        if (documentData.fileInfo.annotation) {
                            result.pages[0].children.push(documentData.fileInfo.annotation);
                        }

                        if (
                            documentData.fileInfo.coverpage &&
                            documentData.binaryItems[documentData.fileInfo.coverpage.image]
                        ) {
                            result.pages[0].children.push({
                                options: {},
                                children: [
                                    this._prepareImage({
                                        documentData: documentData,
                                        imageName: documentData.fileInfo.coverpage.image
                                    })
                                ]
                            });
                        }
                        break;
                    case "body":
                        this._parsePages(nodes[i], documentData, result.pages[0].children);
                        break;
                    }
                }

                if (typeof callback === 'function') {
                    callback.call(this, new jDoc.FileData(result));
                }
            },
            fileTypeParsers: [{
                extension: ['fb2'],
                mime: ["application/x-fictionbook+xml"],
                isTextDocument: true
            }],
            parse: function () {
                var fileEntries;

                this.trigger('parsestart');

                if (!this.validate()) {
                    this.trigger('error', errors.invalidFileType);
                    this.trigger('parseend');
                    return;
                }

                fileEntries = [{
                    file: this.file,
                    entry: {}
                }];

                this.readFilesEntries({
                    entries: fileEntries,
                    error: function () {
                        this.trigger('error', errors.invalidReadFile);
                        this.trigger('parseend');
                    }.bind(this),
                    read: function (result) {
                        var encoding = (/encoding="(.+)"/).exec(result),
                            defaultEncoding = "utf-8";

                        encoding = encoding ? this._normalizeEncodingValue(encoding[1]) : defaultEncoding;

                        if (encoding != defaultEncoding) {
                            this.readFilesEntries({
                                encoding: encoding,
                                entries: fileEntries,
                                error: function () {
                                    this.trigger('error', errors.invalidReadFile);
                                    this.trigger('parseend');
                                }.bind(this),
                                read: function (result) {
                                    this._parseFileHelper(result);
                                }.bind(this)
                            });
                        } else {
                            this._parseFileHelper(result);
                        }
                    }.bind(this)
                });

                return null;
            }
        }
    );

    jDoc.defineEngine('FictionBook', ['text/xml'], FictionBook);
    /**
     *
     * @type {Object}
     */
    var ImageEngine = jDoc.Engine.extend(
        /** @lends ImageEngine.prototype */
        {
            _parseImageFile: function () {
                this.trigger('parsestart');

                if (!this.validate()) {
                    this.trigger('error', this.errors.invalidFileType);
                    this.trigger('parseeend');

                    return null;
                }

                this.readFilesEntries({
                    method: "readAsDataURL",
                    error: function () {
                        this.trigger('error', this.errors.invalidFileType);
                        this.trigger('parseend');
                    }.bind(this),
                    entries: [{
                        file: this.file,
                        entry: {}
                    }],
                    read: function (result) {
                        if (typeof this.createFileData !== 'function') {
                            this.trigger('error', this.errors.notFoundMethodCreateFileData);
                            return;
                        }

                        this.createFileData(result, function (fileData) {
                            this.trigger('parse', fileData);
                            this.trigger('parseend');
                        }.bind(this));
                    }.bind(this)
                });

                return null;
            },
            createFileData: function (data, callback) {
                if (typeof callback === 'function') {
                    callback(
                        new jDoc.FileData({
                            name: this.getFileName(),
                            pages: [{
                                options: {},
                                css: {},
                                children: [{
                                    options: {
                                        isImage: true
                                    },
                                    css: {},
                                    properties: {
                                        src: data
                                    }
                                }]
                            }]
                        })
                    );
                }
            },
            fileTypeParsers: [{
                extension: [],
                mime: [
                    "image/gif",
                    "image/jpg",
                    "image/jpeg",
                    "image/pjpeg",
                    "image/png",
                    "image/svg+xml",
                    "image/tiff",
                    "image/vnd.microsoft.icon",
                    "image/vnd.wap.wbmp"
                ],
                isTextDocument: false
            }],
            options: {
                parseMethod: "_parseImageFile"
            }
        }
    );

    jDoc.defineEngine('Image', [
        "image/gif",
        "image/jpg",
        "image/jpeg",
        "image/pjpeg",
        "image/png",
        "image/svg+xml",
        "image/tiff",
        "image/vnd.microsoft.icon",
        "image/vnd.wap.wbmp"
    ], ImageEngine);
    /**
     *
     * @type {Object}
     */
    var ODF = jDoc.Engine.extend(
        /** @lends ODF.prototype */
        {
            _createPage: function (params) {
                var data = {
                    options: {},
                    css: {},
                    dimensionCSSRules: {},
                    children: []
                };

                params = params || {};

                if (params.layout) {
                    data = copy({}, data, params.layout.page);
                }

                return data;
            },
            _getListStyleType: function (value) {
                var result;

                switch (value) {
                case "1":
                    result = "decimal";
                    break;
                case "i":
                    result = "lower-roman";
                    break;
                case "I":
                    result = "upper-roman";
                    break;
                case "a":
                    result = "lower-alpha";
                    break;
                case "A":
                    result = "upper-alpha";
                    break;
                default:
                    result = "auto";
                }

                return result;
            },
            _getSize: function (val) {
                var result = {
                    value: 0,
                    unit: ""
                },
                    data = (/^([0-9]*[0-9][0-9]*(?:\.[0-9]*)?|0+\.[0-9]*[1-9][0-9]*|\.[0-9]*[1-9][0-9]*)((cm)|(mm)|(in)|(pt)|(pc)|(px))$/).exec(val);

                if (data) {
                    if (data[1] && data[2]) {
                        result.value = isNaN(data[1]) ? 0 : +data[1];
                        result.unit = data[2] ? String(data[2]).toLowerCase() : "";
                    }
                } else {
                    data = (/^-?([0-9]+(?:\.[0-9]*)?|\.[0-9]+)(%)$/).exec(val);
                    if (data && data[1] && data[2]) {
                        result.value = isNaN(data[1]) ? 0 : +data[1];
                        result.unit = data[2] ? String(data[2] || "").toLowerCase() : "";
                    }
                }

                return result;
            },
            _getStyleRules: function (params) {
                var result = {},
                    i;

                for (i = params.children.length - 1; i >= 0; i--) {
                    if (params.children[i]) {
                        result[params.children[i]] = {
                            css: {},
                            dimensionCSSRules: {}
                        };

                        if (params.documentData.styles && params.documentData.styles.defaults) {

                            if (params.documentData.styles.defaults[params.children[i]]) {
                                result[params.children[i]].css =
                                    clone(params.documentData.styles.defaults[params.children[i]].css);
                                result[params.children[i]].dimensionCSSRules =
                                    clone(params.documentData.styles.defaults[params.children[i]].dimensionCSSRules);
                            }

                            if (
                                params.documentData.styles.defaults.named &&
                                params.documentData.styles.defaults.named[params.styleName]
                            ) {
                                if (params.documentData.styles.defaults.named[params.styleName][params.children[i]]) {
                                    copy(
                                        result[params.children[i]].css,
                                        params.documentData.styles.defaults.named[params.styleName][params.children[i]].css
                                    );
                                    copy(
                                        result[params.children[i]].dimensionCSSRules,
                                        params.documentData.styles.defaults.named[params.styleName][params.children[i]].dimensionCSSRules
                                    );
                                }
                            }
                        }

                        if (params.styles) {
                            if (params.styles[params.children[i]]) {
                                copy(result[params.children[i]].css, params.styles[params.children[i]].css);
                                copy(
                                    result[params.children[i]].dimensionCSSRules,
                                    params.styles[params.children[i]].dimensionCSSRules
                                );
                            }

                            if (params.styles.named && params.styles.named[params.styleName]) {
                                if (params.styles.named[params.styleName][params.children[i]]) {
                                    copy(
                                        result[params.children[i]].css,
                                        params.styles.named[params.styleName][params.children[i]].css
                                    );
                                    copy(
                                        result[params.children[i]].dimensionCSSRules,
                                        params.styles.named[params.styleName][params.children[i]].dimensionCSSRules
                                    );
                                }
                            }
                        }
                    }
                }

                return result;
            },
            _parseBorderStyle: function (str) {
                var result = {
                    width: {},
                    style: "none",
                    color: "none"
                },
                    data,
                    size;

                if (str && str !== "none") {
                    data = str.split(' ');

                    if (data[0] && data[1] && data[2]) {
                        size = this._getSize(data[0]);

                        if (size.unit) {
                            result.width = size;
                        }

                        result.style = data[1];
                        result.color = this.normalizeColorValue(data[2]);
                    }
                }

                return result;
            },
            _parsePageLayoutStyles: function (node) {
                var result = {
                    page: {
                        css: {},
                        dimensionCSSRules: {},
                        options: {
                            isLandscapeOrientation: false
                        }
                    },
                    footnote: {
                        css: {},
                        dimensionCSSRules: {},
                        options: {}
                    },
                    footer: {
                        css: {},
                        dimensionCSSRules: {},
                        options: {}
                    },
                    header: {
                        css: {},
                        dimensionCSSRules: {},
                        options: {}
                    }
                },
                    i,
                    nodes = $.children(node),
                    length = nodes.length,
                    size = {},
                    childNodes,
                    len,
                    j;

                for (i = 0; i < length; i++) {
                    if (nodes[i].localName === "page-layout-properties") {

                        if (nodes[i].attributes['fo:page-width'] && nodes[i].attributes['fo:page-width'].value) {
                            size = this._getSize(nodes[i].attributes['fo:page-width'].value);
                            if (size.unit) {
                                result.page.dimensionCSSRules.width = size;
                            }
                        }
                        if (nodes[i].attributes['fo:page-height'] && nodes[i].attributes['fo:page-height'].value) {
                            size = this._getSize(nodes[i].attributes['fo:page-height'].value);
                            if (size.unit) {
                                result.page.dimensionCSSRules.height = size;
                            }
                        }
                        if (nodes[i].attributes['fo:margin'] && nodes[i].attributes['fo:margin'].value) {
                            size = this._getSize(nodes[i].attributes['fo:margin'].value);
                            if (size.unit) {
                                result.page.dimensionCSSRules.padding = size;
                            }
                        }
                        if (nodes[i].attributes['fo:margin-top'] && nodes[i].attributes['fo:margin-top'].value) {
                            size = this._getSize(nodes[i].attributes['fo:margin-top'].value);
                            if (size.unit) {
                                result.page.dimensionCSSRules.paddingTop = size;
                            }
                        }
                        if (nodes[i].attributes['fo:margin-left'] && nodes[i].attributes['fo:margin-left'].value) {
                            size = this._getSize(nodes[i].attributes['fo:margin-left'].value);
                            if (size.unit) {
                                result.page.dimensionCSSRules.paddingLeft = size;
                            }
                        }
                        if (nodes[i].attributes['fo:margin-right'] && nodes[i].attributes['fo:margin-right'].value) {
                            size = this._getSize(nodes[i].attributes['fo:margin-right'].value);
                            if (size.unit) {
                                result.page.dimensionCSSRules.paddingRight = size;
                            }
                        }
                        if (nodes[i].attributes['fo:margin-bottom'] && nodes[i].attributes['fo:margin-bottom'].value) {
                            size = this._getSize(nodes[i].attributes['fo:margin-bottom'].value);
                            if (size.unit) {
                                result.page.dimensionCSSRules.paddingBottom = size;
                            }
                        }
                        if (nodes[i].attributes['fo:padding'] && nodes[i].attributes['fo:padding'].value) {
                            size = this._getSize(nodes[i].attributes['fo:padding'].value);
                            if (size.unit) {
                                result.page.dimensionCSSRules.padding = size;
                            }
                        }
                        if (nodes[i].attributes['fo:padding-top'] && nodes[i].attributes['fo:padding-top'].value) {
                            size = this._getSize(nodes[i].attributes['fo:padding-top'].value);
                            if (size.unit) {
                                result.page.dimensionCSSRules.paddingTop = size;
                            }
                        }
                        if (nodes[i].attributes['fo:padding-left'] && nodes[i].attributes['fo:padding-left'].value) {
                            size = this._getSize(nodes[i].attributes['fo:padding-left'].value);
                            if (size.unit) {
                                result.page.dimensionCSSRules.paddingLeft = size;
                            }
                        }
                        if (nodes[i].attributes['fo:padding-right'] && nodes[i].attributes['fo:padding-right'].value) {
                            size = this._getSize(nodes[i].attributes['fo:padding-right'].value);
                            if (size.unit) {
                                result.page.dimensionCSSRules.paddingRight = size;
                            }
                        }
                        if (nodes[i].attributes['fo:padding-bottom'] && nodes[i].attributes['fo:padding-bottom'].value) {
                            size = this._getSize(nodes[i].attributes['fo:padding-bottom'].value);
                            if (size.unit) {
                                result.page.dimensionCSSRules.paddingBottom = size;
                            }
                        }
                        if (
                            nodes[i].attributes['style:footnote-max-height'] &&
                            nodes[i].attributes['style:footnote-max-height'].value
                        ) {
                            size = this._getSize(nodes[i].attributes['style:footnote-max-height'].value);
                            if (size.unit) {
                                result.footnote.dimensionCSSRules.maxHeight = size;
                            }
                        }
                        if (nodes[i].attributes['style:num-format'] && nodes[i].attributes['style:num-format'].value) {
                            result.page.options.numberingFormat = nodes[i].attributes['style:num-format'].value;
                        }
                        if (nodes[i].attributes['style:print-orientation'] && nodes[i].attributes['style:print-orientation'].value) {
                            result.page.options.isLandscapeOrientation =
                                nodes[i].attributes['style:print-orientation'].value == 'landscape';
                        }
                        if (nodes[i].attributes['style:writing-mode'] && nodes[i].attributes['style:writing-mode'].value) {
                            result.page.css.direction =
                                (/rl/ig).test(nodes[i].attributes['style:writing-mode'].value) ? "rtl" : "ltr";
                        }


                        childNodes = $.children(nodes[i]);
                        len = childNodes.length;

                        for (j = 0; len < childNodes; j++) {
                            switch (childNodes[j].localName) {
                            case "footnote-sep":
                                if (childNodes[j].attributes['style:width'] && childNodes[j].attributes['style:width'].value) {
                                    size = this._getSize(childNodes[j].attributes['style:width'].value);
                                    if (size.unit) {
                                        result.footnote.dimensionCSSRules.width = size;
                                    }
                                }
                                if (
                                    childNodes[j].attributes['style:distance-before-sep'] &&
                                    childNodes[j].attributes['style:distance-before-sep'].value
                                ) {
                                    size = this._getSize(childNodes[j].attributes['style:distance-before-sep'].value);
                                    if (size.unit) {
                                        result.footnote.dimensionCSSRules.marginTop = size;
                                    }
                                }
                                if (
                                    childNodes[j].attributes['style:distance-after-sep'] &&
                                    childNodes[j].attributes['style:distance-after-sep'].value
                                ) {
                                    size = this._getSize(childNodes[j].attributes['style:distance-after-sep'].value);
                                    if (size.unit) {
                                        result.footnote.dimensionCSSRules.marginBottom = size;
                                    }
                                }
                                if (
                                    childNodes[j].attributes['style:adjustment'] &&
                                    childNodes[j].attributes['style:adjustment'].value
                                ) {
                                    result.footnote.css['float'] = "none";

                                    if (childNodes[j].attributes['style:adjustment'].value == "left") {
                                        result.footnote.css['float'] = "left";
                                    } else if (childNodes[j].attributes['style:adjustment'].value == "right") {
                                        result.footnote.css['float'] = "right";
                                    }
                                }
                                if (
                                    childNodes[j].attributes['style:color'] &&
                                    childNodes[j].attributes['style:color'].value
                                ) {
                                    result.footnote.css.color =
                                        this.normalizeColorValue(childNodes[j].attributes['style:color'].value);
                                }
                                break;
                            }
                        }
                    }
                }

                return result;
            },
            _parseTextDocumentContent: function (params, callback) {
                var documentData = params.documentData,
                    result = {
                        name: this.getFileName(),
                        wordsCount: (documentData.documentInfo && documentData.documentInfo.wordsCount) || null,
                        pages: []
                    },
                    lazyLoopOptions = {
                        chunk: 20,
                        time: 0,
                        index: 0
                    },
                    interval,
                    time = 100,
                    self = this,
                    callbacks = 0,
                    lazyMethods = 0,
                    iteration,
                    completedLazyMethods = 0,
                    node = params.xml.querySelector('body'),
                    parsedLine,
                    pageParams = {
                        layout: documentData.styles.automatic.layouts[documentData.styles.pageLayout]
                    },
                    page;

                page = this._createPage(pageParams);

                this._parseTextDocumentStylesNode(params.xml.querySelector('automatic-styles'), function (styles) {
                    node = node ? node.querySelector('text') : null;
                    documentData._heading = [];

                    if (node) {
                        lazyMethods++;
                        lazyLoopOptions.data = $.children(node);
                        lazyLoopOptions.len = lazyLoopOptions.data.length;
                        lazyLoopOptions.all = lazyLoopOptions.len;

                        iteration = function (options) {
                            options.end = options.index + (options.all > options.chunk ? options.chunk : options.all);
                            setTimeout(function () {
                                for (options.index; options.index < options.end; options.index++) {
                                    switch (options.data[options.index].localName) {
                                    case "p":
                                        parsedLine = self._parseTextDocumentParagraphNode({
                                            node: options.data[options.index],
                                            styles: styles,
                                            documentData: documentData
                                        });
                                        if (parsedLine.options.pageBreak) {
                                            result.pages.push(page);
                                            page = self._createPage(pageParams);
                                        }
                                        page.children.push(parsedLine);
                                        break;
                                    case "list":
                                        parsedLine = self._parseTextDocumentListNode({
                                            node: options.data[options.index],
                                            styles: styles,
                                            documentData: documentData
                                        });
                                        if (parsedLine.options.pageBreak) {
                                            result.pages.push(page);
                                            page = self._createPage(pageParams);
                                        }
                                        page.children.push(parsedLine);
                                        break;
                                    case "table":
                                        parsedLine = self._parseTextDocumentTableNode({
                                            node: options.data[options.index],
                                            styles: styles,
                                            documentData: documentData
                                        });
                                        if (parsedLine.options.pageBreak) {
                                            result.pages.push(page);
                                            page = self._createPage(pageParams);
                                        }
                                        page.children.push(parsedLine);
                                        break;
                                    }

                                    callbacks++;

                                    if (callbacks >= options.len) {
                                        completedLazyMethods++;
                                        if (completedLazyMethods === lazyMethods) {
                                            result.pages.push(page);
                                        }
                                    }
                                }
                                options.all = options.len - options.end;
                                if (options.index < options.len) {
                                    iteration.call(self, options);
                                }
                                return true;
                            }, options.time);
                        };
                        iteration.call(self, lazyLoopOptions);
                    }

                    interval = setInterval(function () {
                        if (completedLazyMethods === lazyMethods) {
                            clearInterval(interval);

                            if (typeof callback === 'function') {
                                callback(result);
                            }
                        }
                    }, time);
                });
            },
            _parseTextDocumentParagraphNodeDrawFrame: function (options) {
                var data = {
                    attributes: {},
                    properties: {},
                    options: {
                        isImage: true
                    },
                    css: {},
                    dimensionCSSRules: {}
                },
                    size,
                    i,
                    children = $.children(options.node),
                    len = children.length;

                if (options.node.attributes['svg:x'] && options.node.attributes['svg:x'].value) {
                    size = this._getSize(options.node.attributes['svg:x'].value);

                    if (size.unit) {
                        data.dimensionCSSRules.left = size;
                        data.css.position = "absolute";
                    }
                }

                if (options.node.attributes['svg:y'] && options.node.attributes['svg:y'].value) {
                    size = this._getSize(options.node.attributes['svg:y'].value);

                    if (size.unit) {
                        data.dimensionCSSRules.top = size;
                        data.css.position = "absolute";
                    }
                }

                if (options.node.attributes['svg:width'] && options.node.attributes['svg:width'].value) {
                    size = this._getSize(options.node.attributes['svg:width'].value);

                    if (size.unit) {
                        data.dimensionCSSRules.width = size;
                    }
                }

                if (options.node.attributes['svg:height'] && options.node.attributes['svg:height'].value) {
                    size = this._getSize(options.node.attributes['svg:height'].value);

                    if (size.unit) {
                        data.dimensionCSSRules.height = size;
                    }
                }

                if (options.node.attributes['draw:z-index'] && !isNaN(options.node.attributes['draw:z-index'].value)) {
                    data.css.zIndex = +options.node.attributes['draw:z-index'].value;
                }

                if (options.node.attributes['draw:style-name'] && options.node.attributes['draw:style-name'].value) {
                    data.properties.styleName = options.node.attributes['draw:style-name'].value;
                }

                for (i = 0; i < len; i++) {
                    if (children[i].localName === "image") {
                        if (
                            children[i].attributes['xlink:href'] &&
                            options.documentData &&
                            options.documentData.media
                        ) {
                            data.attributes.src = options.documentData.media[children[i].attributes['xlink:href'].value];
                        }
                    }
                }

                return data;
            },
            _parseTextDocumentParagraphNodeTextSection: function (params) {
                var children = $.children(params.node),
                    i,
                    len = children.length,
                    styleRules,
                    result = {
                        css: {},
                        dimensionCSSRules: {},
                        attributes: {},
                        properties: {
                            textContent: ""
                        },
                        options: {}
                    };

                if (params.node.attributes['text:style-name'] && params.node.attributes['text:style-name'].value) {
                    styleRules = this._getStyleRules({
                        documentData: params.documentData,
                        styles: params.styles,
                        styleName: params.node.attributes['text:style-name'].value,
                        children: ['paragraphContent']
                    });

                    copy(result, styleRules.paragraph);
                }

                for (i = 0; i < len; i++) {
                    result.properties.textContent += children[i].textContent;
                }

                return result;
            },
            _parseTextDocumentListNode: function (params) {
                var result = {
                    options: {
                        isList: true,
                        pageBreak: false
                    },
                    attributes: {},
                    css: {},
                    dimensionCSSRules: {},
                    children: []
                },
                    styleRules,
                    i,
                    j,
                    nodes = $.children(params.node),
                    childNodes = [],
                    length,
                    len = nodes.length,
                    item;

                if (params.node.attributes['xml:id'] && params.node.attributes['xml:id'].value) {
                    result.attributes.id = params.node.attributes['xml:id'].value;
                }
                if (params.node.attributes['text:style-name'] && params.node.attributes['text:style-name'].value) {
                    styleRules = this._getStyleRules({
                        documentData: params.documentData,
                        styles: params.styles,
                        styleName: params.node.attributes['text:style-name'].value,
                        children: ['list']
                    });

                    copy(result, styleRules.list);
                }

                for (i = 0; i < len; i++) {
                    item = {
                        options: {},
                        attributes: {},
                        css: {},
                        dimensionCSSRules: {},
                        children: []
                    };

                    if (nodes[i].localName === "list-item") {
                        childNodes = $.children(nodes[i]);
                        length = childNodes.length;

                        for (j = 0; j < length; j++) {
                            if (childNodes[j].localName === "p") {
                                item.children.push(this._parseTextDocumentParagraphNode({
                                    node: childNodes[j],
                                    styles: params.styles,
                                    documentData: params.documentData
                                }));
                            }
                        }
                    }
                    result.children[i] = item;
                }

                return result;
            },
            _parseTextDocumentListStyles: function (xml) {
                var result = {
                    list: {
                        css: {},
                        dimensionCSSRules: {}
                    }
                },
                    i,
                    nodes = $.children(xml),
                    len = nodes.length;

                for (i = 0; i < len; i++) {
                    if (nodes[i].localName == "list-level-style-number") {
                        if (nodes[i].attributes['style:num-format'] && nodes[i].attributes['style:num-format'].value) {
                            result.list.css.listStyleType = this._getListStyleType(nodes[i].attributes['style:num-format'].value);
                        }
                    }
                }

                return result;
            },
            _parseTextDocumentMetaInformation: function (xml) {
                var result = {
                    documentInfo: {},
                    applicationInfo: {}
                },
                    infoNode = xml.querySelector('meta'),
                    i,
                    nodes = $.children(infoNode),
                    length = nodes.length;

                if (infoNode) {
                    for (i = 0; i < length; i++) {
                        switch (nodes[i].localName) {
                        case "initial-creator":
                        case "creator":
                            if (nodes[i].textContent) {
                                result.documentInfo.creator = nodes[i].textContent;
                            }
                            break;
                        case "creation-date":
                            if (nodes[i].textContent) {
                                result.documentInfo.dateCreated = new Date(nodes[i].textContent);
                            }
                            break;
                        case "date":
                            if (nodes[i].textContent) {
                                result.documentInfo.dateModified = new Date(nodes[i].textContent);
                            }
                            break;
                        case "generator":
                            if (nodes[i].textContent) {
                                result.applicationInfo.application = nodes[i].textContent;
                            }
                            break;
                        case "document-statistic":
                            result.documentInfo.tableCount = (
                                nodes[i].attributes['meta:table-count'] && !isNaN(nodes[i].attributes['meta:table-count'].value)
                            ) ? +nodes[i].attributes['meta:table-count'].value : 0;

                            result.documentInfo.imageCount = (
                                nodes[i].attributes['meta:image-count'] && !isNaN(nodes[i].attributes['meta:image-count'].value)
                            ) ? +nodes[i].attributes['meta:image-count'].value : 0;

                            result.documentInfo.objectCount = (
                                nodes[i].attributes['meta:object-count'] && !isNaN(nodes[i].attributes['meta:object-count'].value)
                            ) ? +nodes[i].attributes['meta:object-count'].value : 0;

                            result.documentInfo.pageCount = (
                                nodes[i].attributes['meta:page-count'] && !isNaN(nodes[i].attributes['meta:page-count'].value)
                            ) ? +nodes[i].attributes['meta:page-count'].value : 0;

                            result.documentInfo.paragraphCount = (
                                nodes[i].attributes['meta:paragraph-count'] && !isNaN(nodes[i].attributes['meta:paragraph-count'].value)
                            ) ? +nodes[i].attributes['meta:paragraph-count'].value : 0;

                            result.documentInfo.wordsCount = (
                                nodes[i].attributes['meta:word-count'] && !isNaN(nodes[i].attributes['meta:word-count'].value)
                            ) ? +nodes[i].attributes['meta:word-count'].value : 0;

                            result.documentInfo.characterCount = (
                                nodes[i].attributes['meta:character-count'] && !isNaN(nodes[i].attributes['meta:character-count'].value)
                            ) ? +nodes[i].attributes['meta:character-count'].value : 0;

                            break;
                        }
                    }
                }

                return result;
            },
            _parseTextDocumentParagraphNode: function (params) {
                var result = {
                    options: {
                        isParagraph: true,
                        pageBreak: false
                    },
                    attributes: {},
                    css: {},
                    dimensionCSSRules: {
                        margin: {
                            value: 0,
                            unit: "px"
                        },
                        padding: {
                            value: 0,
                            unit: "px"
                        }
                    },
                    children: []
                },
                    i,
                    styleRules = {},
                    element,
                    len = params.node.childNodes.length;

                if (params.node.attributes['text:style-name'] && params.node.attributes['text:style-name'].value) {
                    styleRules = this._getStyleRules({
                        documentData: params.documentData,
                        styles: params.styles,
                        styleName: params.node.attributes['text:style-name'].value,
                        children: ['paragraph', 'paragraphContent']
                    });

                    copy(result, styleRules.paragraph);
                }

                for (i = 0; i < len; i++) {
                    element = copy({
                        options: {},
                        attributes: {},
                        properties: {}
                    }, styleRules.paragraphContent);

                    switch (params.node.childNodes[i].localName) {
                    case "tab":
                        element.properties.textContent = this.getTabAsSpaces();
                        result.children.push(element);
                        break;
                    case "soft-page-break":
                        result.options.pageBreak = true;
                        break;
                    case "span":
                        element = copy({}, element, this._parseTextDocumentParagraphNodeTextSection({
                            node: params.node.childNodes[i],
                            styles: params.styles,
                            documentData: params.documentData
                        }));
                        result.children.push(element);
                        break;
                    case "frame":
                        element = copy({}, element, this._parseTextDocumentParagraphNodeDrawFrame({
                            node: params.node.childNodes[i],
                            styles: params.styles,
                            documentData: params.documentData
                        }));
                        result.children.push(element);
                        break;
                    default:
                        element.properties.textContent = params.node.childNodes[i].textContent;
                        result.children.push(element);
                    }
                }

                return result;
            },
            _parseTextDocumentParagraphStyles: function (node) {
                var nodes = $.children(node),
                    length = nodes.length,
                    j,
                    result = {
                        paragraph: {
                            css: {},
                            dimensionCSSRules: {},
                            options: {}
                        },
                        paragraphContent: {
                            css: {},
                            dimensionCSSRules: {},
                            options: {}
                        }
                    },
                    align,
                    localName,
                    size = {};

                for (j = 0; j < length; j++) {
                    localName = nodes[j].localName;

                    if (localName === "paragraph-properties") {
                        if (nodes[j].attributes['fo:background-color'] && nodes[j].attributes['fo:background-color'].value) {
                            result.paragraph.css.backgroundColor =
                                this.normalizeColorValue(nodes[j].attributes['fo:background-color'].value);
                        }
                        if (nodes[j].attributes['style:writing-mode'] && nodes[j].attributes['style:writing-mode'].value) {
                            result.paragraph.css.direction =
                                (/rl/ig).test(nodes[j].attributes['style:writing-mode'].value) ? "rtl" : "ltr";
                        }
                        if (nodes[j].attributes['fo:text-align'] && nodes[j].attributes['fo:text-align'].value) {
                            align = (/center|left|right/i).exec(nodes[j].attributes['fo:text-align'].value);

                            if (align && align[0]) {
                                result.paragraph.css.textAlign = align[0];
                            }
                        }
                        if (nodes[j].attributes['fo:margin'] && nodes[j].attributes['fo:margin'].value) {
                            size = this._getSize(nodes[j].attributes['fo:margin'].value);

                            if (size.unit) {
                                result.paragraph.dimensionCSSRules.margin = size;
                            }
                        }
                        if (nodes[j].attributes['fo:margin-top'] && nodes[j].attributes['fo:margin-top'].value) {
                            size = this._getSize(nodes[j].attributes['fo:margin-top'].value);

                            if (size.unit) {
                                result.paragraph.dimensionCSSRules.marginTop = size;
                            }
                        }
                        if (nodes[j].attributes['fo:margin-bottom'] && nodes[j].attributes['fo:margin-bottom'].value) {
                            size = this._getSize(nodes[j].attributes['fo:margin-bottom'].value);
                            if (size.unit) {
                                result.paragraph.dimensionCSSRules.marginBottom = size;
                            }
                        }
                        if (nodes[j].attributes['fo:margin-left'] && nodes[j].attributes['fo:margin-left'].value) {
                            size = this._getSize(nodes[j].attributes['fo:margin-left'].value);
                            if (size.unit) {
                                result.paragraph.dimensionCSSRules.marginLeft = size;
                            }
                        }
                        if (nodes[j].attributes['fo:margin-right'] && nodes[j].attributes['fo:margin-right'].value) {
                            size = this._getSize(nodes[j].attributes['fo:margin-right'].value);
                            if (size.unit) {
                                result.paragraph.dimensionCSSRules.marginLeft = size;
                            }
                        }
                        if (nodes[j].attributes['fo:margin'] && nodes[j].attributes['fo:margin'].value) {
                            size = this._getSize(nodes[j].attributes['fo:margin'].value);
                            if (size.unit) {
                                result.paragraph.dimensionCSSRules.margin = size;
                            }
                        }
                        if (nodes[j].attributes['fo:margin-top'] && nodes[j].attributes['fo:margin-top'].value) {
                            size = this._getSize(nodes[j].attributes['fo:margin-top'].value);
                            if (size.unit) {
                                result.paragraph.dimensionCSSRules.marginTop = size;
                            }
                        }
                        if (nodes[j].attributes['fo:margin-bottom'] && nodes[j].attributes['fo:margin-bottom'].value) {
                            size = this._getSize(nodes[j].attributes['fo:margin-bottom'].value);
                            if (size.unit) {
                                result.paragraph.dimensionCSSRules.marginBottom = size;
                            }
                        }
                        if (nodes[j].attributes['fo:margin-left'] && nodes[j].attributes['fo:margin-left'].value) {
                            size = this._getSize(nodes[j].attributes['fo:margin-left'].value);
                            if (size.unit) {
                                result.paragraph.dimensionCSSRules.marginLeft = size;
                            }
                        }
                        if (nodes[j].attributes['fo:margin-right'] && nodes[j].attributes['fo:margin-right'].value) {
                            size = this._getSize(nodes[j].attributes['fo:margin-right'].value);
                            if (size.unit) {
                                result.paragraph.dimensionCSSRules.marginRight = size;
                            }
                        }
                        if (nodes[j].attributes['fo:padding'] && nodes[j].attributes['fo:padding'].value) {
                            size = this._getSize(nodes[j].attributes['fo:padding'].value);
                            if (size.unit) {
                                result.paragraph.dimensionCSSRules.padding = size;
                            }
                        }
                        if (nodes[j].attributes['fo:padding-top'] && nodes[j].attributes['fo:padding-top'].value) {
                            size = this._getSize(nodes[j].attributes['fo:padding-top'].value);
                            if (size.unit) {
                                result.paragraph.dimensionCSSRules.paddingTop = size;
                            }
                        }
                        if (nodes[j].attributes['fo:padding-bottom'] && nodes[j].attributes['fo:padding-bottom'].value) {
                            size = this._getSize(nodes[j].attributes['fo:padding-bottom'].value);
                            if (size.unit) {
                                result.paragraph.dimensionCSSRules.paddingBottom = size;
                            }
                        }
                        if (nodes[j].attributes['fo:padding-left'] && nodes[j].attributes['fo:padding-left'].value) {
                            size = this._getSize(nodes[j].attributes['fo:padding-left'].value);
                            if (size.unit) {
                                result.paragraph.dimensionCSSRules.paddingLeft = size;
                            }
                        }
                        if (nodes[j].attributes['fo:padding-right'] && nodes[j].attributes['fo:padding-right'].value) {
                            size = this._getSize(nodes[j].attributes['fo:padding-right'].value);
                            if (size.unit) {
                                result.paragraph.dimensionCSSRules.paddingRight = size;
                            }
                        }
                    } else if (localName === "text-properties") {
                        if (nodes[j].attributes['fo:color'] && nodes[j].attributes['fo:color'].value) {
                            result.paragraphContent.css.color =
                                this.normalizeColorValue(nodes[j].attributes['fo:color'].value);
                        }
                        if (nodes[j].attributes['fo:font-style'] && nodes[j].attributes['fo:font-style'].value) {
                            result.paragraphContent.css.fontStyle =
                                (/italic/ig).test(nodes[j].attributes['fo:font-style'].value) ? "italic" : "normal";
                        }
                        if (nodes[j].attributes['fo:font-weight'] && nodes[j].attributes['fo:font-weight'].value) {
                            result.paragraphContent.css.fontWeight =
                                (/bold/ig).test(nodes[j].attributes['fo:font-weight'].value) ? "bold" : "normal";
                        }
                        if (
                            nodes[j].attributes['style:text-underline-style'] &&
                            nodes[j].attributes['style:text-underline-style'].value
                        ) {
                            result.paragraphContent.css.textDecoration =
                                (/none/ig).test(nodes[j].attributes['style:text-underline-style'].value) ? "none" : "underline";
                        }
                        if (nodes[j].attributes['style:font-name'] && nodes[j].attributes['style:font-name'].value) {
                            result.paragraphContent.css.fontFamily = nodes[j].attributes['style:font-name'].value;
                        }
                        if (nodes[j].attributes['fo:font-size'] && nodes[j].attributes['fo:font-size'].value) {
                            size = this._getSize(nodes[j].attributes['fo:font-size'].value);
                            if (size.unit) {
                                result.paragraphContent.dimensionCSSRules.fontSize = size;
                            }
                        }
                        if (nodes[j].attributes['fo:margin'] && nodes[j].attributes['fo:margin'].value) {
                            size = this._getSize(nodes[j].attributes['fo:margin'].value);
                            if (size.unit) {
                                result.paragraphContent.dimensionCSSRules.margin = size;
                            }
                        }
                        if (nodes[j].attributes['fo:margin-top'] && nodes[j].attributes['fo:margin-top'].value) {
                            size = this._getSize(nodes[j].attributes['fo:margin-top'].value);
                            if (size.unit) {
                                result.paragraphContent.dimensionCSSRules.marginTop = size;
                            }
                        }
                        if (nodes[j].attributes['fo:margin-bottom'] && nodes[j].attributes['fo:margin-bottom'].value) {
                            size = this._getSize(nodes[j].attributes['fo:margin-bottom'].value);
                            if (size.unit) {
                                result.paragraphContent.dimensionCSSRules.marginBottom = size;
                            }
                        }
                        if (nodes[j].attributes['fo:margin-left'] && nodes[j].attributes['fo:margin-left'].value) {
                            size = this._getSize(nodes[j].attributes['fo:margin-left'].value);
                            if (size.unit) {
                                result.paragraphContent.dimensionCSSRules.marginLeft = size;
                            }
                        }
                        if (nodes[j].attributes['fo:margin-right'] && nodes[j].attributes['fo:margin-right'].value) {
                            size = this._getSize(nodes[j].attributes['fo:margin-right'].value);
                            if (size.unit) {
                                result.paragraphContent.dimensionCSSRules.marginLeft = size;
                            }
                        }
                        if (nodes[j].attributes['fo:margin'] && nodes[j].attributes['fo:margin'].value) {
                            size = this._getSize(nodes[j].attributes['fo:margin'].value);
                            if (size.unit) {
                                result.paragraphContent.dimensionCSSRules.margin = size;
                            }
                        }
                        if (nodes[j].attributes['fo:margin-top'] && nodes[j].attributes['fo:margin-top'].value) {
                            size = this._getSize(nodes[j].attributes['fo:margin-top'].value);
                            if (size.unit) {
                                result.paragraphContent.dimensionCSSRules.marginTop = size;
                            }
                        }
                        if (nodes[j].attributes['fo:margin-bottom'] && nodes[j].attributes['fo:margin-bottom'].value) {
                            size = this._getSize(nodes[j].attributes['fo:margin-bottom'].value);
                            if (size.unit) {
                                result.paragraphContent.dimensionCSSRules.marginBottom = size;
                            }
                        }
                        if (nodes[j].attributes['fo:margin-left'] && nodes[j].attributes['fo:margin-left'].value) {
                            size = this._getSize(nodes[j].attributes['fo:margin-left'].value);
                            if (size.unit) {
                                result.paragraphContent.dimensionCSSRules.marginLeft = size;
                            }
                        }
                        if (nodes[j].attributes['fo:margin-right'] && nodes[j].attributes['fo:margin-right'].value) {
                            size = this._getSize(nodes[j].attributes['fo:margin-right'].value);
                            if (size.unit) {
                                result.paragraphContent.dimensionCSSRules.marginRight = size;
                            }
                        }
                        if (nodes[j].attributes['fo:padding'] && nodes[j].attributes['fo:padding'].value) {
                            size = this._getSize(nodes[j].attributes['fo:padding'].value);

                            if (size.unit) {
                                result.paragraphContent.dimensionCSSRules.padding = size;
                            }
                        }
                        if (nodes[j].attributes['fo:padding-top'] && nodes[j].attributes['fo:padding-top'].value) {
                            size = this._getSize(nodes[j].attributes['fo:padding-top'].value);

                            if (size.unit) {
                                result.paragraphContent.dimensionCSSRules.paddingTop = size;
                            }
                        }
                        if (nodes[j].attributes['fo:padding-bottom'] && nodes[j].attributes['fo:padding-bottom'].value) {
                            size = this._getSize(nodes[j].attributes['fo:padding-bottom'].value);
                            if (size.unit) {
                                result.paragraphContent.dimensionCSSRules.paddingBottom = size;
                            }
                        }
                        if (nodes[j].attributes['fo:padding-left'] && nodes[j].attributes['fo:padding-left'].value) {
                            size = this._getSize(nodes[j].attributes['fo:padding-left'].value);

                            if (size.unit) {
                                result.paragraphContent.dimensionCSSRules.paddingLeft = size;
                            }
                        }
                        if (nodes[j].attributes['fo:padding-right'] && nodes[j].attributes['fo:padding-right'].value) {
                            size = this._getSize(nodes[j].attributes['fo:padding-right'].value);

                            if (size.unit) {
                                result.paragraphContent.dimensionCSSRules.paddingRight = size;
                            }
                        }
                        if (nodes[j].attributes['fo:language'] && nodes[j].attributes['fo:language'].value) {
                            result.paragraphContent.options.language = nodes[j].attributes['fo:language'].value;
                        }
                    }
                }

                return result;
            },
            _parseTextDocumentStyles: function (xml, callback) {
                var result = {
                    automatic: {
                        layouts: {}
                    },
                    pageLayout: "",
                    defaults: {}
                },
                    i,
                    len,
                    stylesNode,
                    nodes,
                    firstPageLayout = "";

                stylesNode = xml.querySelector('master-styles');
                nodes = $.children(stylesNode);
                len = nodes.length;

                for (i = len - 1; i >= 0; i--) {
                    if (nodes[i].localName === "master-page") {
                        if (nodes[i].attributes['style:page-layout-name'] && nodes[i].attributes['style:page-layout-name'].value) {
                            result.pageLayout = nodes[i].attributes['style:page-layout-name'].value;
                        }
                    }
                }

                stylesNode = xml.querySelector('automatic-styles');
                nodes = $.children(stylesNode);
                len = nodes.length;

                for (i = len - 1; i >= 0; i--) {
                    if (nodes[i].localName === "page-layout") {
                        if (nodes[i].attributes['style:name'] && nodes[i].attributes['style:name'].value) {
                            result.automatic.layouts[nodes[i].attributes['style:name'].value] =
                                this._parsePageLayoutStyles(nodes[i]);

                            if (!firstPageLayout) {
                                firstPageLayout = nodes[i].attributes['style:name'].value;
                            }
                        }
                    }
                }

                if (!result.automatic.layouts[result.pageLayout] && firstPageLayout) {
                    result.pageLayout = firstPageLayout;
                }

                stylesNode = xml.querySelector('styles');
                this._parseTextDocumentStylesNode(stylesNode, function (styles) {
                    result.defaults = styles;
                    callback(result);
                });
            },
            _parseTextDocumentStylesNode: function (stylesNode, callback) {
                var result = {
                    named: {},
                    paragraph: {},
                    paragraphContent: {},
                    table: {},
                    list: {}
                },
                    self = this,
                    data = {},
                    loopCallbacksCount = 0,
                    loopIteration,
                    completedLazyMethods = 0,
                    lazyLoopOptions = {
                        chunk: 20,
                        time: 10,
                        index: 0
                    },
                    lazyMethods = 0,
                    namedStyle,
                    localName,
                    node,
                    styleLocalName = "style",
                    listStyleLocalName = "list-style",
                    defaultStyleLocalName = "default-style";

                if (stylesNode) {
                    lazyMethods++;

                    lazyLoopOptions.data = $.children(stylesNode);
                    lazyLoopOptions.len = lazyLoopOptions.data.length;
                    lazyLoopOptions.all = lazyLoopOptions.len;

                    loopIteration = function (options) {
                        options.end = options.index + (options.all > options.chunk ? options.chunk : options.all);
                        setTimeout(function () {
                            for (options.index; options.index < options.end; options.index++) {
                                node = options.data[options.index];
                                localName = node.localName;

                                if (localName === styleLocalName || defaultStyleLocalName === localName) {

                                    if (
                                        localName !== "default-style" && node.attributes['style:name'] &&
                                        node.attributes['style:name'].value
                                    ) {
                                        result.named[node.attributes['style:name'].value] =
                                            result.named[node.attributes['style:name'].value] || {};
                                        namedStyle = result.named[node.attributes['style:name'].value];
                                    } else {
                                        namedStyle = null;
                                    }

                                    switch (node.attributes['style:family'] && node.attributes['style:family'].value) {
                                    case "table":
                                        if (namedStyle) {
                                            namedStyle.table = self._parseTextDocumentTableStyles(node);
                                        } else {
                                            result.table = self._parseTextDocumentTableStyles(node);
                                        }
                                        break;
                                    case "table-column":
                                        if (namedStyle) {
                                            namedStyle.tableColumn = self._parseTextDocumentTableColumnStyles(node);
                                        }
                                        break;
                                    case "table-cell":
                                        if (namedStyle) {
                                            namedStyle.tableCell = self._parseTextDocumentTableCellStyles(node);
                                        }
                                        break;
                                    case "paragraph":
                                        if (namedStyle) {
                                            data = self._parseTextDocumentParagraphStyles(node);
                                            namedStyle.paragraph = copy(data.paragraph, {
                                                css: {
                                                    wordWrap: "break-word",
                                                    wordBreak: "break-all",
                                                    width: "100%"
                                                }
                                            });
                                            namedStyle.paragraphContent = data.paragraphContent;
                                        } else {
                                            data = self._parseTextDocumentParagraphStyles(node);
                                            result.paragraph = data.paragraph;
                                            result.paragraphContent = data.paragraphContent;
                                        }
                                        break;
                                    case "text":
                                        if (namedStyle) {
                                            data = self._parseTextDocumentParagraphStyles(node);
                                            namedStyle.paragraph = data.paragraph;
                                            namedStyle.paragraphContent = data.paragraphContent;
                                        } else {
                                            data = self._parseTextDocumentParagraphStyles(node);
                                            result.paragraph = data.paragraph;
                                            result.paragraphContent = data.paragraphContent;
                                        }
                                        break;
                                    }
                                } else if (
                                    localName === listStyleLocalName && node.attributes['style:name'] &&
                                    node.attributes['style:name'].value
                                ) {
                                    result.named[node.attributes['style:name'].value] =
                                        result.named[node.attributes['style:name'].value] || {};

                                    copy(
                                        result.named[node.attributes['style:name'].value],
                                        self._parseTextDocumentListStyles(node)
                                    );
                                }

                                loopCallbacksCount++;
                                if (loopCallbacksCount >= options.len) {
                                    completedLazyMethods++;
                                    if (completedLazyMethods >= lazyMethods) {
                                        if (typeof callback === "function") {
                                            callback(result);
                                        }
                                    }
                                }
                            }
                            options.all = options.len - options.end;
                            if (options.index < options.len) {
                                loopIteration.call(self, options);
                            }
                            return true;
                        }, options.time);
                    };
                    loopIteration.call(self, lazyLoopOptions);
                } else {
                    callback(result);
                }
            },
            _parseTextDocumentTableCellStyles: function (node) {
                var nodes = $.children(node),
                    length = nodes.length,
                    j,
                    result = {
                        css: {},
                        dimensionCSSRules: {},
                        options: {}
                    },
                    data;

                for (j = 0; j < length; j++) {
                    if (nodes[j].localName === "table-cell-properties") {
                        if (
                            nodes[j].attributes['fo:padding'] &&
                            nodes[j].attributes['fo:padding'].value
                        ) {
                            data = this._getSize(nodes[j].attributes['fo:padding'].value);
                            if (data.unit) {
                                result.dimensionCSSRules.padding = data;
                            }
                        }
                        if (
                            nodes[j].attributes['fo:border'] &&
                            nodes[j].attributes['fo:border'].value
                        ) {
                            data = this._parseBorderStyle(nodes[j].attributes['fo:border'].value);
                            result.css.borderStyle = data.style;
                            result.dimensionCSSRules.borderWidth = data.width;
                            result.css.borderColor = data.color;
                        }
                        if (
                            nodes[j].attributes['fo:border-left'] &&
                            nodes[j].attributes['fo:border-left'].value
                        ) {
                            data = this._parseBorderStyle(nodes[j].attributes['fo:border-left'].value);
                            result.css.borderLeftStyle = data.style;
                            result.dimensionCSSRules.borderLeftWidth = data.width;
                            result.css.borderLeftColor = data.color;
                        }
                        if (
                            nodes[j].attributes['fo:border-right'] &&
                            nodes[j].attributes['fo:border-right'].value
                        ) {
                            data = this._parseBorderStyle(nodes[j].attributes['fo:border-right'].value);
                            result.css.borderRightStyle = data.style;
                            result.dimensionCSSRules.borderRightWidth = data.width;
                            result.css.borderRightColor = data.color;
                        }
                        if (
                            nodes[j].attributes['fo:border-top'] &&
                            nodes[j].attributes['fo:border-top'].value
                        ) {
                            data = this._parseBorderStyle(nodes[j].attributes['fo:border-top'].value);
                            result.css.borderTopStyle = data.style;
                            result.dimensionCSSRules.borderTopWidth = data.width;
                            result.css.borderTopColor = data.color;
                        }
                        if (
                            nodes[j].attributes['fo:border-bottom'] &&
                            nodes[j].attributes['fo:border-bottom'].value
                        ) {
                            data = this._parseBorderStyle(nodes[j].attributes['fo:border-bottom'].value);
                            result.css.borderBottomStyle = data.style;
                            result.dimensionCSSRules.borderBottomWidth = data.width;
                            result.css.borderBottomColor = data.color;
                        }
                    }
                }

                return result;
            },
            _parseTextDocumentTableColumnStyles: function (node) {
                var nodes = $.children(node),
                    length = nodes.length,
                    j,
                    result = {
                        css: {},
                        dimensionCSSRules: {},
                        options: {}
                    },
                    size = {};

                for (j = 0; j < length; j++) {
                    if (nodes[j].localName === "table-column-properties") {
                        if (
                            nodes[j].attributes['style:column-width'] &&
                            nodes[j].attributes['style:column-width'].value
                        ) {
                            size = this._getSize(nodes[j].attributes['style:column-width'].value);
                            if (size.unit) {
                                result.dimensionCSSRules.width = size;
                            }
                        }
                    }
                }

                return result;
            },
            _parseTextDocumentTableNode: function (params) {
                var header = {
                    options: {
                        isHeader: true
                    },
                    children: []
                },
                    body = {
                        children: []
                    },
                    footer = {
                        options: {
                            isFooter: true
                        },
                        children: []
                    },
                    result = {
                        options: {
                            isTable: true,
                            pageBreak: false
                        },
                        children: [header, body, footer],
                        attributes: {},
                        dimensionCSSRules: {},
                        css: {}
                    },
                    i,
                    nodes = $.children(params.node),
                    llength = nodes.length,
                    cccNodes = [],
                    cc = 0,
                    llllength = 0,
                    row = {},
                    localName,
                    styleRules = {};

                if (params.node.attributes['table:name'] && params.node.attributes['table:name'].value) {
                    result.attributes.name = params.node.attributes['table:name'].value;
                }
                if (params.node.attributes['table:style-name'] && params.node.attributes['table:style-name'].value) {
                    styleRules = this._getStyleRules({
                        documentData: params.documentData,
                        styles: params.styles,
                        styleName: params.node.attributes['table:style-name'].value,
                        children: ['table']
                    });

                    copy(result, styleRules.table);
                }

                for (i = 0; i < llength; i++) {
                    localName = nodes[i].localName;
                    if (localName === "table-row") {
                        body.children.push(copy(this._parseTextDocumentTableRowNode({
                            node: nodes[i],
                            documentData: params.documentData,
                            styles: params.styles
                        })));
                    } else if (localName === "table-header-rows") {
                        cccNodes = $.children(nodes[i]);
                        llllength = cccNodes.length;

                        for (cc = 0; cc < llllength; cc++) {
                            if (cccNodes[cc].localName === "table-row") {
                                header.children.push(this._parseTextDocumentTableRowNode({
                                    node: cccNodes[cc],
                                    documentData: params.documentData,
                                    styles: params.styles
                                }));
                            }
                        }
                    }
                }

                return result;
            },
            _parseTextDocumentTableRowNode: function (params) {
                var row = {
                    children: [],
                    css: {},
                    dimensionCSSRules: {}
                },
                    j,
                    c,
                    cell,
                    ccNodes,
                    lllength,
                    styleRules = {},
                    cNodes = $.children(params.node),
                    length = cNodes.length;

                for (j = 0; j < length; j++) {
                    if (cNodes[j].localName === "table-cell") {
                        if (cNodes[j].attributes['table:style-name'] && cNodes[j].attributes['table:style-name'].value) {
                            styleRules = this._getStyleRules({
                                documentData: params.documentData,
                                styles: params.styles,
                                styleName: cNodes[j].attributes['table:style-name'].value,
                                children: ['tableCell']
                            });
                        }

                        cell = copy({
                            children: [],
                            options: {}
                        }, params.styles, styleRules.tableCell);
                        ccNodes = $.children(cNodes[j]);
                        lllength = ccNodes.length;

                        for (c = 0; c < lllength; c++) {
                            if (ccNodes[c].localName === "p") {
                                cell.children.push(this._parseTextDocumentParagraphNode({
                                    node: ccNodes[c],
                                    styles: params.styles,
                                    documentData: params.documentData
                                }));
                            }
                        }
                        row.children.push(cell);
                    }
                }

                return row;
            },
            _parseTextDocumentTableStyles: function (node) {
                var nodes = $.children(node),
                    length = nodes.length,
                    j,
                    result = {
                        css: {},
                        dimensionCSSRules: {},
                        options: {}
                    },
                    size = {};

                for (j = length - 1; j >= 0; j--) {
                    if (nodes[j].localName === "table-properties") {
                        if (nodes[j].attributes['style:width'] && nodes[j].attributes['style:width'].value) {
                            size = this._getSize(nodes[j].attributes['style:width'].value);
                            if (size.unit) {
                                result.dimensionCSSRules.width = size;
                            }
                        }
                        if (nodes[j].attributes['table:border-model'] && nodes[j].attributes['table:border-model'].value) {
                            result.css.borderCollapse =
                                (/coll/ig).test(nodes[j].attributes['table:border-model'].value) ? "collapse" : "separate";
                        }
                    }
                }

                return result;
            },
            createFileData: function (fileEntries, callback) {
                if (this.isTextDocument()) {
                    this.createFileDataFromTextDocument.apply(this, arguments);
                }

                return null;
            },
            createFileDataFromTextDocument: function (filesEntry, callback) {
                var counter = 0,
                    domParser = new DOMParser(),
                    document,
                    info,
                    documentData = {
                        documentInfo: {},
                        applicationInfo: {},
                        styles: {},
                        media: {}
                    };

                /**
                 * @description Reading files
                 */
                this.readFilesEntries({
                    entries: filesEntry,
                    read: function (result, fileEntry) {
                        var filename = fileEntry.entry.filename,
                            xml;

                        if (filename.indexOf('Pictures') != -1) {
                            documentData.media[filename] = this.normalizeDataURI(result, filename);
                            counter++;
                        } else {
                            xml = domParser.parseFromString(result, "application/xml");

                            if (filename.indexOf('styles.') != -1) {
                                this._parseTextDocumentStyles(
                                    xml,
                                    function (styles) {
                                        documentData.styles = styles;
                                        counter++;
                                    }
                                );
                            } else {
                                if (filename.indexOf('meta.') != -1) {
                                    info = this._parseTextDocumentMetaInformation(xml);
                                    documentData.documentInfo = info.documentInfo;
                                    documentData.applicationInfo = info.applicationInfo;
                                } else if (filename.indexOf('content.') != -1) {
                                    document = xml;
                                }

                                counter++;
                            }
                        }
                    }.bind(this),
                    success: function (results, filesEntry, len) {
                        var interval = setInterval(function () {
                            if (counter == len) {
                                clearInterval(interval);

                                this._parseTextDocumentContent({
                                    xml: document,
                                    documentData: documentData
                                }, function (result) {
                                    callback(new jDoc.FileData(result));
                                });
                            }
                        }.bind(this), 200);
                    }.bind(this)
                });
            },
            fileTypeParsers: [{
                extension: 'odt',
                mime: 'vnd.oasis.opendocument.text',
                isTextDocument: true
            }, {
                extension: 'ott',
                mime: 'vnd.oasis.opendocument.text-template',
                isTextDocument: true,
                isTemplate: true
            }, {
                extension: 'odg',
                mime: 'vnd.oasis.opendocument.graphics',
                isGraphicDocument: true
            }, {
                extension: 'otg',
                mime: 'vnd.oasis.opendocument.graphics-template',
                isGraphicDocument: true,
                isTemplate: true
            }, {
                extension: 'odp',
                mime: 'vnd.oasis.opendocument.presentation',
                isPresentation: true,
                isTemplate: true
            }, {
                extension: 'otp',
                mime: 'vnd.oasis.opendocument.presentation-template',
                isPresentationDocument: true,
                isTemplate: true
            }, {
                extension: 'ods',
                mime: 'vnd.oasis.opendocument.spreadsheet',
                isSpreadsheetDocument: true
            }, {
                extension: 'ots',
                mime: 'vnd.oasis.opendocument.spreadsheet-template',
                isSpreadsheetDocument: true,
                isTemplate: true
            }, {
                extension: 'odc',
                mime: 'vnd.oasis.opendocument.chart',
                isChartDocument: true
            }, {
                extension: 'otc',
                mime: 'vnd.oasis.opendocument.chart-template',
                isChartDocument: true,
                isTemplate: true
            }, {
                extension: 'odi',
                mime: 'vnd.oasis.opendocument.image',
                isImageDocument: true
            }, {
                extension: 'oti',
                mime: 'vnd.oasis.opendocument.image-template',
                isImageDocument: true,
                isTemplate: true
            }, {
                extension: 'odf',
                mime: 'vnd.oasis.opendocument.formula',
                isFormulaDocument: true
            }, {
                extension: 'otf',
                mime: 'vnd.oasis.opendocument.formula-template',
                isFormulaDocument: true,
                isTemplate: true
            }, {
                extension: 'odm',
                mime: 'vnd.oasis.opendocument.text-master',
                isTextDocumentMaster: true
            }, {
                extension: 'oth',
                mime: 'vnd.oasis.opendocument.text-web',
                isTextDocumentMasterWeb: true
            }],
            initialize: function () {
                this.on('parsefromarchivestart', function () {
                    this.trigger('parsestart');
                }.bind(this));
                this.on('parsefromarchive', function (fileData) {
                    this.trigger('parse', fileData);
                }.bind(this));
                this.on('parsefromarchiveend', function () {
                    this.trigger('parseend');
                }.bind(this));
            },
            options: {
                parseMethod: "parseFromArchive"
            }
        }
    );

    jDoc.defineEngine('ODF', [
        "application/vnd.oasis.opendocument.text",
        "application/vnd.oasis.opendocument.text-template",
        "application/vnd.oasis.opendocument.graphics",
        "application/vnd.oasis.opendocument.graphics-template",
        "application/vnd.oasis.opendocument.presentation",
        "application/vnd.oasis.opendocument.presentation-template",
        "application/vnd.oasis.opendocument.spreadsheet",
        "application/vnd.oasis.opendocument.spreadsheet-template",
        "application/vnd.oasis.opendocument.chart",
        "application/vnd.oasis.opendocument.chart-template",
        "application/vnd.oasis.opendocument.image",
        "application/vnd.oasis.opendocument.image-template",
        "application/vnd.oasis.opendocument.formula",
        "application/vnd.oasis.opendocument.formula-template",
        "application/vnd.oasis.opendocument.text-master",
        "application/vnd.oasis.opendocument.text-web"
    ], ODF);
    /**
     *
     * @type {Object}
     */
    var OOXML = jDoc.Engine.extend(
        /** @lends OOXML.prototype */
        {
            _checkPageLinesHeight: function (options) {
                var page;

                if (
                    options.pageHeight && options.pageLinesHeight + options.lineHeight > options.pageHeight
                ) {
                    page = jDoc.clone(options.pageOptions);

                    if (page.options.pageNumber) {
                        page.options.pageNumber.value = page.options.pageNumber.start + options.pageOptions.options.pageIndex;
                    }

                    page.children = options.pageElements;
                    options.pageLinesHeight = 0;
                    options.pages.push(page);
                } else {
                    options.pageLinesHeight += options.lineHeight;
                }

                return options.pageLinesHeight;
            },
            _convertEMU: function (val) {
                return {
                    value: val / (635 * 20),
                    unit: "pt"
                };
            },
            _createFileDataFromTextDocument: function (filesEntry, callback) {
                var domParser = new DOMParser(),
                    document,
                    documentData = {
                        mainRelations: {},
                        documentRelations: {},
                        appInfo: {},
                        documentInfo: {},
                        fonts: {},
                        settings: {},
                        styles: {},
                        webSettings: {},
                        media: {},
                        themes: {}
                    };

                this.readFilesEntries({
                    entries: filesEntry,
                    read: function (result, fileEntry) {
                        var filename = fileEntry.entry.filename,
                            xml;

                        if (filename.indexOf('media/') >= 0) {
                            documentData.media[filename] = {
                                fileData: fileEntry,
                                data: this.normalizeDataURI(result, filename)
                            };
                        } else {
                            xml = domParser.parseFromString(result, "application/xml");

                            if (filename.indexOf('_rels/.rels') >= 0) {
                                documentData.mainRelations = this._parseRelations(xml);
                            } else if (filename.indexOf('word/_rels/') >= 0) {
                                documentData.documentRelations = this._parseRelations(xml);
                            } else if (filename.indexOf('/app.xml') >= 0) {
                                documentData.applicationInfo = this._parseApplicationInfo(xml);
                            } else if (filename.indexOf('/core.xml') >= 0) {
                                documentData.documentInfo = this._parseDocumentInfo(xml);
                            } else if (filename.indexOf('theme/') >= 0) {
                                documentData.themes[filename] = this._parseDocumentTheme(xml);
                            } else if (filename.indexOf('/fontTable.xml') >= 0) {
                                documentData.fonts = this._parseFontsInfo(xml);
                            } else if (filename.indexOf('/settings.xml') >= 0) {
                                documentData.settings = this._parseTextDocumentSettings(xml);
                            } else if (filename.indexOf('/webSettings.xml') >= 0) {
                                documentData.webSettings = this._parseWebSettings(xml);
                            } else if (filename.indexOf('/styles.xml') >= 0) {
                                documentData.styles = this._parseTextDocumentStyles(xml);
                            } else if (filename.indexOf('/document.xml') >= 0) {
                                document = xml;
                            }
                        }
                    }.bind(this),
                    success: function () {
                        this._parseTextDocumentContent({
                            xml: document,
                            documentData: documentData,
                            callback: function (result) {
                                callback(new jDoc.FileData(result));
                            }
                        });
                    }.bind(this)
                });
            },
            _effectPatterns: {
                blinkBackground: "blinkBackgroundAnimation",
                lights: "lightsAnimation",
                antsBlack: "blackDashedLineAnimation",
                antsRed: "redDashedLineAnimation",
                shimmer: "shimmerAnimation",
                sparkle: "sparkleAnimation",
                none: "none"
            },
            _getCSSRulesFromPreferencedStyle: function (style) {
                return {
                    elementCSSRules: {
                        css: style.lineStyle.css || {},
                        dimensionCSSRules: style.lineStyle.dimensionCSSRules || {}
                    },
                    childrenCSSRules: {
                        css: style.contentProperties.css || {},
                        dimensionCSSRules: style.contentProperties.dimensionCSSRules || {}
                    }
                };
            },
            _getLineHeight: function (value) {
                var result = Math.round(value / 240 * 100) / 100;

                return (isNaN(result) || result < 1) ? 1 : result;
            },
            _getMediaFromRelation: function (params) {
                var media,
                    relation = this._getRelation(params);

                if (relation && params.documentData.media && params.documentData.media["word/" + relation.target]) {
                    media = params.documentData.media["word/" + relation.target];
                }

                return media;
            },
            _getRelation: function (params) {
                var relation;

                if (
                    params.documentData.documentRelations &&
                    params.documentData.documentRelations[params.relationId]
                ) {
                    relation = params.documentData.documentRelations[params.relationId];
                } else if (
                    params.documentData.mainRelations && params.documentData.mainRelations[params.relationId]
                ) {
                    relation = params.documentData.mainRelations[params.relationId];
                }

                return relation;
            },
            _getTextDocumentStyleProperties: function (params) {
                var result = {
                    options: {
                        classList: []
                    },
                    css: {},
                    dimensionCSSRules: {}
                },
                    headingInfo,
                    numIdNode,
                    preferencedStyle,
                    levelNode,
                    horizontalBorder,
                    verticalBorder,
                    cellBorderBottom,
                    cellBorderRight,
                    children = $.children(params.node),
                    textShadow = "0 0 1px 0 rgba(0,0,0,0.5)",
                    i;

                for (i = children.length - 1; i >= 0; i--) {
                    switch (children[i].localName) {
                    case "pStyle":
                        if (
                            children[i].attributes['w:val'] && children[i].attributes['w:val'].value
                        ) {
                            if (
                                params.documentData &&
                                params.documentData.styles.preferencedStyles[children[i].attributes['w:val'].value]
                            ) {
                                preferencedStyle = this._getCSSRulesFromPreferencedStyle(
                                    params.documentData.styles.preferencedStyles[children[i].attributes['w:val'].value]
                                );

                                copy(result, preferencedStyle.elementCSSRules);

                                result.options.childrenCSSRules = copy(
                                    result.options.childrenCSSRules, preferencedStyle.childrenCSSRules
                                );

                                headingInfo = (/Heading\s*([0-9]+)/i).exec(
                                    params.documentData.styles.preferencedStyles[children[i].attributes['w:val'].value].name
                                );

                                if (headingInfo) {
                                    result.options.classList.push(children[i].attributes['w:val'].value);
                                    result.options.heading = {
                                        level: isNaN(headingInfo[1]) ? 0 : +headingInfo[1]
                                    };
                                } else if (
                                    (/List\s*Paragraph/i).test(
                                        params.documentData.styles.preferencedStyles[children[i].attributes['w:val'].value].name
                                    )
                                ) {
                                    result.options.isListItem = true;
                                }
                            }
                        }
                        break;
                    case "jc":
                        if (children[i].attributes['w:val'] && children[i].attributes['w:val'].value) {
                            if (children[i].attributes['w:val'].value == 'both') {
                                result.css.textAlign = 'justify';
                            } else if (children[i].attributes['w:val'].value == 'center') {
                                result.css.textAlign = 'center';
                            } else if (children[i].attributes['w:val'].value == 'left') {
                                result.css.textAlign = 'left';
                            } else if (children[i].attributes['w:val'].value == 'right') {
                                result.css.textAlign = 'right';
                            }
                        }
                        break;
                    case "ind":
                        if (children[i].attributes['w:left'] && !isNaN(children[i].attributes['w:left'].value)) {
                            result.dimensionCSSRules.paddingLeft = {
                                unit: "pt",
                                value: children[i].attributes['w:left'].value / 20
                            };
                        }
                        if (children[i].attributes['w:right'] && !isNaN(children[i].attributes['w:right'].value)) {
                            result.dimensionCSSRules.paddingRight = {
                                unit: "pt",
                                value: children[i].attributes['w:right'].value / 20
                            };
                        }
                        if (children[i].attributes['w:firstLine'] && !isNaN(children[i].attributes['w:firstLine'].value)) {
                            result.dimensionCSSRules.textIndent = {
                                unit: "pt",
                                value: children[i].attributes['w:firstLine'].value / 20
                            };
                        }
                        break;
                    case "b":
                        result.css.fontWeight = (
                            children[i].attributes['w:val'] && !this.attributeToBoolean(children[i].attributes['w:val'])
                        ) ? "normal" : 'bold';
                        break;
                    case "bCs":
                        if (
                            children[i].attributes['w:val'] && !this.attributeToBoolean(children[i].attributes['w:val'])
                        ) {
                            result.options.complexFontWeight = 'bold';
                        }
                        break;
                    case "shadow":
                        result.css.textShadow =
                            this.attributeToBoolean(children[i].attributes['w:val']) ? textShadow : "none";
                        break;
                    case "cs":
                        result.options.useComplexScript = this.attributeToBoolean(children[i].attributes['w:val']);
                        break;
                    case "outline":
                        result.options.outline = this.attributeToBoolean(children[i].attributes['w:val']);
                        break;
                    case "rtl":
                        result.css.direction = this.attributeToBoolean(children[i].attributes['w:val']) ? "rtl" : "ltr";
                        break;
                    case "strike":
                        result.options.strike = this.attributeToBoolean(children[i].attributes['w:val']);
                        break;
                    case "dstrike":
                        result.options.doubleStrike = this.attributeToBoolean(children[i].attributes['w:val']);
                        break;
                    case "vanish":
                        if (this.attributeToBoolean(children[i].attributes['w:val'])) {
                            result.css.visibility = "hidden";
                        }
                        break;
                    case "specVanish":
                        if (this.attributeToBoolean(children[i].attributes['w:val'])) {
                            result.css.visibility = "hidden";
                        }
                        break;
                    case "i":
                        result.css.fontStyle = (
                            children[i].attributes['w:val'] && !this.attributeToBoolean(children[i].attributes['w:val'])
                        ) ? "normal" : 'italic';
                        break;
                    case "iCs":
                        if (
                            children[i].attributes['w:val'] && !this.attributeToBoolean(children[i].attributes['w:val'])
                        ) {
                            result.options.complexFontStyle = 'italic';
                        }
                        break;
                    case "color":
                        if (children[i].attributes['w:val'] && children[i].attributes['w:val'].value) {
                            result.css.color = this.normalizeColorValue(children[i].attributes['w:val'].value);
                        }
                        break;
                    case "sz":
                        if (children[i] && children[i].attributes['w:val'] && !isNaN(children[i].attributes['w:val'].value)) {
                            result.dimensionCSSRules.fontSize = {
                                unit: "pt",
                                value: children[i].attributes['w:val'].value / 2
                            };
                        }
                        break;
                    case "szCs":
                        if (!result.dimensionCSSRules.fontSize && children[i] && children[i].attributes['w:val'] && !isNaN(children[i].attributes['w:val'].value)) {
                            result.dimensionCSSRules.fontSize = {
                                value: children[i].attributes['w:val'].value / 2,
                                unit: "pt"
                            };
                        }
                        break;
                    case "rFonts":
                        if (children[i].attributes['w:ascii']) {
                            result.css.fontFamily = children[i].attributes['w:ascii'].value || "";
                        } else if (children[i].attributes['w:cs']) {
                            result.css.fontFamily = children[i].attributes['w:cs'].value || "";
                        } else if (children[i].attributes['w:asciiTheme']) {
                            if ((/major/ig).test(children[i].attributes['w:asciiTheme'].value)) {
                                result.options.majorFontFamily = true;
                            } else if ((/minor/ig).test(children[i].attributes['w:asciiTheme'].value)) {
                                result.options.minorFontFamily = true;
                            }
                        }
                        break;
                    case "u":
                        if (children[i].attributes['w:val'] && children[i].attributes['w:val'].value) {
                            result.css.textDecoration = (
                                children[i].attributes['w:val'].value != "none"
                            ) ? "underline" : result.css.textDecoration;
                        }
                        break;
                    case "vertAlign":
                        if (children[i].attributes['w:val']) {
                            result.css.verticalAlign = this._normalizeVerticalAlign(children[i].attributes['w:val']);
                        }
                        break;
                    case "oMath":
                        result.options.math = (this.attributeToBoolean(children[i].attributes['w:val']));
                        break;
                    case "imprint":
                        result.options.imprinting = (this.attributeToBoolean(children[i].attributes['w:val']));
                        break;
                    case "snapToGrid":
                        result.options.useDocumentGrid = (this.attributeToBoolean(children[i].attributes['w:val']));
                        break;
                    case "webHidden":
                        result.options.webHiddenText = (this.attributeToBoolean(children[i].attributes['w:val']));
                        break;
                    case "emboss":
                        result.options.embossing = (this.attributeToBoolean(children[i].attributes['w:val']));
                        break;
                    case "smallCaps":
                        result.options.smallCaps = (this.attributeToBoolean(children[i].attributes['w:val']));
                        break;
                    case "noProof":
                        result.options.checkSpellingGrammar = !(this.attributeToBoolean(children[i].attributes['w:val']));
                        break;
                    case "fitText":
                        result.options.fitText.id = (
                            children[i] && children[i].attributes['w:id']
                        ) ? children[i].attributes['w:id'].value : null;
                        result.options.fitText.width = (
                            children[i] && !isNaN(children[i].attributes['w:val'])
                        ) ? {
                            value: children[i].attributes['w:id'].value / 20,
                            unit: "pt"
                        } : null;
                        break;
                    case "shd":
                        if (children[i].attributes['w:val']) {
                            result.css.boxShadow = this._parseShadowProperty(children[i]);
                        }
                        break;
                    case "effect":
                        result.options.effect = this._parseStyleEffectProperty(children[i]);
                        break;
                    case "eastAsianLayout":
                        result.options.eastAsianSettings = {
                            id: (
                                children[i].attributes['w:id']
                            ) ? children[i].attributes['w:id'].value : null,
                            combines: (
                                this.attributeToBoolean(( !! children[i].attributes['w:combine']))
                            ),
                            isVertical: ( !! children[i] &&
                                this.attributeToBoolean(( !! children[i].attributes['w:vert']))),
                            verticalCompress: ( !! children[i] &&
                                this.attributeToBoolean(( !! children[i].attributes['w:vertCompress']))),
                            combineBrackets: ( !! children[i] &&
                                this._parseBrackets(children[i].attributes['w:combineBrackets']))
                        };
                        break;
                    case "position":
                        if (
                            children[i].attributes['w:val'] && !isNaN(children[i].attributes['w:val'].value)
                        ) {
                            result.options.position = {
                                value: children[i].attributes['w:val'].value / 2,
                                unit: "pt"
                            };
                        }
                        break;
                    case "spacing":
                        if (children[i].attributes['w:line'] && !isNaN(children[i].attributes['w:line'].value)) {
                            result.css.lineHeight = this._getLineHeight(children[i].attributes['w:line'].value);

                            /**
                             * @description Fix for empty container
                             * @type {String}
                             */
                            result.dimensionCSSRules.minHeight = {
                                value: children[i].attributes['w:line'].value / 20,
                                unit: "pt"
                            };
                        }
                        if (children[i].attributes['w:before'] && !isNaN(children[i].attributes['w:before'].value)) {
                            result.dimensionCSSRules.marginTop = {
                                value: children[i].attributes['w:before'].value / 20,
                                unit: "pt"
                            };
                        }
                        if (children[i].attributes['w:after'] && !isNaN(children[i].attributes['w:after'].value)) {
                            result.dimensionCSSRules.marginBottom = {
                                value: children[i].attributes['w:after'].value / 20,
                                unit: "pt"
                            };
                        }
                        break;
                    case "kern":
                        if (children[i] && !isNaN(children[i].attributes['w:val'])) {
                            result.dimensionCSSRules.letterSpacing = {
                                value: children[i].attributes['w:val'].value / 20,
                                unit: "pt"
                            };
                        }
                        break;
                    case "rStyle":
                        if (children[i].attributes['w:val']) {
                            copy(result, this._parseTextDocumentReferenceStyle(children[i].attributes['w:val'].value));
                        }
                        break;
                    case "w":
                        result.options.textScale = ( !! children[i].attributes['w:val'] && !isNaN(children[i].attributes['w:val'].value)) ? +children[i].attributes['w:val'].value : result.options.textScale;
                        break;
                    case "em":
                        result.options.emphasis = this._parseEmphasis(children[i].attributes['w:val']);
                        break;
                    case "highlight":
                        result.options.highlight = (
                            children[i].attributes['w:val']
                        ) ? this.normalizeColorValue(children[i].attributes['w:val'].value) : result.options.highlight;
                        break;
                    case "bdr":
                        result.options.textBorder = {
                            color: (
                                children[i].attributes['w:color'] &&
                                this.normalizeColorValue(children[i].attributes['w:color'].value)
                            ) || "",
                            themeColor: (
                                children[i].attributes['w:themeColor'] &&
                                this.normalizeColorValue(children[i].attributes['w:themeColor'].value)
                            ) || "",
                            shadow: this.attributeToBoolean(children[i].attributes['w:shadow']),
                            frame: this.attributeToBoolean(children[i].attributes['w:frame'])
                        };

                        if (children[i].attributes['w:sz'] && !isNaN(children[i].attributes['w:sz'].value)) {
                            result.options.textBorder.width = {
                                value: children[i].attributes['w:sz'].value / 8,
                                unit: "pt"
                            };
                        }

                        break;
                    case "keepNext":
                        result.options.keepNext = children[i] ? this.attributeToBoolean(children[i].attributes['w:val']) : false;
                        break;
                    case "outlineLvl":
                        result.options.outlineLevel = (
                            children[i] && children[i].attributes['w:val'] && !isNaN(
                                children[i].attributes['w:val'].value
                            )
                        ) ? +children[i].attributes['w:val'].value : 0;
                        break;
                    case "numPr":
                        numIdNode = children[i].querySelector('numId');
                        levelNode = children[i].querySelector('ilvl');
                        result.options.numbering = {
                            id: (
                                numIdNode && numIdNode.attributes['w:val'] && !isNaN(numIdNode.attributes['w:val'].value)
                            ) ? +numIdNode.attributes['w:val'].value : 0,
                            level: (
                                levelNode && levelNode.attributes['w:val'] && !isNaN(levelNode.attributes['w:val'].value)
                            ) ? +levelNode.attributes['w:val'].value : 0
                        };
                        break;
                    case "tblBorders":
                        copy(result, this._parseTableBorderStyle({
                            node: children[i]
                        }));
                        horizontalBorder = children[i].querySelector('insideH');
                        verticalBorder = children[i].querySelector('insideV');
                        cellBorderBottom = horizontalBorder ? this._parseTableBorderProperties(horizontalBorder) : null;
                        cellBorderRight = verticalBorder ? this._parseTableBorderProperties(verticalBorder) : null;

                        if (cellBorderBottom || cellBorderRight) {
                            result.cellsStyleProperties = {
                                css: {}
                            };

                            if (cellBorderRight) {
                                result.cellsStyleProperties.css.borderRightWidth = cellBorderRight.width;
                                result.cellsStyleProperties.css.borderRightColor = cellBorderRight.color;
                                result.cellsStyleProperties.css.borderRightStyle = cellBorderRight.style;
                            }

                            if (cellBorderBottom) {
                                result.cellsStyleProperties.css.borderBottomWidth = cellBorderBottom.width;
                                result.cellsStyleProperties.css.borderBottomColor = cellBorderBottom.color;
                                result.cellsStyleProperties.css.borderBottomStyle = cellBorderBottom.style;
                            }
                        }
                        break;
                    case "lang":
                        result.options.language = this._parseLanguageNode(children[i]);
                        break;
                    }
                }

                return result;
            },
            _parseApplicationInfo: function (xml) {
                var i,
                    result = {
                        template: "",
                        totalTime: 0,
                        pagesCount: 0,
                        wordsCount: 0,
                        characters: 0,
                        charactersWithSpaces: 0,
                        application: '',
                        security: 0,
                        linesCount: 0,
                        scaleCrop: false,
                        linksUpToDateCrop: false,
                        hyperlinksChanged: false,
                        company: '',
                        version: '',
                        isShared: false
                    },
                    children = $.children($.children(xml)[0]);

                for (i = children.length - 1; i >= 0; i--) {
                    switch (children[i].localName) {
                    case "Template":
                        result.template = children[i].textContent || '';
                        break;
                    case "TotalTime":
                        result.totalTime = +(children[i].textContent || 0);
                        break;
                    case "Pages":
                        result.pagesCount = +(children[i].textContent || 0);
                        break;
                    case "Words":
                        result.wordsCount = +(children[i].textContent || 0);
                        break;
                    case "Characters":
                        result.characters = +(children[i].textContent || 0);
                        break;
                    case "CharactersWithSpaces":
                        result.charactersWithSpaces = +(children[i].textContent || 0);
                        break;
                    case "DocSecurity":
                        result.security = +(children[i].textContent || 0);
                        break;
                    case "Lines":
                        result.linesCount = +(children[i].textContent || 0);
                        break;
                    case "Application":
                        result.application = children[i].textContent || "";
                        break;
                    case "Company":
                        result.company = children[i].textContent || "";
                        break;
                    case "AppVersion":
                        result.version = children[i].textContent || "";
                        break;
                    case "ScaleCrop":
                        result.scaleCrop = children[i].textContent || "";
                        break;
                    case "LinksUpToDate":
                        result.linksUpToDateCrop = children[i].textContent == 'true';
                        break;
                    case "HyperlinksChanged":
                        result.hyperlinksChanged = children[i].textContent == 'true';
                        break;
                    case "SharedDoc":
                        result.isShared = children[i].textContent == 'true';
                        break;
                    }
                }

                return result;
            },
            _parseDocumentInfo: function (xml) {
                var i,
                    children = $.children(xml),
                    result = {
                        creator: "",
                        lastModifiedBy: "",
                        revision: 0,
                        dateCreated: null,
                        dateModified: null
                    };

                for (i = children.length - 1; i >= 0; i--) {
                    switch (children[i].localName) {
                    case "creator":
                        result.creator = children[i].textContent || '';
                        break;
                    case "lastModifiedBy":
                        result.lastModifiedBy = children[i].textContent || '';
                        break;
                    case "revision":
                        result.revision = +(children[i].textContent || 0);
                        break;
                    case "created":
                        result.dateCreated = children[i].textContent ? new Date(children[i].textContent) : null;
                        break;
                    case "modified":
                        result.dateModified = children[i].textContent ? new Date(children[i].textContent) : null;
                        break;
                    }
                }

                return result;
            },
            _parseDocumentTheme: function (xml) {
                var themeElementsNode = xml.querySelector('themeElements'),
                    themeElements,
                    i,
                    font,
                    fontNode,
                    result = {
                        css: {}
                    };

                if (themeElementsNode) {
                    themeElements = $.children(themeElementsNode);

                    for (i = themeElements.length - 1; i >= 0; i--) {
                        if (themeElements[i].localName == "fontScheme") {
                            fontNode = themeElements[i].querySelector('minorFont');
                            font = fontNode.querySelector('latin');

                            if (font && font.attributes.typeface && font.attributes.typeface.value) {
                                result.css.fontFamily = font.attributes.typeface.value;
                            }

                            fontNode = themeElements[i].querySelector('majorFont');
                            font = fontNode.querySelector('latin');

                            if (font && font.attributes.typeface && font.attributes.typeface.value) {
                                result.css.fontFamily = font.attributes.typeface.value;
                            }

                            break;
                        }
                    }
                }

                return result;
            },
            _parseEmphasis: function (attribute) {
                var result = "";

                if (attribute) {
                    switch (attribute.value) {
                    case "dot":
                        result = "dotted";
                        break;
                    case "comma":
                        result = "comma";
                        break;
                    case "circle":
                        result = "circle";
                        break;
                    case "underDot":
                        result = "underDotted";
                        break;
                    }
                }
                return result;
            },
            _parseFontsInfo: function (xml) {
                var fontInfoNodes = xml.childNodes[0] ? $.children(xml.childNodes[0]) : [],
                    result = {},
                    self = this,
                    attributesCount,
                    k,
                    i,
                    j,
                    len,
                    nameAttribute,
                    children;

                for (i = fontInfoNodes.length - 1; i >= 0; i--) {
                    nameAttribute = fontInfoNodes[i].attributes['w:name'];

                    if (nameAttribute && nameAttribute.value) {
                        result[nameAttribute.value] = {};
                        children = $.children(fontInfoNodes[i]);
                        len = children.length;

                        for (j = len - 1; j >= 0; j--) {
                            switch (children[j].localName) {
                            case "panose1":
                                if (children[j].attributes['w:val'] && children[j].attributes['w:val'].value) {
                                    result[nameAttribute.value].panose1 = children[j].attributes['w:val'].value;
                                }
                                break;
                            case "charset":
                                if (children[j].attributes['w:val'] && children[j].attributes['w:val'].value) {
                                    result[nameAttribute.value].charset = children[j].attributes['w:val'].value;
                                }
                                break;
                            case "family":
                                if (children[j].attributes['w:val'] && children[j].attributes['w:val'].value) {
                                    result[nameAttribute.value].family = children[j].attributes['w:val'].value;
                                }
                                break;
                            case "pitch":
                                if (children[j].attributes['w:val'] && children[j].attributes['w:val'].value) {
                                    result[nameAttribute.value].pitch = children[j].attributes['w:val'].value;
                                }
                                break;
                            case "sig":
                                result[nameAttribute.value].signature = {};
                                attributesCount = children[j].attributes.length;

                                for (k = 0; k < attributesCount; k++) {
                                    if (children[j].attributes[k] && children[j].attributes[k].value) {
                                        result[nameAttribute.value].signature[
                                            self.replaceAttributeNamespace(children[j].attributes[k].name)
                                        ] = children[j].attributes[k].value;
                                    }
                                }
                                break;
                            }
                        }
                    }
                }
                return result;
            },
            _parseLanguageNode: function (node) {
                var result = {
                    latin: null,
                    eastAsia: null,
                    complexLanguage: null
                };
                if (node) {
                    result.latin = (node.attributes['w:val']) ? node.attributes['w:val'] || result.latin : result.latin;
                    result.complexLanguage =
                        (node.attributes['w:bidi']) ? (
                        node.attributes['w:bidi'] || result.complexLanguage
                    ) : result.complexLanguage;
                    result.eastAsia = (node.attributes['w:eastAsia']) ? (
                        node.attributes['w:eastAsia'] || result.eastAsia
                    ) : result.eastAsia;
                }
                return result;
            },
            _parseRelations: function (xml) {
                var relationsNodes = xml.childNodes[0] ? $.children(xml.childNodes[0]) : [],
                    result = {},
                    i,
                    idAttribute,
                    typeAttribute,
                    targetAttribute;

                for (i = relationsNodes.length - 1; i >= 0; i--) {
                    if (relationsNodes[i].attributes) {
                        idAttribute = relationsNodes[i].attributes.Id;
                        typeAttribute = relationsNodes[i].attributes.Type;
                        targetAttribute = relationsNodes[i].attributes.Target;

                        if (idAttribute && typeAttribute && targetAttribute) {
                            result[idAttribute.value] = {
                                id: idAttribute.value || '',
                                type: typeAttribute.value || '',
                                target: targetAttribute.value || ''
                            };
                        }
                    }
                }

                return result;
            },
            _parseRunNode: function (data) {
                var result = copy({}, {
                    css: jDoc.clone(data.documentData.styles.defaults.paragraphContent.css),
                    dimensionCSSRules: jDoc.clone(data.documentData.styles.defaults.paragraphContent.dimensionCSSRules),
                    options: {
                        elementHeight: {
                            value: 0,
                            unit: "pt"
                        }
                    },
                    attributes: {},
                    properties: {}
                }, data.cssRules),
                    paragraphContentProperties = data.node.querySelector('rPr'),
                    paragraphContentText = null,
                    paragraphContentImage = data.node.querySelector('drawing'),
                    pictureNode = data.node.querySelector('pict'),
                    len = data.node.attributes.length,
                    pictureGroup,
                    partInfo = {},
                    textBoxContentChildren,
                    textBoxContentChildrenCount,
                    imageData = null,
                    textBox,
                    attrName,
                    mediaData,
                    inlineNode,
                    extentNode,
                    horizontalPositionNode,
                    verticalPositionNode,
                    effectExtentNode,
                    optionsNode,
                    blipNode,
                    offsetNode,
                    extentsNode,
                    geometryNode,
                    offset = 0,
                    textBoxContent,
                    styleProperties,
                    pictureNodeChildren,
                    h,
                    k,
                    j;

                for (k = 0; k < len; k++) {
                    if (data.node.attributes[k].value) {
                        result[this.replaceAttributeNamespace(data.node.attributes[k].name)] =
                            isNaN(data.node.attributes[k].value) ? data.node.attributes[k].value : +data.node.attributes[k].value;
                    }
                }

                if (paragraphContentProperties) {
                    styleProperties = this._getTextDocumentStyleProperties({
                        node: paragraphContentProperties,
                        documentData: data.documentData
                    });
                    copy(result.css, styleProperties.css);
                    copy(result.dimensionCSSRules, styleProperties.dimensionCSSRules);
                }

                if (pictureNode) {
                    pictureGroup = pictureNode.querySelector('group');

                    if (pictureGroup) {
                        copy(result, {
                            css: {},
                            dimensionCSSRules: {},
                            parts: [],
                            options: {
                                isSchema: true
                            }
                        });

                        if (pictureGroup.attributes.style && pictureGroup.attributes.style.value) {
                            copy(result, this._parseStyleAttribute(pictureGroup.attributes.style.value));

                            delete result.dimensionCSSRules.margin;
                        }

                        result.css.margin = "auto";
                        result.css.position = "relative";
                        result.css.overflow = "hidden";
                        result.css.textIndent = 0;

                        if (result.dimensionCSSRules.height) {
                            result.options.elementHeight.value = result.dimensionCSSRules.height.value;
                        }

                        partInfo = {};
                        imageData = null;
                        pictureNodeChildren = $.children(pictureGroup);
                        len = pictureNodeChildren.length;

                        for (k = 0; k < len; k++) {
                            partInfo = {
                                css: {},
                                dimensionCSSRules: {},
                                attributes: {},
                                children: [],
                                options: {
                                    backgroundRelationID: null
                                }
                            };
                            switch (pictureNodeChildren[k].localName) {
                            case "shape":
                                if (
                                    pictureNodeChildren[k].attributes.style &&
                                    pictureNodeChildren[k].attributes.style.value
                                ) {
                                    copy(
                                        partInfo,
                                        this._parseStyleAttribute(
                                            pictureNodeChildren[k].attributes.style.value, {
                                                denominator: 20
                                            }
                                        )
                                    );
                                }
                                if (
                                    pictureNodeChildren[k].attributes.strokeweight &&
                                    pictureNodeChildren[k].attributes.strokeweight.value
                                ) {
                                    partInfo.css.borderStyle = "solid";
                                    partInfo.dimensionCSSRules.borderWidth = {
                                        value: 1,
                                        unit: "px"
                                    };
                                    partInfo.css.borderColor = "#000000";

                                    // in pt
                                    if (partInfo.dimensionCSSRules.height) {
                                        partInfo.dimensionCSSRules.height.value -= 1.45;
                                    }
                                    if (partInfo.dimensionCSSRules.width) {
                                        partInfo.dimensionCSSRules.width.value -= 1.45;
                                    }
                                }
                                imageData = pictureNodeChildren[k].querySelector('imagedata');
                                if (imageData) {
                                    if (
                                        imageData.attributes['o:title'] &&
                                        imageData.attributes['o:title'].value
                                    ) {
                                        partInfo.attributes.title = imageData.attributes['o:title'].value;
                                    }
                                    if (
                                        imageData.attributes['r:id'] && imageData.attributes['r:id'].value
                                    ) {
                                        mediaData = this._getMediaFromRelation({
                                            relationId: imageData.attributes['r:id'].value,
                                            documentData: data.documentData
                                        });

                                        if (mediaData) {
                                            partInfo.css.backgroundImage = 'url("' + mediaData.data + '")';
                                            partInfo.css.backgroundRepeat = "no-repeat";
                                        }
                                    }
                                }
                                partInfo.css.zIndex = k + 2;
                                result.parts.push(partInfo);
                                break;
                            case "rect":
                                if (
                                    pictureNodeChildren[k].attributes.style &&
                                    pictureNodeChildren[k].attributes.style.value
                                ) {
                                    copy(
                                        partInfo,
                                        this._parseStyleAttribute(
                                            pictureNodeChildren[k].attributes.style.value, {
                                                denominator: 20
                                            }
                                        )
                                    );
                                }

                                if (pictureNodeChildren[k].attributes.strokeweight &&
                                    pictureNodeChildren[k].attributes.strokeweight.value) {
                                    partInfo.css.borderStyle = "solid";
                                    partInfo.dimensionCSSRules.borderWidth = {
                                        value: 1,
                                        unit: "px"
                                    };
                                    partInfo.css.borderColor = "#000000";

                                    /**
                                     * in pt
                                     */
                                    if (partInfo.dimensionCSSRules.height) {
                                        partInfo.dimensionCSSRules.height.value -= 1.45;
                                    }
                                    if (partInfo.dimensionCSSRules.width) {
                                        partInfo.dimensionCSSRules.width.value -= 1.45;
                                    }
                                }

                                textBox = pictureNodeChildren[k].querySelector('textbox');

                                if (textBox) {
                                    textBoxContent = textBox.querySelector('txbxContent');

                                    if (textBoxContent) {
                                        textBoxContentChildren = $.children(textBoxContent);
                                        textBoxContentChildrenCount = textBoxContentChildren.length;

                                        for (j = 0; j < textBoxContentChildrenCount; j++) {
                                            if (textBoxContentChildren[j].localName === "p") {
                                                partInfo.children.push(
                                                    this._parseTextDocumentParagraphNode({
                                                        node: textBoxContentChildren[j],
                                                        cssRules: {
                                                            css: {
                                                                wordWrap: "normal",
                                                                wordBreak: "normal",
                                                                width: "auto"
                                                            }
                                                        },
                                                        documentData: data.documentData
                                                    })
                                                );
                                            }
                                        }
                                    }
                                }
                                partInfo.css.zIndex = k + 2;
                                result.parts.push(partInfo);
                                break;
                            }
                        }
                    }
                } else if (paragraphContentImage) {
                    inlineNode = paragraphContentImage.querySelector('inline');
                    extentNode = paragraphContentImage.querySelector('extent');
                    horizontalPositionNode = paragraphContentImage.querySelector('positionH');
                    verticalPositionNode = paragraphContentImage.querySelector('positionV');
                    effectExtentNode = paragraphContentImage.querySelector('effectExtent');
                    optionsNode = paragraphContentImage.querySelector('docPr');
                    blipNode = paragraphContentImage.querySelector('blip');
                    offsetNode = paragraphContentImage.querySelector('off');
                    extentsNode = paragraphContentImage.querySelector('ext');
                    geometryNode = paragraphContentImage.querySelector('prstGeom');

                    copy(result.options, {
                        isImage: true,
                        isHidden: false,
                        relationID: "",
                        offset: {},
                        extents: {},
                        shapeType: "",
                        inline: {
                            extent: {},
                            effectExtent: {
                                left: 0,
                                top: 0,
                                right: 0,
                                bottom: 0
                            }
                        },
                        nonVisualProperties: {}
                    });

                    if (geometryNode) {
                        result.options.shapeType =
                            geometryNode.attributes['prst'] ? this._prepareShapeType(geometryNode.attributes['prst']) : "";
                    }
                    if (blipNode && blipNode.attributes['r:embed'] && blipNode.attributes['r:embed'].value) {
                        mediaData = this._getMediaFromRelation({
                            relationId: blipNode.attributes['r:embed'].value,
                            documentData: data.documentData
                        });

                        if (mediaData) {
                            result.attributes.src = mediaData.data;
                        }
                    }
                    if (offsetNode) {
                        if (!isNaN(offsetNode.attributes['y'])) {
                            result.options.offset.top = {
                                value: +offsetNode.attributes['y'],
                                unit: "pt"
                            };
                        }

                        if (!isNaN(offsetNode.attributes['x'])) {
                            result.options.offset.left = {
                                value: +offsetNode.attributes['x'],
                                unit: "pt"
                            };
                        }
                    }
                    if (horizontalPositionNode) {
                        offset = horizontalPositionNode.querySelector('posOffset');
                        result.css.position = "relative";
                        if (
                            horizontalPositionNode.attributes['relativeFrom'] &&
                            (
                                horizontalPositionNode.attributes['relativeFrom'].value == 'column' ||
                                horizontalPositionNode.attributes['relativeFrom'].value == 'character'
                            )
                        ) {
                            result.options.parentCss = result.options.parentCss || {};
                            result.options.parentCss.position = "relative";
                        }
                        if (offset && offset.textContent) {
                            result.dimensionCSSRules.left = this._convertEMU(offset.textContent);
                        }
                    }
                    if (verticalPositionNode) {
                        offset = verticalPositionNode.querySelector('posOffset');
                        result.css.position = "relative";
                        if (
                            verticalPositionNode.attributes['relativeFrom'] &&
                            (
                                verticalPositionNode.attributes['relativeFrom'].value == 'column' ||
                                verticalPositionNode.attributes['relativeFrom'].value == 'character'
                            )
                        ) {
                            result.options.parentCss = result.options.parentCss || {};
                            result.options.parentCss.position = "relative";
                        }
                        if (offset && offset.textContent) {
                            result.dimensionCSSRules.top = this._convertEMU(offset.textContent);
                        }
                    }
                    if (extentsNode) {
                        if (!isNaN(extentsNode.attributes['y'])) {
                            result.options.extents.top = {
                                value: +extentsNode.attributes['y'],
                                unit: "pt"
                            };
                        }

                        if (!isNaN(extentsNode.attributes['x'])) {
                            result.options.extents.left = {
                                value: +extentsNode.attributes['x'],
                                unit: "pt"
                            };
                        }
                    }
                    if (inlineNode) {
                        len = inlineNode.attributes.length;
                        for (k = 0; k < len; k++) {
                            if (inlineNode.attributes[k].value) {
                                result.options.inline[
                                    this.replaceAttributeNamespace(inlineNode.attributes[k].name)
                                ] = isNaN(inlineNode.attributes[k].value) ?
                                    inlineNode.attributes[k].value : +inlineNode.attributes[k].value;
                            }
                        }
                    }
                    if (optionsNode) {
                        result.attributes.id = (
                            optionsNode.attributes['id'] && optionsNode.attributes['id'].value
                        ) || result.attributes.id;
                        result.attributes.name = (
                            optionsNode.attributes['name'] && optionsNode.attributes['name'].value
                        ) || result.attributes.name || '';
                        result.options.isHidden = this.attributeToBoolean(optionsNode.attributes['descr']);
                        result.attributes.alt = (
                            optionsNode.attributes['descr'] && optionsNode.attributes['descr'].value
                        ) || result.attributes.alt || result.attributes.name;
                    }
                    if (extentNode) {
                        if (extentNode.attributes['cy'] && !isNaN(extentNode.attributes['cy'].value)) {
                            h = this._convertEMU(extentNode.attributes['cy'].value);

                            result.options.parentDimensionCSSRules = result.options.parentDimensionCSSRules || {};
                            result.options.parentDimensionCSSRules.height = h;

                            result.options.parentCss = result.options.parentCss || {};
                            result.options.parentCss.overflowY = 'hidden';
                        }
                        if (extentNode.attributes['cx'] && !isNaN(extentNode.attributes['cx'].value)) {
                            result.dimensionCSSRules.width = this._convertEMU(extentNode.attributes['cx'].value);
                        }
                    }
                    if (effectExtentNode) {
                        len = effectExtentNode.attributes.length;
                        for (k = 0; k < len; k++) {
                            if (effectExtentNode.attributes[k].value) {
                                attrName = this.replaceAttributeNamespace(effectExtentNode.attributes[k].name);

                                switch (attrName) {
                                case "l":
                                    if (!isNaN(effectExtentNode.attributes[k].value)) {
                                        result.dimensionCSSRules.left = {
                                            value: +effectExtentNode.attributes[k].value,
                                            unit: "emu"
                                        };
                                    }
                                    break;
                                case "r":
                                    if (!isNaN(effectExtentNode.attributes[k].value)) {
                                        result.dimensionCSSRules.right = {
                                            value: +effectExtentNode.attributes[k].value,
                                            unit: "emu"
                                        };
                                    }
                                    break;
                                case "b":
                                    if (!isNaN(effectExtentNode.attributes[k].value)) {
                                        result.dimensionCSSRules.bottom = {
                                            value: +effectExtentNode.attributes[k].value,
                                            unit: "emu"
                                        };
                                    }
                                    break;
                                case "top":
                                    if (!isNaN(effectExtentNode.attributes[k].value)) {
                                        result.dimensionCSSRules.bottom = {
                                            value: +effectExtentNode.attributes[k].value,
                                            unit: "emu"
                                        };
                                    }
                                    break;
                                default:
                                    result.options.inline.effectExtent[attrName] = effectExtentNode.attributes[k].value;
                                }
                            }
                        }
                    }

                    if (result.dimensionCSSRules.height) {
                        result.options.elementHeight.value = result.dimensionCSSRules.height.value;
                    }
                } else {
                    paragraphContentText = data.node.querySelector('t');
                    result.properties.textContent = paragraphContentText ? paragraphContentText.textContent || '' : '';

                    if (/^\s+$/.test(result.properties.textContent)) {
                        result.properties.textContent = result.properties.textContent.replace(/\s/g, '\u2000');
                    }
                }

                return result;
            },
            _parseShadowProperty: function (node) {
                var result = "none";

                if (
                    node &&
                    node.attributes['w:val'] &&
                    node.attributes['w:color'] &&
                    this._shadowPatterns[node.attributes['w:val'].value]
                ) {
                    result = this._shadowPatterns[node.attributes['w:val'].value] + " " + node.attributes['w:color'];
                }

                return result;
            },
            _parseStyleAttribute: function (value, options) {
                var result = {
                    css: {},
                    dimensionCSSRules: {}
                },
                    k = 0,
                    stylePartitions = String(value).split(';'),
                    len = stylePartitions.length,
                    stylePartitionData,
                    attr;

                if (value) {
                    stylePartitions = String(value).split(';');
                    len = stylePartitions.length;
                    stylePartitionData = null;

                    if (typeof options !== "object") {
                        options = {};
                    }
                    if (isNaN(options.denominator)) {
                        options.denominator = 1;
                    }

                    for (k = 0; k < len; k++) {
                        stylePartitionData = stylePartitions[k].split(":");
                        attr = stylePartitionData[0];

                        if (attr === "width" || attr === "height" || attr === "left" || attr === "top") {
                            result.dimensionCSSRules[attr] = {
                                value: this._cropUnits(stylePartitionData[1].trim()) / options.denominator,
                                unit: "pt"
                            };
                        } else if (attr === "visibility" || attr === "position") {
                            result.css[attr] = stylePartitionData[1].trim();
                        }
                    }
                }

                return result;
            },
            _parseStyleEffectProperty: function (node) {
                return (node && node.attributes['w:val']) ? this._effectPatterns[node.attributes['w:val']] || "none" : "none";
            },
            _parseTableBorderProperties: function (node) {
                var borderColor = (
                    node.attributes['w:color'] && node.attributes['w:color'].value
                ) ? node.attributes['w:color'].value : "";

                return {
                    width: (
                        node.attributes['w:sz'] && !isNaN(node.attributes['w:sz'].value)
                    ) ? {
                        value: node.attributes['w:sz'].value / 8,
                        unit: "pt"
                    } : 0,
                    style: "solid",
                    color: this.normalizeColorValue(borderColor)
                };
            },
            _parseTableBorderStyle: function (options) {
                var result = {
                    css: {},
                    dimensionCSSRules: {}
                },
                    i,
                    borderInfo,
                    rulePart,
                    children = $.children(options.node);

                for (i = children.length - 1; i >= 0; i--) {
                    if (["top", "left", "right", "bottom"].indexOf(children[i].localName) >= 0) {
                        rulePart = children[i].localName.charAt(0).toUpperCase() + children[i].localName.slice(1);
                        borderInfo = this._parseTableBorderProperties(children[i]);
                        result.dimensionCSSRules['border' + rulePart + 'Width'] = borderInfo.width;
                        result.css['border' + rulePart + 'Style'] = borderInfo.style;
                        result.css['border' + rulePart + 'TopColor'] = borderInfo.color;
                    }
                }

                return result;
            },
            _parseTableElementWidth: function (widthPropertyNode) {
                var result = {
                    value: 100,
                    unit: "%"
                },
                    type = (
                        widthPropertyNode.attributes['w:type'] &&
                        widthPropertyNode.attributes['w:type'].value &&
                        widthPropertyNode.attributes['w:type'] != 'nil'
                    ) ? widthPropertyNode.attributes['w:type'].value : null,
                    width = (
                        widthPropertyNode.attributes['w:w'] && !isNaN(widthPropertyNode.attributes['w:w'].value)
                    ) ? +widthPropertyNode.attributes['w:w'].value : 0;

                if (type && width) {
                    if (type === "pct") {
                        result = {
                            value: width,
                            unit: "%"
                        };
                    } else if (type === "dxa") {
                        result = {
                            value: width / 20,
                            unit: "pt"
                        };
                    }
                }

                return result;
            },
            _parseTextDocumentContent: function (params) {
                params.documentData._heading = [];

                var documentData = params.documentData,
                    result = {
                        name: this.getFileName(),
                        wordsCount: (documentData.applicationInfo && documentData.applicationInfo.wordsCount) || null,
                        zoom: (documentData.settings && documentData.settings.zoom) || 100,
                        pages: []
                    },
                    pageOptions = {
                        css: {},
                        dimensionCSSRules: {},
                        options: {
                            pageIndex: 0,
                            pageNumber: null,
                            header: {
                                css: {},
                                dimensionCSSRules: {}
                            },
                            footer: {
                                css: {},
                                dimensionCSSRules: {}
                            },
                            columns: {
                                equalWidth: false,
                                space: 0,
                                number: 0,
                                separated: false
                            }
                        }
                    },
                    self = this,
                    i = 0,
                    pageElements = [],
                    pageLinesHeight = 0,
                    cachedLength = 0,
                    callbacks = 0,
                    lineNodeData = {},
                    listLine = null,
                    iteration,
                    children,
                    page,
                    sectionProperties,
                    len,
                    pageHeight = 0,
                    c,
                    lazyLoopOptions,
                    bodyNode = params.xml.querySelector('body');

                params.documentData.styles.defaults.options.pageContentWidth = {
                    value: 0,
                    unit: "pt"
                };

                if (bodyNode) {
                    lazyLoopOptions = {
                        chunk: 20,
                        time: 0,
                        data: $.children(bodyNode),
                        index: 0
                    };

                    lazyLoopOptions.len = lazyLoopOptions.data.length;
                    lazyLoopOptions.all = lazyLoopOptions.len;

                    sectionProperties = lazyLoopOptions.data[lazyLoopOptions.len - 1];

                    if (sectionProperties.localName === 'sectPr') {
                        /**
                         * @description remove last iteration - iteration with sectionProperties
                         */
                        lazyLoopOptions.len--;
                        lazyLoopOptions.all = lazyLoopOptions.len;

                        children = $.children(sectionProperties);
                        len = children.length;

                        for (c = len - 1; c >= 0; c--) {
                            switch (children[c].localName) {
                            case "pgSz":
                                if (children[c].attributes['w:w'] && !isNaN(children[c].attributes['w:w'].value)) {
                                    pageOptions.dimensionCSSRules.width = {
                                        value: children[c].attributes['w:w'].value / 20,
                                        unit: "pt"
                                    };

                                    params.documentData.styles.defaults.options.pageContentWidth.value +=
                                        pageOptions.dimensionCSSRules.width.value;
                                }

                                if (children[c].attributes['w:h'] && !isNaN(children[c].attributes['w:h'].value)) {
                                    pageOptions.dimensionCSSRules.height = {
                                        value: (+children[c].attributes['w:h'].value / 20),
                                        unit: "pt"
                                    };

                                    pageHeight += pageOptions.dimensionCSSRules.height.value;
                                }

                                break;
                            case "pgMar":
                                if (children[c].attributes['w:top'] && !isNaN(children[c].attributes['w:top'].value)) {
                                    pageOptions.dimensionCSSRules.paddingTop = {
                                        value: children[c].attributes['w:top'].value / 20,
                                        unit: "pt"
                                    };

                                    pageHeight -= pageOptions.dimensionCSSRules.paddingTop.value;
                                }

                                if (children[c].attributes['w:left'] && !isNaN(children[c].attributes['w:left'].value)) {
                                    pageOptions.dimensionCSSRules.paddingLeft = {
                                        value: children[c].attributes['w:left'].value / 20,
                                        unit: "pt"
                                    };

                                    params.documentData.styles.defaults.options.pageContentWidth.value -=
                                        pageOptions.dimensionCSSRules.paddingLeft.value;
                                }

                                if (children[c].attributes['w:right'] && !isNaN(children[c].attributes['w:right'].value)) {
                                    pageOptions.dimensionCSSRules.paddingRight = {
                                        value: children[c].attributes['w:right'].value / 20,
                                        unit: "pt"
                                    };

                                    params.documentData.styles.defaults.options.pageContentWidth.value -=
                                        pageOptions.dimensionCSSRules.paddingRight.value;
                                }

                                if (children[c].attributes['w:bottom'] && !isNaN(children[c].attributes['w:bottom'].value)) {
                                    pageOptions.dimensionCSSRules.paddingBottom = {
                                        value: children[c].attributes['w:bottom'].value / 20,
                                        unit: "pt"
                                    };

                                    pageHeight -= pageOptions.dimensionCSSRules.paddingBottom.value;
                                }

                                if (
                                    pageOptions.options.pageNumber &&
                                    children[c].attributes['w:header'] && !isNaN(children[c].attributes['w:header'].value)
                                ) {
                                    pageOptions.options.header.dimensionCSSRules.height = {
                                        value: children[c].attributes['w:header'].value / 20,
                                        unit: "pt"
                                    };
                                }
                                if (
                                    children[c].attributes['w:footer'] && !isNaN(children[c].attributes['w:footer'].value)
                                ) {
                                    pageOptions.options.footer.dimensionCSSRules.height = {
                                        value: children[c].attributes['w:footer'].value / 20,
                                        unit: "pt"
                                    };
                                }

                                if (
                                    children[c].attributes['w:gutter'] && !isNaN(children[c].attributes['w:gutter'].value)
                                ) {
                                    pageOptions.dimensionCSSRules.marginTop = {
                                        value: children[c].attributes['w:gutter'].value / 20,
                                        unit: "pt"
                                    };
                                }

                                break;
                            case "pgNumType":
                                pageOptions.options.pageNumber = {
                                    value: 0,
                                    start: (
                                        children[c].attributes['w:start'] && !isNaN(children[c].attributes['w:start'].value)
                                    ) ? +children[c].attributes['w:start'].value : 1
                                };
                                break;
                            case "cols":
                                pageOptions.options.columns.equalWidth =
                                    self.attributeToBoolean(children[c].attributes['w:equalWidth']);
                                pageOptions.options.columns.separated =
                                    self.attributeToBoolean(children[c].attributes['w:sep']);
                                pageOptions.options.columns.number = (
                                    children[c].attributes['w:num'] && !isNaN(children[c].attributes['w:num'])
                                ) ? +children[c].attributes['w:num'] : pageOptions.options.columns.number;
                                pageOptions.options.columns.space = (
                                    children[c].attributes['w:space'] && !isNaN(children[c].attributes['w:space'].value)
                                ) ? {
                                    value: (+children[c].attributes['w:space'].value / 20),
                                    unit: "pt"
                                } : pageOptions.options.columns.space;
                                break;
                            case "docGrid":
                                if (
                                    children[c].attributes['w:linePitch'] && !isNaN(children[c].attributes['w:linePitch'].value)
                                ) {
                                    params.documentData.styles.defaults.options.linePitch = {
                                        value: children[c].attributes['w:linePitch'].value / 20,
                                        unit: "pt"
                                    };
                                }
                                break;
                            }
                        }

                        cachedLength = sectionProperties.attributes.length;
                        for (i = 0; i < cachedLength; i++) {
                            if (sectionProperties.attributes[i].value) {
                                pageOptions.options[self.replaceAttributeNamespace(sectionProperties.attributes[i].name)] = (
                                    isNaN(sectionProperties.attributes[i].value)
                                ) ? sectionProperties.attributes[i].value : (+sectionProperties.attributes[i].value);
                            }
                        }
                    }

                    iteration = function (options) {
                        options.end = options.index + (options.all > options.chunk ? options.chunk : options.all);
                        setTimeout(function () {
                            for (options.index; options.index < options.end; options.index++) {
                                var localName = options.data[options.index].localName,
                                    lineHeight = 0,
                                    isListItem;

                                if (localName === "p") {
                                    lineNodeData = self._parseTextDocumentParagraphNode({
                                        node: options.data[options.index],
                                        documentData: params.documentData
                                    });
                                    lineHeight = lineNodeData.options.elementHeight.value;
                                    isListItem = lineNodeData.options.isListItem;

                                    if (isListItem) {
                                        if (!listLine) {
                                            listLine = {
                                                options: {
                                                    isList: true
                                                },
                                                dimensionCSSRules: {
                                                    padding: {
                                                        value: 0,
                                                        unit: "pt"
                                                    },
                                                    margin: {
                                                        value: 0,
                                                        unit: "pt"
                                                    }
                                                },
                                                children: []
                                            };
                                        }

                                        if (lineNodeData.dimensionCSSRules.paddingLeft) {
                                            listLine.dimensionCSSRules.paddingLeft = lineNodeData.dimensionCSSRules.paddingLeft;
                                            delete lineNodeData.dimensionCSSRules.paddingLeft;
                                        }

                                        if (lineNodeData.dimensionCSSRules.marginLeft) {
                                            listLine.dimensionCSSRules.marginLeft = lineNodeData.dimensionCSSRules.marginLeft;
                                            delete lineNodeData.dimensionCSSRules.marginLeft;
                                        }
                                    }

                                    pageLinesHeight = self._checkPageLinesHeight({
                                        pageOptions: pageOptions,
                                        pageHeight: pageHeight,
                                        lineHeight: lineHeight,
                                        pages: result.pages,
                                        pageLinesHeight: pageLinesHeight,
                                        pageElements: pageElements
                                    });

                                    if (!pageLinesHeight) {
                                        if (listLine) {
                                            pageElements.push(listLine);
                                            listLine = clone(listLine);
                                            listLine.children = [];
                                        }
                                        pageOptions.options.pageIndex++;
                                        pageElements = [];
                                        pageLinesHeight += lineHeight;
                                    }

                                    if (isListItem) {
                                        listLine.children.push(lineNodeData);
                                    } else if (listLine) {
                                        pageElements.push(listLine);
                                        listLine = null;
                                    } else {
                                        pageElements.push(lineNodeData);
                                    }

                                    callbacks++;
                                } else if (localName === 'tbl') {
                                    self._parseTextDocumentTableNode({
                                            tableNode: options.data[options.index],
                                            documentData: params.documentData
                                        },
                                        function (data) {
                                            var lineHeight = lineNodeData.options.elementHeight.value;

                                            pageLinesHeight = self._checkPageLinesHeight({
                                                pageOptions: pageOptions,
                                                pageHeight: pageHeight,
                                                lineHeight: lineHeight,
                                                pages: result.pages,
                                                pageLinesHeight: pageLinesHeight,
                                                pageElements: pageElements
                                            });

                                            if (!pageLinesHeight) {
                                                pageOptions.options.pageIndex++;
                                                pageElements = [];
                                            }

                                            pageElements.push(data);
                                            pageLinesHeight += lineHeight;

                                            callbacks++;
                                            return false;
                                        }
                                    );
                                } else {
                                    callbacks++;
                                }

                                if (callbacks >= options.len) {
                                    page = pageOptions;
                                    page.children = pageElements;
                                    result.pages.push(page);

                                    if (typeof params.callback === 'function') {
                                        params.callback(result);
                                    }
                                }
                            }
                            options.all = options.len - options.end;
                            if (options.index < options.len) {
                                iteration.call(self, options);
                            }
                            return true;
                        }, options.time);
                    };
                    iteration.call(self, lazyLoopOptions);
                } else {
                    if (typeof params.callback === 'function') {
                        params.callback(result);
                    }
                }

                return null;
            },
            _parseTextDocumentParagraphNode: function (params) {
                var elementInfo = {
                    options: {
                        isParagraph: true,
                        pageBreak: false,
                        elementHeight: {
                            value: params.documentData.styles.defaults.options.linePitch ?
                                params.documentData.styles.defaults.options.linePitch.value : 0,
                            unit: "pt"
                        }
                    },
                    attributes: {},
                    css: copy({}, params.documentData.styles.defaults.paragraph.css,
                        params.cssRules ? params.cssRules.css : {}),
                    dimensionCSSRules: copy({}, params.documentData.styles.defaults.paragraph.dimensionCSSRules,
                        params.cssRules ? params.cssRules.dimensionCSSRules : {}),
                    children: []
                },
                    hyperLinkChildren,
                    hyperLinkChildrenElement,
                    hyperLinkBlock,
                    k,
                    href,
                    relation,
                    lineHeight,
                    element,
                    defaultFontSize = {
                        value: 14,
                        unit: "pt"
                    },
                    letterWidth = {
                        value: defaultFontSize.value / 2,
                        unit: "pt"
                    },
                    elementHeight,
                    linesCount,
                    maxFontSize = 0,
                    n,
                    styleProperties,
                    children = $.children(params.node),
                    len,
                    textContentLength = 0,
                    length = params.node.attributes.length;

                for (k = 0; k < length; k++) {
                    if (params.node.attributes[k].value) {
                        elementInfo[this.replaceAttributeNamespace(params.node.attributes[k].name)] =
                            isNaN(params.node.attributes[k].value) ? params.node.attributes[k].value : +params.node.attributes[k].value;
                    }
                }

                length = children.length;

                for (n = 0; n < length; n++) {
                    switch (children[n].localName) {
                    case "bookmarkStart":
                        if (children[n].attributes['w:name'] && children[n].attributes['w:name'].value) {
                            elementInfo.children.push({
                                options: {
                                    isLink: true
                                },
                                attributes: {
                                    name: children[n].attributes['w:name'].value
                                }
                            });
                        }
                        break;
                    case "pPr":
                        styleProperties = this._getTextDocumentStyleProperties({
                            node: children[n],
                            documentData: params.documentData
                        });

                        if (styleProperties.options.isListItem) {
                            elementInfo.options.isParagraph = false;
                            elementInfo.options.isListItem = true;
                            /**
                             * @description Clear default styles for paragraph
                             * @type {*}
                             */
                            elementInfo.css = {};
                            elementInfo.dimensionCSSRules = {};
                        }

                        copy(elementInfo.css, styleProperties.css);
                        copy(elementInfo.dimensionCSSRules, styleProperties.dimensionCSSRules);
                        copy(elementInfo.attributes, styleProperties.attributes);

                        elementInfo.options.childrenCSSRules = styleProperties.options.childrenCSSRules;

                        if (elementInfo.dimensionCSSRules.height) {
                            elementInfo.options.elementHeight.value = elementInfo.dimensionCSSRules.height.value;
                        }

                        if (
                            elementInfo.dimensionCSSRules.minHeight &&
                            elementInfo.dimensionCSSRules.minHeight.value > elementInfo.options.elementHeight.value
                        ) {
                            elementInfo.options.elementHeight.value = elementInfo.dimensionCSSRules.minHeight.value;
                        }

                        break;
                    case "hyperlink":
                        hyperLinkChildren = $.children(children[n]);
                        len = hyperLinkChildren.length;
                        href = "#";

                        relation = children[n].attributes['r:id'] ? this._getRelation({
                            relationId: children[n].attributes['r:id'].value,
                            documentData: params.documentData
                        }) : null;
                        hyperLinkBlock = {
                            options: {
                                isLink: true
                            },
                            css: {
                                color: "#0000EE"
                            },
                            attributes: {},
                            children: []
                        };
                        for (k = 0; k < len; k++) {
                            hyperLinkChildrenElement = this._parseRunNode({
                                node: hyperLinkChildren[k],
                                cssRules: elementInfo.options.childrenCSSRules,
                                documentData: params.documentData
                            });
                            hyperLinkChildrenElement.css.color = "";

                            if (
                                hyperLinkChildrenElement.dimensionCSSRules.fontSize &&
                                hyperLinkChildrenElement.dimensionCSSRules.fontSize.value > maxFontSize
                            ) {
                                maxFontSize = hyperLinkChildrenElement.dimensionCSSRules.fontSize.value;
                            }

                            textContentLength += (
                                hyperLinkChildrenElement.properties.textContent ? (
                                    hyperLinkChildrenElement.properties.textContent.length * (
                                        hyperLinkChildrenElement.dimensionCSSRules.fontSize ? (
                                            hyperLinkChildrenElement.dimensionCSSRules.fontSize.value / defaultFontSize.value
                                        ) : 1
                                    )
                                ) : 0
                            );

                            hyperLinkBlock.children.push(hyperLinkChildrenElement);
                        }

                        if (relation) {
                            href = relation.target;
                            hyperLinkBlock.attributes.target = "_blank";
                        } else {
                            href += (
                                children[n].attributes['w:anchor'] && children[n].attributes['w:anchor'].value
                            ) || "";
                        }

                        hyperLinkBlock.attributes.href = href;

                        elementInfo.children.push(hyperLinkBlock);

                        break;
                    case "r":
                        element = this._parseRunNode({
                            node: children[n],
                            cssRules: elementInfo.options.childrenCSSRules,
                            documentData: params.documentData
                        });

                        textContentLength += (element.properties.textContent ? (
                            element.properties.textContent.length * (
                                element.dimensionCSSRules.fontSize ? (
                                    element.dimensionCSSRules.fontSize.value / defaultFontSize.value
                                ) : 1
                            )
                        ) : 0);

                        if (element.options.elementHeight.value > elementInfo.options.elementHeight.value) {
                            elementInfo.options.elementHeight.value = element.options.elementHeight.value;
                        }

                        if (
                            element.dimensionCSSRules.fontSize && element.dimensionCSSRules.fontSize.value > maxFontSize
                        ) {
                            maxFontSize = element.dimensionCSSRules.fontSize.value;
                        }

                        elementInfo.children.push(element);
                        break;
                    }
                }

                if (elementInfo.children[0] && elementInfo.children[0].options.isImage) {
                    /**
                     * Align image on center
                     */
                    if (!elementInfo.children[1] && !elementInfo.css.textAlign) {
                        elementInfo.css.textAlign = "center";
                    }
                    if (elementInfo.children[0].options.parentCss) {
                        copy(elementInfo.css, elementInfo.children[0].options.parentCss);
                    }
                    if (elementInfo.children[0].options.parentDimensionCSSRules) {
                        copy(elementInfo.dimensionCSSRules, elementInfo.children[0].options.parentDimensionCSSRules);
                    }
                }

                linesCount = Math.ceil(
                    (
                        textContentLength * letterWidth.value + (
                            elementInfo.dimensionCSSRules.textIndent ? elementInfo.dimensionCSSRules.textIndent.value : 0
                        )
                    ) / (
                        params.documentData.styles.defaults.options.pageContentWidth.value - (
                            elementInfo.dimensionCSSRules.paddingLeft ? elementInfo.dimensionCSSRules.paddingLeft.value : 0
                        ) - (
                            elementInfo.dimensionCSSRules.paddingRight ? elementInfo.dimensionCSSRules.paddingRight.value : 0
                        )
                    )
                );

                lineHeight = elementInfo.css.lineHeight ? elementInfo.css.lineHeight : 1;

                maxFontSize *= lineHeight;

                if (linesCount == 1 && maxFontSize > elementInfo.options.elementHeight.value) {
                    elementInfo.options.elementHeight.value = maxFontSize;
                } else {
                    elementHeight = linesCount * defaultFontSize.value * lineHeight;

                    if (elementHeight > elementInfo.options.elementHeight.value) {
                        elementInfo.options.elementHeight.value = elementHeight;
                    }
                }

                if (elementInfo.dimensionCSSRules.marginTop) {
                    elementInfo.options.elementHeight.value += elementInfo.dimensionCSSRules.marginTop.value;
                }

                if (elementInfo.dimensionCSSRules.marginBottom) {
                    elementInfo.options.elementHeight.value += elementInfo.dimensionCSSRules.marginBottom.value;
                }

                if (elementInfo.dimensionCSSRules.paddingTop) {
                    elementInfo.options.elementHeight.value += elementInfo.dimensionCSSRules.paddingTop.value;
                }

                if (elementInfo.dimensionCSSRules.paddingBottom) {
                    elementInfo.options.elementHeight.value += elementInfo.dimensionCSSRules.paddingBottom.value;
                }

                return elementInfo;
            },
            _parseTextDocumentReferenceStyle: function (styleValue) {
                var result = {
                    css: {},
                    dimensionCSSRules: {}
                };

                styleValue = styleValue ? styleValue.toLowerCase() : styleValue;

                if (styleValue === "strong") {
                    result.css.fontWeight = "bold";
                }

                return result;
            },
            _parseTextDocumentSettings: function (xml) {
                var result = {
                    zoom: 100,
                    compat: {},
                    rsids: {
                        rsidRoot: '',
                        values: []
                    },
                    mathProperties: {},
                    shapeDefaults: {
                        defaults: {},
                        layout: {}
                    },
                    colorSchemeMapping: {}
                },
                    i,
                    nodes,
                    compatSettingNodes,
                    cachedArrayLength = 0,
                    self = this,
                    idMapNode,
                    children = $.children(xml),
                    len = children.length,
                    nameAttr,
                    uriAttr,
                    spidMaxAttr,
                    styleAttr,
                    dataAttr,
                    rsidRootNode,
                    rsidNodes,
                    defaultsNode,
                    valueAttr,
                    layoutNode,
                    extAttr = null;

                for (i = len - 1; i >= 0; i--) {
                    switch (children[i].localName) {
                    case "zoom":
                        result.zoom = (!children[i].attributes['w:percent'] || isNaN(children[i].attributes['w:percent'].value)) ? 100 : +children[i].attributes['w:percent'].value;
                        break;
                    case "proofState":
                        result.checkSpelling = (children[i].attributes['w:spelling'] && children[i].attributes['w:spelling'].value == 'clean');
                        result.checkGrammar = (children[i].attributes['w:grammar'] && children[i].attributes['w:grammar'].value == 'clean');
                        break;
                    case "defaultTabStop":
                        result.defaultTabStop = (
                            children[i].attributes['w:val'] && !isNaN(children[i].attributes['w:val'].value)
                        ) ? +children[i].attributes['w:val'].value : 1;
                        break;
                    case "characterSpacingControl":
                        result.controlCharacterSpacing = !! (
                            children[i].attributes['w:val'] && children[i].children[i].attributes['w:val'].value != 'doNotCompress'
                        );
                        break;
                    case "compat":
                        compatSettingNodes = children[i].querySelectorAll('compatSetting');
                        cachedArrayLength = compatSettingNodes.length;
                        for (i = 0; i < cachedArrayLength; i++) {
                            nameAttr = compatSettingNodes[i].attributes['w:name'];
                            uriAttr = compatSettingNodes[i].attributes['w:uri'];
                            valueAttr = compatSettingNodes[i].attributes['w:val'];

                            if (nameAttr && nameAttr.value) {
                                result.compat[nameAttr.value] = {
                                    uri: uriAttr ? uriAttr.value || '' : '',
                                    value: (!valueAttr || isNaN(valueAttr.value)) ? 0 : +valueAttr.value
                                };
                            }
                        }
                        break;
                    case "shapeDefaults":
                        defaultsNode = children[i].querySelector('shapedefaults');
                        layoutNode = children[i].querySelector('shapelayout');

                        if (defaultsNode) {
                            extAttr = defaultsNode.attributes['v:ext'];
                            spidMaxAttr = defaultsNode.attributes.spidmax;
                            styleAttr = defaultsNode.attributes.style;
                            result.shapeDefaults.defaults.ext = extAttr ? extAttr.value || '' : '';
                            result.shapeDefaults.defaults.style =
                                styleAttr ? styleAttr.value || '' : '';
                            result.shapeDefaults.defaults.spidMax =
                                (!spidMaxAttr || isNaN(spidMaxAttr.value)) ? 0 : +spidMaxAttr.value;
                        }
                        if (layoutNode) {
                            extAttr = layoutNode.attributes['v:ext'];
                            idMapNode = layoutNode.querySelector('idmap');
                            result.shapeDefaults.layout.ext =
                                extAttr ? extAttr.value || '' : '';
                            result.shapeDefaults.layout.idMap = {};
                            if (idMapNode) {
                                extAttr = idMapNode.attributes['v:ext'];
                                dataAttr = idMapNode.attributes.data;
                                result.shapeDefaults.layout.idMap.ext =
                                    extAttr ? extAttr.value || '' : '';
                                result.shapeDefaults.layout.idMap.data =
                                    (!dataAttr || isNaN(dataAttr.value)) ? 0 : +dataAttr.value;
                            }
                        }
                        break;
                    case "themeFontLang":
                        result.themeFontLanguage = this._parseLanguageNode(children[i]);
                        break;
                    case "decimalSymbol":
                        result.decimalSymbol = children[i].attributes['w:val'] ? children[i].attributes['w:val'].value || '' : '';
                        break;
                    case "listSeparator":
                        result.listSeparator = children[i].attributes['w:val'] ? children[i].attributes['w:val'].value || '' : '';
                        break;
                    case "clrSchemeMapping":
                        cachedArrayLength = children[i].attributes.length;
                        for (i = 0; i < cachedArrayLength; i++) {
                            if (children[i].attributes[i] && children[i].attributes[i].value) {
                                result.colorSchemeMapping[self.replaceAttributeNamespace(children[i].attributes[i].name)] =
                                    children[i].attributes[i].value;
                            }
                        }
                        break;
                    case "rsids":
                        rsidRootNode = children[i].querySelector('rsidRoot');
                        rsidNodes = children[i].querySelectorAll('rsid');
                        result.rsids.rsidRoot = rsidRootNode.attributes['w:val'] ? rsidRootNode.attributes['w:val'].value || '' : '';

                        cachedArrayLength = rsidNodes.length;
                        for (i = 0; i < cachedArrayLength; i++) {
                            valueAttr = rsidNodes[i].attributes['w:val'];

                            if (valueAttr && valueAttr.value) {
                                result.rsids.values.push(valueAttr.value);
                            }
                        }
                        break;
                    case "mathPr":
                        nodes = $.children(children[i]);
                        cachedArrayLength = nodes.length;

                        result.mathProperties.intLimit = '';

                        for (i = cachedArrayLength - 1; i >= 0; i--) {
                            switch (nodes[i].localName) {
                            case "mathFont":
                                result.mathProperties.mathFont = (
                                    nodes[i].attributes['m:val']
                                ) ? nodes[i].attributes['m:val'].value || '' : '';
                                break;
                            case "brkBin":
                                /**
                                 * @description Values : after, before, repeat
                                 * @type {String}
                                 */
                                result.mathProperties.breakOnBinary = (
                                    nodes[i].attributes['m:val']
                                ) ? nodes[i].attributes['m:val'].value || '' : '';
                                break;
                            case "brkBinSub":
                                /**
                                 * @description Values : after, before, repeat
                                 * @type {String}
                                 */
                                /**
                                 * @description Values : --, +-, -+
                                 * @type {String}
                                 */
                                result.mathProperties.breakOnBinarySubtraction = (
                                    nodes[i].attributes['m:val']
                                ) ? nodes[i].attributes['m:val'].value || '' : '';
                                break;
                            case "smallFrac":
                                result.mathProperties.onSmallFraction = ( !! nodes[i].attributes['m:val'] && (nodes[i].attributes['m:val'].value != '0'));
                                break;
                            case "dispDef":
                                result.mathProperties.displayDefault = ( !! nodes[i].attributes['m:val'] && (nodes[i].attributes['m:val'].value != '0'));
                                break;
                            case "lMargin":
                                result.mathProperties.leftMargin = (
                                    nodes[i].attributes['m:val'] && !isNaN(nodes[i].attributes['m:val'].value)
                                ) ? +nodes[i].attributes['m:val'].value : 0;
                                break;
                            case "rMargin":
                                result.mathProperties.rightMargin = (
                                    nodes[i].attributes['m:val'] && !isNaN(nodes[i].attributes['m:val'].value)
                                ) ? +nodes[i].attributes['m:val'].value : 0;
                                break;
                            case "defJc":
                                result.mathProperties.align = nodes[i].attributes['m:val'] ? nodes[i].attributes['m:val'].value : 'left';
                                if (result.mathProperties.align == 'centerGroup') {
                                    result.mathProperties.align = 'center';
                                }
                                break;
                            case "preSp":
                                result.mathProperties.preSpacing = (
                                    nodes[i].attributes['m:val'] && !isNaN(nodes[i].attributes['m:val'].value)
                                ) ? +nodes[i].attributes['m:val'].value : 0;
                                break;
                            case "postSp":
                                result.mathProperties.postSpacing = (
                                    nodes[i].attributes['m:val'] && !isNaN(nodes[i].attributes['m:val'].value)
                                ) ? 0 : +nodes[i].attributes['m:val'].value;
                                break;
                            case "interSp":
                                result.mathProperties.interSpacing = (
                                    nodes[i].attributes['m:val'] && !isNaN(nodes[i].attributes['m:val'].value)
                                ) ? 0 : +nodes[i].attributes['m:val'].value;
                                break;
                            case "intraSp":
                                result.mathProperties.intraSpacing = (
                                    nodes[i].attributes['m:val'] && !isNaN(nodes[i].attributes['m:val'].value)
                                ) ? 0 : +nodes[i].attributes['m:val'].value;
                                break;
                            case "wrapIndent":
                                result.mathProperties.wrapIndent = (
                                    nodes[i].attributes['m:val'] && !isNaN(nodes[i].attributes['m:val'].value)
                                ) ? 0 : +nodes[i].attributes['m:val'].value;
                                break;
                            case "wrapRight":
                                result.mathProperties.wrapRight = (
                                    nodes[i].attributes['m:val'] && !isNaN(nodes[i].attributes['m:val'].value)
                                ) ? 0 : +nodes[i].attributes['m:val'].value;
                                break;
                            case "intLim":
                                if (nodes[i].attributes['m:val'] && nodes[i].attributes['m:val'].value == 'undOvr') {
                                    result.mathProperties.intLimit = 'UnderOverLocation';
                                } else if (nodes[i].attributes['m:val'] && nodes[i].attributes['m:val'].value == 'subSup') {
                                    result.mathProperties.intLimit = 'SubscriptSuperscriptLocation';
                                } else {
                                    result.mathProperties.intLimit = '';
                                }
                                break;
                            case "naryLim":
                                if (nodes[i].attributes['m:val'] && nodes[i].attributes['m:val'].value == 'undOvr') {
                                    result.mathProperties.naryLimit = 'UnderOverLocation';
                                } else if (nodes[i].attributes['m:val'] && nodes[i].attributes['m:val'].value == 'subSup') {
                                    result.mathProperties.naryLimit = 'SubscriptSuperscriptLocation';
                                } else {
                                    result.mathProperties.naryLimit = '';
                                }
                                break;
                            }
                        }
                        break;
                    }
                }

                return result;
            },
            _parseTextDocumentStyles: function (xml) {
                var result = {
                    defaults: {
                        paragraph: {
                            dimensionCSSRules: {
                                margin: {
                                    value: 0,
                                    unit: "pt"
                                },
                                padding: {
                                    value: 0,
                                    unit: "pt"
                                }
                            },
                            css: {
                                wordWrap: "break-word",
                                wordBreak: "break-all",
                                width: "100%"
                            }
                        },
                        paragraphContent: {},
                        options: {}
                    },
                    latentStyles: {
                        exceptions: {}
                    },
                    preferencedStyles: {}
                },
                    self = this,
                    childrenNodes = $.children(xml.querySelector('styles')),
                    i,
                    name,
                    data,
                    propertiesNode,
                    propertyNode,
                    cachedAttributesLength,
                    cachedArrayLength,
                    exceptionsNodes,
                    contentStyles,
                    paragraphStyles,
                    k = 0,
                    j = 0;

                for (i = childrenNodes.length - 1; i >= 0; i--) {
                    if (childrenNodes[i].localName === "docDefaults") {
                        contentStyles = childrenNodes[i].querySelector('rPrDefault rPr');
                        paragraphStyles = childrenNodes[i].querySelector('pPrDefault pPr');

                        if (contentStyles) {
                            result.defaults.paragraphContent = this._getTextDocumentStyleProperties({
                                node: contentStyles,
                                documentData: null
                            });
                        }
                        if (paragraphStyles) {
                            copy(result.defaults.paragraph,
                                this._getTextDocumentStyleProperties({
                                    node: paragraphStyles,
                                    documentData: null
                                })
                            );
                        }
                    } else if (childrenNodes[i].localName === 'latentStyles') {
                        exceptionsNodes = childrenNodes[i].querySelectorAll('lsdException') || [];
                        name = '';
                        data = {};
                        cachedArrayLength = childrenNodes[i].attributes.length;
                        cachedAttributesLength = 0;

                        for (k = 0; k < cachedArrayLength; k++) {
                            result.latentStyles[self.replaceAttributeNamespace(childrenNodes[i].attributes[k].name)] = (
                                isNaN(childrenNodes[i].attributes[k].value)
                            ) ? (childrenNodes[i].attributes[k].value || '') : +childrenNodes[i].attributes[k].value;
                        }

                        cachedArrayLength = exceptionsNodes.length;

                        for (k = 0; k < cachedArrayLength; k++) {
                            name = '';
                            data = {};
                            cachedAttributesLength = exceptionsNodes[k].attributes.length;
                            for (j = 0; j < cachedAttributesLength; j++) {
                                if (self.replaceAttributeNamespace(exceptionsNodes[i].attributes[j].name) == 'name') {
                                    name = self.replaceAttributeNamespace(exceptionsNodes[i].attributes[j].name);
                                    result.latentStyles.exceptions[name] = data;
                                }
                                if (name) {
                                    result.latentStyles.exceptions[name][
                                        self.replaceAttributeNamespace(exceptionsNodes[i].attributes[j].name)
                                    ] = (isNaN(exceptionsNodes[i].attributes[j].value)) ? (
                                        exceptionsNodes[i].attributes[j].value || ''
                                    ) : +exceptionsNodes[i].attributes[j].value;
                                } else {
                                    data[self.replaceAttributeNamespace(exceptionsNodes[i].attributes[j].name)] =
                                        (isNaN(exceptionsNodes[i].attributes[j].value)) ? (
                                        exceptionsNodes[i].attributes[j].value || ''
                                    ) : +exceptionsNodes[i].attributes[j].value;
                                }
                            }
                        }
                    } else if (childrenNodes[i].localName === 'style') {
                        if (childrenNodes[i].attributes["w:styleId"] && childrenNodes[i].attributes["w:styleId"].value) {
                            result.preferencedStyles[childrenNodes[i].attributes["w:styleId"].value] = {
                                contentProperties: {},
                                isDefault: this.attributeToBoolean(childrenNodes[i].attributes["w:default"])
                            };

                            propertiesNode = childrenNodes[i].querySelector('pPr');

                            if (propertiesNode) {
                                result.preferencedStyles[childrenNodes[i].attributes["w:styleId"].value].lineStyle =
                                    this._getTextDocumentStyleProperties({
                                        node: propertiesNode,
                                        documentData: null
                                    });
                            }
                            propertiesNode = childrenNodes[i].querySelector('rPr');
                            if (propertiesNode) {
                                result.preferencedStyles[childrenNodes[i].attributes["w:styleId"].value].contentProperties =
                                    this._getTextDocumentStyleProperties({
                                        node: propertiesNode,
                                        documentData: null
                                    });
                            }
                            propertiesNode = childrenNodes[i].querySelector('tblPr');
                            if (propertiesNode) {
                                result.preferencedStyles[childrenNodes[i].attributes["w:styleId"].value].tableStyle =
                                    this._getTextDocumentStyleProperties({
                                        node: propertiesNode,
                                        documentData: null
                                    });
                            }
                            result.preferencedStyles[childrenNodes[i].attributes["w:styleId"].value].type = (
                                childrenNodes[i].attributes["w:type"] && childrenNodes[i].attributes["w:type"].value
                            ) ? childrenNodes[i].attributes["w:type"].value : "";

                            propertyNode = childrenNodes[i].querySelector('name');

                            if (propertyNode && propertyNode.attributes['w:val'] && propertyNode.attributes['w:val'].value) {
                                result.preferencedStyles[childrenNodes[i].attributes["w:styleId"].value].name =
                                    propertyNode.attributes['w:val'].value;
                            }
                            propertyNode = childrenNodes[i].querySelector('rsid');
                            if (propertyNode && propertyNode.attributes['w:val'] && propertyNode.attributes['w:val'].value) {
                                result.preferencedStyles[childrenNodes[i].attributes["w:styleId"].value].rsid =
                                    propertyNode.attributes['w:val'].value;
                            }
                            propertyNode = childrenNodes[i].querySelector('basedOn');
                            if (propertyNode && propertyNode.attributes['w:val'] && propertyNode.attributes['w:val'].value) {
                                result.preferencedStyles[childrenNodes[i].attributes["w:styleId"].value].parentStyleId =
                                    propertyNode.attributes['w:val'].value;
                            }
                            propertyNode = childrenNodes[i].querySelector('next');
                            if (propertyNode && propertyNode.attributes['w:val'] && propertyNode.attributes['w:val'].value) {
                                result.preferencedStyles[childrenNodes[i].attributes["w:styleId"].value].nextElementStyle =
                                    propertyNode.attributes['w:val'].value;
                            }
                            propertyNode = childrenNodes[i].querySelector('uiPriority');
                            if (propertyNode && propertyNode.attributes['w:val'] && propertyNode.attributes['w:val'].value) {
                                result.preferencedStyles[childrenNodes[i].attributes["w:styleId"].value].uiPriority = +propertyNode.attributes['w:val'].value;
                            }
                            propertyNode = childrenNodes[i].querySelector('link');
                            if (propertyNode && propertyNode.attributes['w:val'] && propertyNode.attributes['w:val'].value) {
                                result.preferencedStyles[childrenNodes[i].attributes["w:styleId"].value].linkedStyle =
                                    propertyNode.attributes['w:val'].value;
                            }
                            propertyNode = childrenNodes[i].querySelector('unhideWhenUsed');
                            result.preferencedStyles[childrenNodes[i].attributes["w:styleId"].value].unHideWhenUsed = (
                                propertyNode
                            ) ? this.attributeToBoolean(propertyNode.attributes['w:val']) : false;
                            propertyNode = childrenNodes[i].querySelector('qFormat');
                            result.preferencedStyles[childrenNodes[i].attributes["w:styleId"].value].isPrimary = (
                                propertyNode
                            ) ? this.attributeToBoolean(propertyNode.attributes['w:val']) : false;
                        }
                    }
                }

                return result;
            },
            _parseTextDocumentTableNode: function (data, callback) {
                var header = {
                    children: []
                },
                    body = {
                        children: []
                    },
                    footer = {
                        children: []
                    },
                    result = {
                        options: {
                            isTable: true,
                            elementHeight: {
                                value: 0,
                                unit: "pt"
                            }
                        },
                        children: [header, body, footer],
                        attributes: {},
                        dimensionCSSRules: {},
                        css: {}
                    },
                    tablePreferenceStyle,
                    i,
                    j = 0,
                    c = 0,
                    length = 0,
                    children = $.children(data.tableNode),
                    len,
                    childrenNodesCount = 0,
                    cellWidth = 0,
                    cellShading = null,
                    cellContent = [],
                    cellChildNodesLength = 0,
                    row,
                    cell,
                    horizontalBorder = null,
                    cellBorderBottom,
                    verticalBorder = null,
                    contentChildren = null,
                    cellBorderRight,
                    rowPropNodesCount,
                    parentNodeChildren = null;

                for (i = 0; i < children.length; i++) {
                    parentNodeChildren = $.children(children[i]);
                    switch (children[i].localName) {
                    case "tr":
                        cellBorderBottom = horizontalBorder ? this._parseTableBorderProperties(horizontalBorder) : null;
                        cellBorderRight = verticalBorder ? this._parseTableBorderProperties(verticalBorder) : null;
                        row = {
                            children: [],
                            css: {},
                            options: {
                                colsWidth: []
                            },
                            dimensionCSSRules: {}
                        };
                        length = parentNodeChildren.length;

                        for (j = 0; j < length; j++) {
                            contentChildren = $.children(parentNodeChildren[j]);
                            if (parentNodeChildren[j].localName === "tc") {
                                cell = {
                                    css: {},
                                    dimensionCSSRules: {},
                                    options: {},
                                    children: []
                                };
                                cellContent = parentNodeChildren[j].querySelectorAll('p');
                                cellChildNodesLength = contentChildren.length;

                                if (
                                    tablePreferenceStyle &&
                                    tablePreferenceStyle.tableStyle &&
                                    tablePreferenceStyle.tableStyle.cellsStyleProperties
                                ) {
                                    copy(result, tablePreferenceStyle.tableStyle.cellsStyleProperties);
                                }

                                if (cellBorderRight) {
                                    cell.dimensionCSSRules.borderRightWidth = cellBorderRight.width;
                                    cell.css.borderRightColor = cellBorderRight.color;
                                    cell.css.borderRightStyle = cellBorderRight.style;
                                }

                                if (cellBorderBottom) {
                                    cell.dimensionCSSRules.borderBottomWidth = cellBorderBottom.width;
                                    cell.css.borderBottomColor = cellBorderBottom.color;
                                    cell.css.borderBottomStyle = cellBorderBottom.style;
                                }

                                for (c = 0; c < cellChildNodesLength; c++) {
                                    if (contentChildren[c].localName == 'tcPr') {
                                        cellWidth = contentChildren[c].querySelector('tcW');
                                        cellShading = contentChildren[c].querySelector('shd');

                                        if (cellWidth) {
                                            cell.dimensionCSSRules.width = this._parseTableElementWidth(cellWidth);
                                        }

                                        if (cellShading) {
                                            if (
                                                cellShading.attributes['w:fill'] &&
                                                cellShading.attributes['w:fill'].value &&
                                                cellShading.attributes['w:fill'].value != "auto"
                                            ) {
                                                cell.css.backgroundColor = this.normalizeColorValue(
                                                    cellShading.attributes['w:fill'].value
                                                );
                                            }
                                        }
                                    } else if (contentChildren[c].localName == 'p') {
                                        cell.children.push(this._parseTextDocumentParagraphNode({
                                            node: contentChildren[c],
                                            documentData: data.documentData
                                        }));
                                    }
                                }
                                row.children.push(cell);
                            } else if (parentNodeChildren[j].localName === "trPr") {
                                rowPropNodesCount = contentChildren.length;

                                for (c = 0; c < rowPropNodesCount; c++) {
                                    if (contentChildren[c].localName === "trHeight") {
                                        if (
                                            contentChildren[c].attributes['w:val'] && !isNaN(contentChildren[c].attributes['w:val'].value)
                                        ) {
                                            row.dimensionCSSRules.height = {
                                                value: contentChildren[c].attributes['w:val'].value / 20,
                                                unit: "pt"
                                            };
                                        }
                                    }
                                }
                            }
                        }
                        body.children.push(row);
                        break;
                    case "tblGrid":
                        childrenNodesCount = parentNodeChildren.length;
                        for (j = 0; j < childrenNodesCount; j++) {
                            if (
                                parentNodeChildren[j] === "gridCol" && (
                                    parentNodeChildren[j].attributes['w:w'] && !isNaN(parentNodeChildren[j].attributes['w:w'].value)
                                )
                            ) {
                                result.options.colsWidth.push({
                                    value: parentNodeChildren[j].attributes['w:w'].value,
                                    unit: "pt"
                                });
                            }
                        }
                        break;
                    case 'tblPr':
                        var tableWidth = children[i].querySelector('tblW');
                        var tblStyle = children[i].querySelector('tblStyle');

                        if (
                            tblStyle && tblStyle.attributes['w:val'] && tblStyle.attributes['w:val'].value &&
                            data.documentData.styles.preferencedStyles[tblStyle.attributes['w:val'].value]
                        ) {
                            tablePreferenceStyle = data.documentData.styles.preferencedStyles[tblStyle.attributes['w:val'].value];

                            if (tablePreferenceStyle && tablePreferenceStyle.tableStyle) {
                                copy(result, tablePreferenceStyle.tableStyle);
                            }
                        }

                        var tableBorders = children[i].querySelector('tblBorders');
                        if (tableWidth) {
                            result.dimensionCSSRules.width = this._parseTableElementWidth(tableWidth);
                        }
                        if (tableBorders) {
                            copy(result, this._parseTableBorderStyle({
                                node: tableBorders
                            }));
                            horizontalBorder = tableBorders.querySelector('insideH');
                            verticalBorder = tableBorders.querySelector('insideV');
                        }
                        break;
                    }
                }

                length = body.children.length;
                row = body.children[length - 1];

                if (row) {
                    len = row.children.length;
                    for (j = 0; j < len; j++) {
                        row.children[j].dimensionCSSRules.borderBottomWidth = "";
                        row.children[j].css.borderBottomStyle = "";
                        row.children[j].css.borderBottomColor = "";
                    }
                }

                for (j = 0; j < length; j++) {
                    len = body.children[j].children.length;
                    cell = body.children[j].children[len - 1];
                    if (cell) {
                        cell.dimensionCSSRules.borderRightWidth = "";
                        cell.css.borderRightStyle = "";
                        cell.css.borderRightColor = "";
                    }
                }

                if (typeof callback === 'function') {
                    callback(result);
                }
                return true;
            },
            _parseWebSettings: function (xml) {
                var i,
                    children = $.children(xml),
                    result = {
                        optimizeForBrowser: false,
                        allowPNG: false
                    };

                for (i = children.length - 1; i >= 0; i--) {
                    if (children[i].localName === "optimizeForBrowser") {
                        result.optimizeForBrowser = !! (
                            children[i].attributes['w:val'] &&
                            this.attributeToBoolean(children[i].attributes['w:val'].value)
                        );
                    } else if (children[i].localName === "allowPNG") {
                        result.allowPNG = !! (
                            children[i].attributes['w:val'] && this.attributeToBoolean(children[i].attributes['w:val'].value)
                        );
                    }
                }
                return result;
            },
            _prepareShapeType: function (type) {
                var result = "";

                if (typeof type !== 'string')
                    return "";

                switch (type) {
                case "line":
                case "lineInv":
                    result = "line";
                    break;
                case "triangle":
                case "rtTriangle":
                    result = "triangle";
                    break;
                case "rect":
                    result = "rectangle";
                    break;
                case "diamond":
                    result = "diamond";
                    break;
                case "parallelogram":
                    result = "parallelogram";
                    break;
                case "pentagon":
                    result = "pentagon";
                    break;
                case "hexagon":
                    result = "hexagon";
                    break;
                case "heptagon":
                    result = "heptagon";
                    break;
                case "octagon":
                    result = "octagon";
                    break;
                case "ellipse":
                    result = "ellipse";
                    break;
                case "decagon":
                    result = "decagon";
                    break;
                case "dodecagon":
                    result = "dodecagon";
                    break;
                case "plaque":
                    result = "plaque";
                    break;
                case "trapezoid":
                case "nonIsoscelesTrapezoid":
                    result = "trapezoid";
                    break;
                default:
                    result = "rectangle";
                    break;
                }
                return result;
                /*
     star4 Four Pointed Star Shape
     star5 Five Pointed Star Shape
     star6 Six Pointed Star Shape
     star7 Seven Pointed Star Shape
     star8 Eight Pointed Star Shape
     star10 Ten Pointed Star Shape
     star12 Twelve Pointed Star Shape
     star16 Sixteen Pointed Star Shape
     star24 Twenty Four Pointed Star Shape
     star32 Thirty Two Pointed Star Shape
     roundRect Round Corner Rectangle Shape
     round1Rect One Round Corner Rectangle Shape
     round2SameRect Two Same-side Round Corner Rectangle Shape
     round2DiagRect Two Diagonal Round Corner Rectangle Shape
     snipRoundRect One Snip One Round Corner Rectangle Shape
     snip1Rect One Snip Corner Rectangle Shape
     snip2SameRect Two Same-side Snip Corner Rectangle Shape
     snip2DiagRect Two Diagonal Snip Corner Rectangle Shape
     teardrop Teardrop Shape
     homePlate Home Plate Shape
     chevron Chevron Shape
     pieWedge Pie Wedge Shape
     pie Pie Shape
     blockArc Block Arc Shape
     donut Donut Shape
     noSmoking No Smoking Shape
     rightArrow Right Arrow Shape
     leftArrow Left Arrow Shape
     upArrow Up Arrow Shape
     downArrow Down Arrow Shape
     stripedRightArrow Striped Right Arrow Shape
     notchedRightArrow Notched Right Arrow Shape
     bentUpArrow Bent Up Arrow Shape
     leftRightArrow Left Right Arrow Shape
     upDownArrow Up Down Arrow Shape
     leftUpArrow Left Up Arrow Shape
     leftRightUpArrow Left Right Up Arrow Shape
     quadArrow Quad-Arrow Shape
     leftArrowCallout Callout Left Arrow Shape
     rightArrowCallout Callout Right Arrow Shape
     upArrowCallout Callout Up Arrow Shape
     downArrowCallout Callout Down Arrow Shape
     leftRightArrowCallout Callout Left Right Arrow Shape
     upDownArrowCallout Callout Up Down Arrow Shape
     quadArrowCallout Callout Quad-Arrow Shape
     bentArrow Bent Arrow Shape
     uturnArrow U-Turn Arrow Shape
     circularArrow Circular Arrow Shape
     leftCircularArrow Left Circular Arrow Shape
     leftRightCircularArrow Left Right Circular Arrow Shape
     curvedRightArrow Curved Right Arrow Shape
     curvedLeftArrow Curved Left Arrow Shape
     curvedUpArrow Curved Up Arrow Shape
     curvedDownArrow Curved Down Arrow Shape
     swooshArrow Swoosh Arrow Shape
     cube Cube Shape
     can Can Shape
     lightningBolt Lightning Bolt Shape
     heart Heart Shape
     sun Sun Shape
     moon Moon Shape
     smileyFace Smiley Face Shape
     irregularSeal1 Irregular Seal 1 Shape
     irregularSeal2 Irregular Seal 2 Shape
     foldedCorner Folded Corner Shape
     bevel Bevel Shape
     frame Frame Shape
     halfFrame Half Frame Shape
     corner Corner Shape
     diagStripe Diagonal Stripe Shape
     chord Chord Shape
     arc Curved Arc Shape
     leftBracket Left Bracket Shape
     rightBracket Right Bracket Shape
     leftBrace Left Brace Shape
     rightBrace Right Brace Shape
     bracketPair Bracket Pair Shape
     bracePair Brace Pair Shape
     straightConnector1 Straight Connector 1 Shape
     bentConnector2 Bent Connector 2 Shape
     bentConnector3 Bent Connector 3 Shape
     bentConnector4 Bent Connector 4 Shape
     bentConnector5 Bent Connector 5 Shape
     curvedConnector2 Curved Connector 2 Shape
     curvedConnector3 Curved Connector 3 Shape
     curvedConnector4 Curved Connector 4 Shape
     curvedConnector5 Curved Connector 5 Shape
     callout1 Callout 1 Shape
     callout2 Callout 2 Shape
     callout3 Callout 3 Shape
     accentCallout1 Callout 1 Shape
     accentCallout2 Callout 2 Shape
     accentCallout3 Callout 3 Shape
     borderCallout1 Callout 1 with Border Shape
     borderCallout2 Callout 2 with Border Shape
     borderCallout3 Callout 3 with Border Shape
     accentBorderCallout1 Callout 1 with Border and Accent Shape
     accentBorderCallout2 Callout 2 with Border and Accent Shape
     accentBorderCallout3 Callout 3 with Border and Accent Shape
     wedgeRectCallout Callout Wedge Rectangle Shape
     wedgeRoundRectCallout Callout Wedge Round Rectangle Shape
     wedgeEllipseCallout Callout Wedge Ellipse Shape
     cloudCallout Callout Cloud Shape
     cloud Cloud Shape
     ribbon Ribbon Shape
     ribbon2 Ribbon 2 Shape
     ellipseRibbon Ellipse Ribbon Shape
     ellipseRibbon2 Ellipse Ribbon 2 Shape
     leftRightRibbon Left Right Ribbon Shape
     verticalScroll Vertical Scroll Shape
     horizontalScroll Horizontal Scroll Shape
     wave Wave Shape
     doubleWave Double Wave Shape
     plus Plus Shape
     flowChartProcess Process Flow Shape
     flowChartDecision Decision Flow Shape
     flowChartInputOutput Input Output Flow Shape
     flowChartPredefinedProcess Predefined Process Flow Shape
     flowChartInternalStorage Internal Storage Flow Shape
     flowChartDocument Document Flow Shape
     flowChartMultidocument Multi-Document Flow Shape
     flowChartTerminator Terminator Flow Shape
     flowChartPreparation Preparation Flow Shape
     flowChartManualInput Manual Input Flow Shape
     flowChartManualOperation Manual Operation Flow Shape
     flowChartConnector Connector Flow Shape
     flowChartPunchedCard Punched Card Flow Shape
     flowChartPunchedTape Punched Tape Flow Shape
     flowChartSummingJunction Summing Junction Flow Shape
     flowChartOr Or Flow Shape
     flowChartCollate Collate Flow Shape
     flowChartSort Sort Flow Shape
     flowChartExtract Extract Flow Shape
     flowChartMerge Merge Flow Shape
     flowChartOfflineStorage Offline Storage Flow Shape
     flowChartOnlineStorage Online Storage Flow Shape
     flowChartMagneticTape Magnetic Tape Flow Shape
     flowChartMagneticDisk Magnetic Disk Flow Shape
     flowChartMagneticDrum Magnetic Drum Flow Shape
     flowChartDisplay Display Flow Shape
     flowChartDelay Delay Flow Shape
     flowChartAlternateProcess Alternate Process Flow Shape
     flowChartOffpageConnector Off-Page Connector Flow Shape
     actionButtonBlank Blank Button Shape
     actionButtonHome Home Button Shape
     actionButtonHelp Help Button Shape
     actionButtonInformation Information Button Shape
     actionButtonForwardNext Forward or Next Button Shape
     actionButtonBackPrevious Back or Previous Button Shape
     actionButtonEnd End Button Shape
     actionButtonBeginning Beginning Button Shape
     actionButtonReturn Return Button Shape
     actionButtonDocument Document Button Shape
     actionButtonSound Sound Button Shape
     actionButtonMovie Movie Button Shape
     gear6 Gear 6 Shape
     gear9 Gear 9 Shape
     funnel Funnel Shape
     mathPlus Plus Math Shape
     mathMinus Minus Math Shape
     mathMultiply Multiply Math Shape
     mathDivide Divide Math Shape
     mathEqual Equal Math Shape
     mathNotEqual Not Equal Math Shape
     cornerTabs Corner Tabs Shape
     squareTabs Square Tabs Shape
     plaqueTabs Plaque Tabs Shape
     chartX Chart X Shape
     chartStar Chart Star Shape
     chartPlus Chart Plus Shape
     */
            },
            _shadowPatterns: {
                nil: null,
                clear: null,
                solid: "0 0 5px 0",
                horzStripe: "5px 0 5px 0",
                vertStripe: "0 5px 5px 0",
                reverseDiagStripe: "-5px -5px 5px 0",
                diagStripe: "5px 5px 5px 0",
                thinHorzStripe: "1px 0 1px 0",
                thinVertStripe: "0 1px 1px 0",
                thinReverseDiagStripe: "-1px -1px 1px 0",
                thinDiagStripe: "1px 1px 1px 0"
            },
            createFileData: function (fileEntries, callback) {
                if (this.isTextDocument()) {
                    this._createFileDataFromTextDocument.apply(this, arguments);
                }

                return null;
            },
            fileTypeParsers: [{
                extension: ['docx'],
                mime: ['vnd.openxmlformats-officedocument.wordprocessingml.document'],
                isTextDocument: true
            }],
            initialize: function () {
                this.on('parsefromarchivestart', function () {
                    this.trigger('parsestart');
                }.bind(this));
                this.on('parsefromarchive', function (fileData) {
                    this.trigger('parse', fileData);
                }.bind(this));
                this.on('parsefromarchiveend', function () {
                    this.trigger('parseend');
                }.bind(this));
            },
            options: {
                parseMethod: "parseFromArchive"
            }
        }
    );

    jDoc.defineEngine('OOXML', [
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ], OOXML);
    /**
     *
     * @type {Object}
     */
    var RTF = jDoc.Engine.extend(
        /** @lends RTF.prototype */
        {
            _controlWordsParsers: {
                trpaddt: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param;

                    if (param > 0) {
                        parseParams.styles.rows.dimensionCSSRules.paddingTop = {
                            value: param / 20,
                            unit: "pt"
                        };
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                trpaddr: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param;

                    if (param > 0) {
                        parseParams.styles.rows.dimensionCSSRules.paddingRight = {
                            value: param / 20,
                            unit: "pt"
                        };
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                trpaddl: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param;

                    if (param > 0) {
                        parseParams.styles.rows.dimensionCSSRules.paddingLeft = {
                            value: param / 20,
                            unit: "pt"
                        };
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                trpaddft: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param;

                    if (param == 0) {
                        delete parseParams.styles.rows.dimensionCSSRules.paddingTop;
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                trpaddfr: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param;

                    if (param == 0) {
                        delete parseParams.styles.rows.dimensionCSSRules.paddingRight;
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                trpaddfl: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param;

                    if (param == 0) {
                        delete parseParams.styles.rows.dimensionCSSRules.paddingLeft;
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                trpaddfb: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param;

                    if (param == 0) {
                        delete parseParams.styles.rows.dimensionCSSRules.paddingBottom;
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                trpaddb: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param;

                    if (param > 0) {
                        parseParams.styles.rows.dimensionCSSRules.paddingBottom = {
                            value: param / 20,
                            unit: "pt"
                        };
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                trowd: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        table = parseParams.table,
                        body = this._getTableBody(table),
                        row = table ? body.children[body.children.length - 1] : null;

                    if (row) {
                        row.css = {};
                        row.dimensionCSSRules = {};
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                row: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        table = parseParams.table,
                        paragraphHeight,
                        page = parseResult.pages[parseParams.currentPageIndex],
                        body = table ? this._getTableBody(table) : null,
                        row = body ? body.children[body.children.length - 1] : null,
                        isNeedDestroy = !! row;

                    if (isNeedDestroy) {
                        if (parseParams.currentTextElementParent && parseParams.pageWidth && parseParams.pageHeight) {
                            paragraphHeight = this._getElementHeight(parseParams.currentTextElementParent, {
                                width: parseParams.pageWidth
                            });

                            if (parseParams.pageContentHeight + paragraphHeight > parseParams.pageHeight) {
                                this._createNewPage(options);
                                parseResult.pages[parseParams.currentPageIndex].children[parseParams.currentElementIndex] =
                                    parseParams.currentTextElementParent;
                            }

                            parseParams.pageContentHeight += paragraphHeight;
                        }

                        parseParams.currentElementIndex++;
                        this._destroyTable(parseParams);
                    }

                    table = this._initTable({
                        row: isNeedDestroy ? null : row,
                        parseParams: parseParams,
                        parentElementsList: page.children,
                        parentElementsIndex: parseParams.currentElementIndex,
                        data: parseParams.currentTextElementParent
                    });
                    body = this._getTableBody(table);

                    row = this._initRow();
                    body.children.push(row);

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                trspdt: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param;

                    parseParams.options.table.cellMarginTop = param / 20;
                    parseParams.styles.cells.dimensionCSSRules.paddingTop =
                        parseParams.styles.cells.dimensionCSSRules.paddingTop || {
                            value: 0,
                            unit: "pt"
                    };
                    parseParams.styles.cells.dimensionCSSRules.paddingTop.value += parseParams.options.table.cellMarginTop;

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                trspdr: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param;

                    parseParams.options.table.cellMarginRight = param / 20;
                    parseParams.styles.cells.dimensionCSSRules.paddingRight =
                        parseParams.styles.cells.dimensionCSSRules.paddingRight || {
                            value: 0,
                            unit: "pt"
                    };
                    parseParams.styles.cells.dimensionCSSRules.paddingRight.value += parseParams.options.table.cellMarginRight;

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                trspdl: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param;

                    parseParams.options.table.cellMarginLeft = param / 20;
                    parseParams.styles.cells.dimensionCSSRules.paddingLeft =
                        parseParams.styles.cells.dimensionCSSRules.paddingLeft || {
                            value: 0,
                            unit: "pt"
                    };

                    parseParams.styles.cells.dimensionCSSRules.paddingLeft.value += parseParams.options.table.cellMarginLeft;

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                trspdft: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param;

                    if (param === 0 && parseParams.options.table.cellMarginTop && parseParams.styles.cells.dimensionCSSRules.paddingTop) {
                        parseParams.styles.cells.dimensionCSSRules.paddingTop.value -= parseParams.options.table.cellMarginTop;
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                trspdfr: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param;

                    if (param === 0 && parseParams.options.table.cellMarginRight && parseParams.styles.cells.dimensionCSSRules.paddingRight) {
                        parseParams.styles.cells.dimensionCSSRules.paddingRight.value -= parseParams.options.table.cellMarginRight;
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                trspdfl: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param;

                    if (param === 0 && parseParams.options.table.cellMarginLeft && parseParams.styles.cells.dimensionCSSRules.paddingLeft) {
                        parseParams.styles.cells.dimensionCSSRules.paddingLeft.value -= parseParams.options.table.cellMarginLeft;
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                trspdfb: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param;

                    if (param === 0 && parseParams.options.table.cellMarginBottom && parseParams.styles.cells.dimensionCSSRules.paddingBottom) {
                        parseParams.styles.cells.dimensionCSSRules.paddingBottom.value -= parseParams.options.table.cellMarginBottom;
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                trspdb: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param;

                    parseParams.options.table.cellMarginBottom = param / 20;
                    parseParams.styles.cells.dimensionCSSRules.paddingBottom =
                        parseParams.styles.cells.dimensionCSSRules.paddingBottom || {
                            value: 0,
                            unit: "pt"
                    };
                    parseParams.styles.cells.dimensionCSSRules.paddingBottom.value += parseParams.options.table.cellMarginBottom;

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                trgaph: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param;

                    parseParams.styles.cells.dimensionCSSRules.padding = {
                        value: param / 20,
                        unit: "pt"
                    };

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                trbrdrt: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult;

                    parseParams.styles.table.dimensionCSSRules.borderTopWidth =
                        parseParams.styles.defaults.dimensionCSSRules.borderWidth;
                    parseParams.styles.table.css.borderTopStyle = parseParams.styles.defaults.css.borderStyle;
                    parseParams.styles.table.css.borderTopColor = parseParams.styles.defaults.css.borderColor;

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                trbrdrr: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult;

                    parseParams.styles.table.dimensionCSSRules.borderRightWidth =
                        parseParams.styles.defaults.dimensionCSSRules.borderWidth;
                    parseParams.styles.table.css.borderRightStyle = parseParams.styles.defaults.css.borderStyle;
                    parseParams.styles.table.css.borderRightColor = parseParams.styles.defaults.css.borderColor;

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                trbrdrl: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult;

                    parseParams.styles.table.dimensionCSSRules.borderLeftWidth =
                        parseParams.styles.defaults.dimensionCSSRules.borderWidth;
                    parseParams.styles.table.css.borderLeftStyle = parseParams.styles.defaults.css.borderStyle;
                    parseParams.styles.table.css.borderLeftColor = parseParams.styles.defaults.css.borderColor;

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                trbrdrb: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult;

                    parseParams.styles.table.dimensionCSSRules.borderBottomWidth =
                        parseParams.styles.defaults.dimensionCSSRules.borderWidth;
                    parseParams.styles.table.css.borderBottomStyle = parseParams.styles.defaults.css.borderStyle;
                    parseParams.styles.table.css.borderBottomColor = parseParams.styles.defaults.css.borderColor;

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                clvertalt: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param;

                    parseParams.styles.cells.css.verticalAlign = "top";

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                clvertalc: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param;

                    parseParams.styles.cells.css.verticalAlign = "middle";

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                clvertalb: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param;

                    parseParams.styles.cells.css.verticalAlign = "bottom";

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                clpadt: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param;

                    parseParams.styles.cells.dimensionCSSRules.paddingTop = {
                        value: param / 20,
                        unit: "pt"
                    };

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                clpadr: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param;

                    parseParams.styles.cells.dimensionCSSRules.paddingRight = {
                        value: param / 20,
                        unit: "pt"
                    };

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                clpadl: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param;

                    parseParams.styles.cells.dimensionCSSRules.paddingLeft = {
                        value: param / 20,
                        unit: "pt"
                    };

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                clpadft: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param;

                    if (param == 0) {
                        delete parseParams.styles.cells.dimensionCSSRules.paddingTop;
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                clpadfr: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param;

                    if (param == 0) {
                        delete parseParams.styles.cells.dimensionCSSRules.paddingRight;
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                clpadfl: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param;

                    if (param == 0) {
                        delete parseParams.styles.cells.dimensionCSSRules.paddingLeft;
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                clpadfb: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param;

                    if (param == 0) {
                        delete parseParams.styles.cells.dimensionCSSRules.paddingBottom;
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                clpadb: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param;

                    parseParams.styles.cells.dimensionCSSRules.paddingBottom = {
                        value: param / 20,
                        unit: "pt"
                    };

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                clbrdrt: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult;

                    parseParams.styles.cells.dimensionCSSRules.borderTopWidth =
                        parseParams.styles.defaults.dimensionCSSRules.borderWidth;
                    parseParams.styles.cells.css.borderTopStyle = parseParams.styles.defaults.css.borderStyle;
                    parseParams.styles.cells.css.borderTopColor = parseParams.styles.defaults.css.borderColor;

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                clbrdrr: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult;

                    parseParams.styles.cells.dimensionCSSRules.borderRightWidth =
                        parseParams.styles.defaults.dimensionCSSRules.borderWidth;
                    parseParams.styles.cells.css.borderRightStyle = parseParams.styles.defaults.css.borderStyle;
                    parseParams.styles.cells.css.borderRightColor = parseParams.styles.defaults.css.borderColor;

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                clbrdrl: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult;

                    parseParams.styles.cells.dimensionCSSRules.borderLeftWidth =
                        parseParams.styles.defaults.dimensionCSSRules.borderWidth;
                    parseParams.styles.cells.css.borderLeftStyle = parseParams.styles.defaults.css.borderStyle;
                    parseParams.styles.cells.css.borderLeftColor = parseParams.styles.defaults.css.borderColor;

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                clbrdrb: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult;

                    parseParams.styles.cells.dimensionCSSRules.borderBottomWidth =
                        parseParams.styles.defaults.dimensionCSSRules.borderWidth;
                    parseParams.styles.cells.css.borderBottomStyle = parseParams.styles.defaults.css.borderStyle;
                    parseParams.styles.cells.css.borderBottomColor = parseParams.styles.defaults.css.borderColor;

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                cellx: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        count,
                        param = options.param,
                        currentRowIndex,
                        table = parseParams.table,
                        page = parseResult.pages[parseParams.currentPageIndex],
                        body = table ? this._getTableBody(table) : null,
                        row = table ? body.children[body.children.length - 1] : null;

                    row = row || this._initRow();

                    if (!table) {
                        table = this._initTable({
                            row: row,
                            parseParams: parseParams,
                            parentElementsList: page.children,
                            parentElementsIndex: parseParams.currentElementIndex,
                            data: parseParams.currentTextElementParent
                        });
                        body = this._getTableBody(table);
                    }

                    count = body.children.length;
                    currentRowIndex = count ? count - 1 : 0;

                    table.options.cellsWidth[currentRowIndex] = table.options.cellsWidth[currentRowIndex] || [];
                    table.options.cellsWidth[currentRowIndex].push({
                        value: param / 20,
                        unit: "pt"
                    });

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                cell: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        count,
                        currentRowIndex,
                        currentCellIndex,
                        table = parseParams.table,
                        page = parseResult.pages[parseParams.currentPageIndex],
                        body = table ? this._getTableBody(table) : null,
                        row = body ? body[body.children.length - 1] : null;

                    row = row || this._initRow();

                    if (!table) {
                        table = this._initTable({
                            row: row,
                            parseParams: parseParams,
                            parentElementsList: page.children,
                            parentElementsIndex: parseParams.currentElementIndex,
                            data: parseParams.currentTextElementParent
                        });
                        body = this._getTableBody(table);
                    }

                    parseParams.currentTextElementParent.css = copy({},
                        parseParams.currentTextElementParent.css,
                        parseParams.styles.cells.css
                    );

                    parseParams.currentTextElementParent.dimensionCSSRules = copy({},
                        parseParams.currentTextElementParent.dimensionCSSRules,
                        parseParams.styles.cells.dimensionCSSRules
                    );

                    row.children.push(parseParams.currentTextElementParent);

                    count = body.children.length;
                    currentRowIndex = count ? count - 1 : 0;
                    count = row.children.length;
                    currentCellIndex = count ? count - 1 : 0;

                    if (
                        table.options.cellsWidth[currentRowIndex] &&
                        table.options.cellsWidth[currentRowIndex][currentCellIndex]
                    ) {
                        parseParams.currentTextElementParent.dimensionCSSRules.width =
                            parseParams.currentTextElementParent.dimensionCSSRules.width ||
                            table.options.cellsWidth[currentRowIndex][currentCellIndex];
                    }
                    parseParams.currentTextElementParent = {
                        options: {},
                        css: {},
                        dimensionCSSRules: {},
                        children: []
                    };
                    parseParams.currentTextElement = {
                        options: {},
                        css: {},
                        dimensionCSSRules: {},
                        properties: {
                            textContent: ""
                        }
                    };

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                pard: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        page = parseResult.pages[parseParams.currentPageIndex];

                    if (parseResult.table) {
                        parseResult.table = this._destroyTable(parseParams);
                        parseParams.currentElementIndex++;
                        parseParams.currentTextElementParent = jDoc.clone(parseParams.paragraphData);
                        page.children[parseParams.currentElementIndex] = parseParams.currentTextElementParent;
                        parseParams.currentTextElement = null;
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                par: function (options) {
                    var parseParams = options.parseParams,
                        paragraphHeight,
                        beforePartHeight,
                        parts,
                        i,
                        el,
                        children,
                        h,
                        count,
                        partHeight,
                        parseResult = options.parseResult;

                    if (parseParams.currentTextElementParent && parseParams.pageWidth && parseParams.pageHeight) {
                        paragraphHeight = this._getElementHeight(parseParams.currentTextElementParent, {
                            width: parseParams.pageWidth
                        });

                        // divide into several parts
                        if (paragraphHeight > parseParams.pageHeight) {
                            parts = [];
                            children = parseParams.currentTextElementParent.children;
                            count = children.length;
                            beforePartHeight = parseParams.pageContentHeight;
                            i = 0;

                            while (count) {
                                parts[i] = copy({}, parseParams.currentTextElementParent, {
                                    children: []
                                });
                                partHeight = 0;

                                while (partHeight < parseParams.pageHeight) {
                                    el = children.shift();
                                    parts[i].children.push(el);
                                    count--;

                                    h = this._getElementHeight(parts[i], {
                                        width: parseParams.pageWidth
                                    });

                                    if (beforePartHeight + h > parseParams.pageHeight || h > parseParams.pageHeight) {
                                        el = parts[i].children.pop();
                                        children.unshift(el);
                                        count++;
                                        break;
                                    }

                                    partHeight = beforePartHeight + h;

                                    if (!count) {
                                        break;
                                    }
                                }

                                if (!beforePartHeight) {
                                    this._createNewPage(options);
                                }

                                parseResult.pages[parseParams.currentPageIndex].children[parseParams.currentElementIndex] =
                                    parts[i];

                                i++;
                                beforePartHeight = 0;
                                parseParams.currentElementIndex++;
                            }

                            if (i) {
                                parseParams.currentElementIndex--;
                            }

                            if (partHeight < parseParams.pageHeight) {
                                paragraphHeight = partHeight;
                            } else {
                                paragraphHeight = 0;
                            }
                        } else if (parseParams.pageContentHeight + paragraphHeight > parseParams.pageHeight) {
                            this._createNewPage(options);
                            parseParams.currentElementIndex++;
                            parseResult.pages[parseParams.currentPageIndex].children[parseParams.currentElementIndex] =
                                parseParams.currentTextElementParent;
                            parseParams.currentElementIndex--;
                        }

                        parseParams.pageContentHeight += paragraphHeight;
                    }

                    parseParams.currentElementIndex++;

                    /**
                     * @description inherit previous paragraph
                     * @type {*}
                     */

                    parseParams.currentTextElementParent = copy({}, parseParams.paragraphData, {
                        children: []
                    });

                    parseResult.pages[parseParams.currentPageIndex].children[parseParams.currentElementIndex] =
                        parseParams.currentTextElementParent;

                    parseParams.currentTextElement = {
                        options: {},
                        css: {},
                        dimensionCSSRules: {},
                        properties: {
                            textContent: ""
                        }
                    };

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                jexpand: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult;

                    if (parseParams.currentTextElementParent) {
                        parseParams.currentTextElementParent.css.textAlign = "justify";
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                widowctrl: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        i;

                    parseParams.pageData.attributes.spellcheck = true;

                    for (i = parseResult.pages.length - 1; i >= 0; i--) {
                        parseResult.pages[i].attributes.spellcheck = parseParams.pageData.attributes.spellcheck;
                    }
                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                viewscale: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param;

                    if (param) {
                        parseResult.zoom = param;
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                pgwsxn: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param,
                        i;

                    if (!parseParams.pageData.dimensionCSSRules.width) {
                        parseParams.pageData.dimensionCSSRules.width = {
                            value: param / 20,
                            unit: "pt"
                        };
                        if (parseParams.pageWidth > 0) {
                            parseParams.pageWidth = 0;
                        }
                        parseParams.pageWidth = parseParams.pageData.dimensionCSSRules.width.value;
                        for (i = parseResult.pages.length - 1; i >= 0; i--) {
                            parseResult.pages[i].dimensionCSSRules.width = parseParams.pageData.dimensionCSSRules.width;
                        }
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                pghsxn: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param,
                        i;

                    if (!parseParams.pageData.dimensionCSSRules.height) {
                        parseParams.pageData.dimensionCSSRules.height = {
                            value: param / 20,
                            unit: "pt"
                        };
                        if (parseParams.pageHeight > 0) {
                            parseParams.pageHeight = 0;
                        }
                        parseParams.pageHeight -= parseParams.pageData.dimensionCSSRules.height.value;
                        for (i = parseResult.pages.length - 1; i >= 0; i--) {
                            parseResult.pages[i].dimensionCSSRules.height = parseParams.pageData.dimensionCSSRules.height;
                        }
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                paperw: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param,
                        i;

                    parseParams.pageData.dimensionCSSRules.width = {
                        value: param / 20,
                        unit: "pt"
                    };
                    if (parseParams.pageWidth > 0) {
                        parseParams.pageWidth = 0;
                    }
                    parseParams.pageWidth = parseParams.pageData.dimensionCSSRules.width.value;
                    for (i = parseResult.pages.length - 1; i >= 0; i--) {
                        parseResult.pages[i].dimensionCSSRules.width = parseParams.pageData.dimensionCSSRules.width;
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                paperh: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param,
                        i;

                    parseParams.pageData.dimensionCSSRules.height = {
                        value: param / 20,
                        unit: "pt"
                    };
                    if (parseParams.pageHeight > 0) {
                        parseParams.pageHeight = 0;
                    }

                    parseParams.pageHeight += parseParams.pageData.dimensionCSSRules.height.value;
                    for (i = parseResult.pages.length - 1; i >= 0; i--) {
                        parseResult.pages[i].dimensionCSSRules.height = parseParams.pageData.dimensionCSSRules.height;
                    }
                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                page: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult;

                    this._createNewPage(options);

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                margtsxn: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param,
                        i;

                    if (!parseParams.pageData.dimensionCSSRules.paddingTop) {
                        parseParams.pageData.dimensionCSSRules.paddingTop = {
                            value: param / 20,
                            unit: "pt"
                        };
                        parseParams.pageHeight -= parseParams.pageData.dimensionCSSRules.paddingTop.value;
                        for (i = parseResult.pages.length - 1; i >= 0; i--) {
                            parseResult.pages[i].dimensionCSSRules.paddingTop = parseParams.pageData.dimensionCSSRules.paddingTop;
                        }
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                margt: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param,
                        i;

                    parseParams.pageData.dimensionCSSRules.paddingTop = {
                        value: param / 20,
                        unit: "pt"
                    };
                    parseParams.pageHeight -= parseParams.pageData.dimensionCSSRules.paddingTop.value;
                    for (i = parseResult.pages.length - 1; i >= 0; i--) {
                        parseResult.pages[i].dimensionCSSRules.paddingTop = parseParams.pageData.dimensionCSSRules.paddingTop;
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                margrsxn: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param,
                        i;

                    if (!parseParams.pageData.dimensionCSSRules.paddingRight) {
                        parseParams.pageData.dimensionCSSRules.paddingRight = {
                            value: param / 20,
                            unit: "pt"
                        };
                        parseParams.pageWidth -= parseParams.pageData.dimensionCSSRules.paddingRight.value;
                        for (i = parseResult.pages.length - 1; i >= 0; i--) {
                            parseResult.pages[i].dimensionCSSRules.paddingRight = parseParams.pageData.dimensionCSSRules.paddingRight;
                        }

                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                margr: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param,
                        i;

                    parseParams.pageData.dimensionCSSRules.paddingRight = {
                        value: param / 20,
                        unit: "pt"
                    };
                    parseParams.pageWidth -= parseParams.pageData.dimensionCSSRules.paddingRight.value;
                    for (i = parseResult.pages.length - 1; i >= 0; i--) {
                        parseResult.pages[i].dimensionCSSRules.paddingRight = parseParams.pageData.dimensionCSSRules.paddingRight;
                    }
                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                marglsxn: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param,
                        i;

                    if (!parseParams.pageData.dimensionCSSRules.paddingLeft) {
                        parseParams.pageData.dimensionCSSRules.paddingLeft = {
                            value: param / 20,
                            unit: "pt"
                        };
                        parseParams.pageWidth -= parseParams.pageData.dimensionCSSRules.paddingLeft.value;
                        for (i = parseResult.pages.length - 1; i >= 0; i--) {
                            parseResult.pages[i].dimensionCSSRules.paddingLeft = parseParams.pageData.dimensionCSSRules.paddingLeft;
                        }
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                margl: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param,
                        i;

                    parseParams.pageData.dimensionCSSRules.paddingLeft = {
                        value: param / 20,
                        unit: "pt"
                    };
                    parseParams.pageWidth -= parseParams.pageData.dimensionCSSRules.paddingLeft.value;
                    for (i = parseResult.pages.length - 1; i >= 0; i--) {
                        parseResult.pages[i].dimensionCSSRules.paddingLeft = parseParams.pageData.dimensionCSSRules.paddingLeft;
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                margbsxn: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param,
                        i;

                    if (!parseParams.pageData.dimensionCSSRules.paddingBottom) {
                        parseParams.pageData.dimensionCSSRules.paddingBottom = {
                            value: param / 20,
                            unit: "pt"
                        };
                        parseParams.pageHeight -= parseParams.pageData.dimensionCSSRules.paddingBottom.value;
                        for (i = parseResult.pages.length - 1; i >= 0; i--) {
                            parseResult.pages[i].dimensionCSSRules.paddingBottom = parseParams.pageData.dimensionCSSRules.paddingBottom;
                        }
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                margb: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param,
                        i;

                    parseParams.pageData.dimensionCSSRules.paddingBottom = {
                        value: param / 20,
                        unit: "pt"
                    };
                    parseParams.pageHeight -= parseParams.pageData.dimensionCSSRules.paddingBottom.value;
                    for (i = parseResult.pages.length - 1; i >= 0; i--) {
                        parseResult.pages[i].dimensionCSSRules.paddingBottom = parseParams.pageData.dimensionCSSRules.paddingBottom;
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                gutter: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param,
                        i;

                    parseParams.pageData.dimensionCSSRules.marginTop = {
                        value: param / 20,
                        unit: "pt"
                    };
                    for (i = parseResult.pages.length - 1; i > 0; i--) {
                        parseResult.pages[i].dimensionCSSRules.marginTop = parseParams.pageData.dimensionCSSRules.marginTop;
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                picwgoal: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param;

                    if (param > 0) {
                        parseParams.currentTextElementParent.dimensionCSSRules.width = {
                            value: param / 20,
                            unit: "pt"
                        };
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                pict: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult;

                    parseParams.currentTextElementParent = this._initImage({
                        data: parseParams.currentTextElementParent
                    });

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                picscaley: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param;

                    if (parseParams.currentTextElementParent.dimensionCSSRules.width) {
                        parseParams.currentTextElementParent.dimensionCSSRules.width.value = Math.round(
                            parseParams.currentTextElementParent.dimensionCSSRules.width.value * param / 100
                        );
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                picscalex: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param;

                    if (parseParams.currentTextElementParent.dimensionCSSRules.height) {
                        parseParams.currentTextElementParent.dimensionCSSRules.height.value = Math.round(
                            parseParams.currentTextElementParent.dimensionCSSRules.height.value * param / 100
                        );
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                pichgoal: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param;

                    if (param > 0) {
                        parseParams.currentTextElementParent.dimensionCSSRules.height = {
                            value: param / 20,
                            unit: "pt"
                        };
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                ul: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param,
                        el = parseParams.currentTextElement || parseParams.currentTextElementParent;

                    if (param !== -1) {
                        el.css.textDecoration = "underline";
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                u: function (options) {
                    var parseParams = options.parseParams,
                        param = options.param,
                        parseResult = options.parseResult;

                    if (parseParams.currentTextElement && param) {
                        parseParams.currentTextElement.properties.textContent += String.fromCharCode(param);
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                tab: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult;

                    if (parseParams.currentTextElement) {
                        parseParams.currentTextElement.properties.textContent += this.getTabAsSpaces();
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                strike: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param,
                        el = parseParams.currentTextElement || parseParams.currentTextElementParent;

                    if (param !== -1) {
                        el.css.textDecoration = "line-through";
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                sl: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = (options.param !== -1 && options.param) || 0,
                        el = parseParams.currentTextElement || parseParams.currentTextElementParent;

                    if (param > 0) {
                        param /= 20;

                        if (!el.dimensionCSSRules.fontSize || this.getMaxFontSize(el) <= param) {
                            el.dimensionCSSRules.lineHeight = {
                                value: param,
                                unit: "pt"
                            };
                        }
                    } else if (param < 0) {
                        el.dimensionCSSRules.lineHeight = {
                            value: Math.abs(param) / 20,
                            unit: "pt"
                        };
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                scaps: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param,
                        el = parseParams.currentTextElement || parseParams.currentTextElementParent;

                    if (param !== -1) {
                        el.css.fontVariant = "small-caps";
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                sb: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param;

                    if (param > 0) {
                        parseParams.currentTextElementParent.dimensionCSSRules.marginTop = {
                            value: param / 20,
                            unit: "pt"
                        };
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                sa: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param;

                    if (param > 0) {
                        parseParams.currentTextElementParent.dimensionCSSRules.marginBottom = {
                            value: param / 20,
                            unit: "pt"
                        };
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                rtlch: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult;

                    parseParams.currentTextElementParent.css.direction = "rtl";

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                rin: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        propertyName,
                        param = options.param;

                    if (parseParams.currentTextElementParent) {
                        if (parseParams.currentTextElementParent.css.direction === "rtl") {
                            propertyName = "paddingLeft";
                        } else {
                            propertyName = "paddingRight";
                        }

                        parseParams.currentTextElementParent.dimensionCSSRules[propertyName] = {
                            value: param / 20,
                            unit: "pt"
                        };
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                ri: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param;

                    if (param > 0) {
                        parseParams.currentTextElementParent.dimensionCSSRules.paddingRight = {
                            value: param / 20,
                            unit: "pt"
                        };
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                qr: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param;

                    if (param !== -1) {
                        parseParams.currentTextElementParent.css.textAlign = "right";
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                ql: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param;

                    if (param !== -1) {
                        parseParams.currentTextElementParent.css.textAlign = "left";
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                qj: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param;

                    if (param !== -1) {
                        parseParams.currentTextElementParent.css.textAlign = "justify";
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                qc: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param;

                    if (param !== -1) {
                        parseParams.currentTextElementParent.css.textAlign = "center";
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                plain: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        el = parseParams.currentTextElement || parseParams.currentTextElementParent;

                    this._resetFontProperties(el);

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                ltrch: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult;

                    parseParams.currentTextElementParent.css.direction = "ltr";

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                lin: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        propertyName,
                        param = options.param;

                    if (parseParams.currentTextElementParent) {
                        if (parseParams.currentTextElementParent.css.direction === "rtl") {
                            propertyName = "paddingRight";
                        } else {
                            propertyName = "paddingLeft";
                        }

                        parseParams.currentTextElementParent.dimensionCSSRules[propertyName] = {
                            value: param / 20,
                            unit: "pt"
                        };
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                li: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param;

                    if (param > 0) {
                        parseParams.currentTextElementParent.dimensionCSSRules.paddingLeft = {
                            value: param / 20,
                            unit: "pt"
                        };
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                i: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param,
                        el = parseParams.currentTextElement || parseParams.currentTextElementParent;

                    if (param !== -1) {
                        el.css.fontStyle = "italic";
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                fs: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param,
                        el = parseParams.currentTextElement || parseParams.currentTextElementParent;

                    if (param !== -1) {
                        el.dimensionCSSRules.fontSize = {
                            value: param / 2,
                            unit: "pt"
                        };
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                fi: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param;

                    if (param > 0) {
                        parseParams.currentTextElementParent.dimensionCSSRules.textIndent = {
                            value: param / 20,
                            unit: "pt"
                        };
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                expndtw: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param,
                        el = parseParams.currentTextElement || parseParams.currentTextElementParent;

                    if (param > 0) {
                        el.dimensionCSSRules.letterSpacing = {
                            value: param / 20,
                            unit: "pt"
                        };
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                expnd: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param,
                        el = parseParams.currentTextElement || parseParams.currentTextElementParent;

                    if (param > 0) {
                        el.dimensionCSSRules.letterSpacing = {
                            value: param / 4,
                            unit: "pt"
                        };
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                endash: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult;

                    if (parseParams.currentTextElement) {
                        parseParams.currentTextElement.properties.textContent += this.getEnDash();
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                emdash: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult;

                    if (parseParams.currentTextElement) {
                        parseParams.currentTextElement.properties.textContent += this.getEmDash();
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                charscalex: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        fontSize,
                        param = options.param;

                    if (parseParams.currentTextElement && parseParams.currentTextElement.dimensionCSSRules.fontSize) {
                        fontSize = parseParams.currentTextElement.dimensionCSSRules.fontSize;
                    } else if (parseParams.currentTextElementParent && parseParams.currentTextElementParent.dimensionCSSRules.fontSize) {
                        fontSize = parseParams.currentTextElementParent.dimensionCSSRules.fontSize;
                    }

                    if (fontSize) {
                        fontSize.value = Math.round(fontSize.value * param / 100);
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                brdrw: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param,
                        el = parseParams.currentTextElement || parseParams.currentTextElementParent;

                    el.dimensionCSSRules.borderWidth = {
                        value: param / 20,
                        unit: "pt"
                    };

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                brdrs: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        el = parseParams.currentTextElement || parseParams.currentTextElementParent;

                    el.css.borderStyle = "solid";

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                b: function (options) {
                    var parseParams = options.parseParams,
                        parseResult = options.parseResult,
                        param = options.param,
                        el = parseParams.currentTextElement || parseParams.currentTextElementParent;

                    if (param !== -1) {
                        el.css.fontWeight = "bold";
                    }

                    return {
                        parseParams: parseParams,
                        parseResult: parseResult
                    };
                },
                ai: function () {
                    return this._controlWordsParsers.i.apply(this, arguments);
                },
                afs: function (options) {
                    return this._controlWordsParsers.fs.apply(this, arguments);
                },
                ab: function (options) {
                    return this._controlWordsParsers.b.apply(this, arguments);
                }
            },
            _createNewPage: function (options) {
                var parseParams = options.parseParams,
                    page,
                    parseResult = options.parseResult;

                parseResult.table = this._destroyTable(parseParams);
                parseParams.currentTextElementParent = clone(parseParams.paragraphData);
                parseParams.currentTextElement = {
                    options: {},
                    css: {},
                    dimensionCSSRules: {},
                    properties: {
                        textContent: ""
                    }
                };
                parseParams.currentPageIndex++;
                parseParams.currentElementIndex = -1;
                parseParams.pageContentHeight = 0;

                page = copy({}, parseParams.pageData, {
                    children: []
                });
                parseResult.pages[parseParams.currentPageIndex] = page;

                return {
                    parseParams: parseParams,
                    parseResult: parseResult
                };
            },
            _destroyTable: function (parseParams) {
                parseParams.styles.cells = {
                    css: {},
                    dimensionCSSRules: {}
                };
                parseParams.styles.rows = {
                    css: {},
                    dimensionCSSRules: {}
                };
                parseParams.styles.table = {
                    css: {},
                    dimensionCSSRules: {}
                };
                parseParams.options.table = {};

                return null;
            },
            _getElementHeight: function (element, options) {
                options = options || {};

                var height = (element.dimensionCSSRules.height && element.dimensionCSSRules.height.value) || 0,
                    i,
                    textContent,
                    fontSize,
                    elementsHeight = 0,
                    lineHeight = (element.dimensionCSSRules.lineHeight && element.dimensionCSSRules.lineHeight.value) || 0,
                    width = options.width || 0,
                    len;

                if (lineHeight > height) {
                    height = lineHeight;
                }

                height += (element.dimensionCSSRules.marginTop && element.dimensionCSSRules.marginTop.value) || 0;
                height += (element.dimensionCSSRules.marginBottom && element.dimensionCSSRules.marginBottom.value) || 0;
                height += (element.dimensionCSSRules.paddingTop && element.dimensionCSSRules.paddingTop.value) || 0;
                height += (element.dimensionCSSRules.paddingBottom && element.dimensionCSSRules.paddingBottom.value) || 0;

                if (width) {
                    width -= (element.dimensionCSSRules.paddingLeft && element.dimensionCSSRules.paddingLeft.value) || 0;
                    width -= (element.dimensionCSSRules.paddingRight && element.dimensionCSSRules.paddingRight.value) || 0;
                    width -= (element.dimensionCSSRules.marginLeft && element.dimensionCSSRules.marginLeft.value) || 0;
                    width -= (element.dimensionCSSRules.marginRight && element.dimensionCSSRules.marginRight.value) || 0;
                }

                if (element.options.isParagraph) {
                    len = (element.children && element.children.length) || 0;
                    textContent = "";
                    fontSize = 0;
                    elementsHeight = 0;

                    for (i = 0; i < len; i++) {
                        textContent += element.children[i].properties.textContent;

                        if (!fontSize && element.children[i].properties.textContent[0]) {
                            fontSize = (
                                element.children[i].dimensionCSSRules.fontSize && element.children[i].dimensionCSSRules.fontSize.value
                            ) || 0;
                        }

                        if (element.children[i].dimensionCSSRules.lineHeight && element.children[i].dimensionCSSRules.lineHeight.value) {
                            lineHeight = element.children[i].dimensionCSSRules.lineHeight.value;
                        }
                    }

                    if (textContent[0]) {
                        elementsHeight = this.spotElementHeight({
                            el: {
                                textContent: textContent
                            },
                            lineHeight: lineHeight / fontSize,
                            width: width,
                            parentFontSize: (element.dimensionCSSRules.fontSize && element.dimensionCSSRules.fontSize.value),
                            fontSize: fontSize
                        });
                    }

                    if (elementsHeight > height) {
                        height = elementsHeight;
                    }
                }

                return height;
            },
            _getTableBody: function (table) {
                if (!table || !table.children) {
                    return null;
                }

                var i,
                    len = table.children.length;

                for (i = len - 1; i >= 0; i--) {
                    if (!table.children[i].options || !table.children[i].options.isHeader || !table.children[i].options.isFooter) {
                        return table.children[i];
                    }
                }

                return null;
            },
            _ignoreControlWordGroups: {
                "stylesheet": true,
                "fonttbl": true,
                "colortbl": true,
                "info": true,
                "fldrslt": true,
                "field": true
            },
            _initImage: function (params) {
                params = params || {};

                var image = copy(params.data || {}, {
                    options: {
                        isImage: true
                    },
                    properties: {},
                    attributes: {},
                    css: {},
                    dimensionCSSRules: {}
                });

                delete image.options.isParagraph;

                return image;
            },
            _initRow: function () {
                return {
                    children: [],
                    css: {},
                    options: {},
                    dimensionCSSRules: {}
                };
            },
            _initTable: function (params) {
                params = params || {};

                var data = params.params || {},
                    body = {
                        children: []
                    },
                    table = {
                        options: copy(data.options, {
                            isTable: true,
                            elementHeight: {
                                value: 0,
                                unit: "pt"
                            },
                            cellsWidth: []
                        }),
                        children: [{
                                options: {
                                    isHeader: true
                                },
                                children: []
                            }, {
                                options: {
                                    isFooter: true
                                },
                                children: []
                            },
                            body
                        ],
                        attributes: clone(data.attributes),
                        dimensionCSSRules: clone(data.dimensionCSSRules),
                        css: copy({}, data.css, {
                            borderCollapse: "collapse"
                        })
                    };

                delete table.options.isParagraph;

                if (params.row) {
                    body.children.push(params.row);
                }

                if (params.parentElementsList) {
                    params.parentElementsList[params.parentElementsIndex || 0] = table;
                }

                table.css = copy({},
                    table.css,
                    params.parseParams.styles.table.css
                );

                table.dimensionCSSRules = copy({},
                    table.dimensionCSSRules,
                    params.parseParams.styles.table.dimensionCSSRules
                );

                if (params.parseParams) {
                    params.parseParams.table = table;
                }

                return table;
            },
            _parseControlWord: function (text, index, parseParams, parseResult) {
                var match,
                    matchedPart,
                    clearedControlWord,
                    controlWordParseResult,
                    param,
                    paramText = "",
                    controlWord = "",
                    controlWordParserData = "";

                while (text[index] !== '\\' && text[index] !== '{' && text[index] !== '}') {
                    if (text[index] === ' ' && !parseParams.hexWordsMask.test(controlWord)) {
                        break;
                    }

                    if (text[index] !== '\r' && text[index] !== '\n') {
                        if (text[index] === '*') {
                            parseParams.ignoreGroups.push(parseParams.braceCounter);
                        } else {
                            controlWord += text[index];
                        }
                    } else if (controlWord[0]) {
                        break;
                    }

                    index += 1;
                }
                index += text[index] === ' ' ? 1 : 0;

                if (controlWord[0] === "'") {
                    /**
                     * @type {Array|null}
                     */
                    matchedPart = controlWord.match(/[a-z0-9]+/gi);

                    if (matchedPart) {
                        param = matchedPart[0];

                        matchedPart = controlWord.match(/[^a-z0-9]+$/gi);
                        paramText = matchedPart ? matchedPart[0] : "";
                        controlWord = "'";
                        clearedControlWord = controlWord;
                    }
                } else {
                    match = controlWord.search(/-?\d+$/gi);

                    if (match !== -1) {
                        param = parseInt(controlWord.substr(match), 10);
                        controlWord = controlWord.substr(0, match);
                    }

                    clearedControlWord = controlWord.replace(/[;]/, '');
                }

                if (this._ignoreControlWordGroups[clearedControlWord]) {
                    parseParams.ignoreGroups.push(parseParams.braceCounter);
                } else if (clearedControlWord && !parseParams.ignoreGroups.length) {
                    if (this._controlWordsParsers[clearedControlWord]) {
                        controlWordParserData = {
                            clearedControlWord: clearedControlWord,
                            controlWord: controlWord,
                            parseResult: parseResult,
                            parseParams: parseParams,
                            paramText: paramText,
                            param: param
                        };
                        controlWordParseResult = this._controlWordsParsers[clearedControlWord].call(this, controlWordParserData);
                        parseResult = controlWordParseResult.parseResult;
                        parseParams = controlWordParseResult.parseParams;
                        controlWordParserData = null;
                        controlWordParseResult = null;
                    } else {
                        parseParams.unParsedControlWords[controlWord] = true;
                    }
                }

                return index;
            },
            _resetFontProperties: function (el) {
                el.css.fontStyle = "none";
                el.css.fontVariant = "none";
                el.css.textDecoration = "none";
                el.css.fontWeight = "normal";
                el.dimensionCSSRules.fontSize = {
                    value: 12,
                    unit: "pt"
                };

                return el;
            },
            createFileData: function (text, callback) {
                var i = 0,
                    textContent,
                    pageHeight = 756,
                    pageWidth = 595,
                    parseParams = {
                        unParsedControlWords: {},
                        styles: {
                            cells: {
                                css: {},
                                dimensionCSSRules: {}
                            },
                            table: {
                                css: {
                                    width: "100%"
                                },
                                dimensionCSSRules: {}
                            },
                            rows: {
                                css: {},
                                dimensionCSSRules: {}
                            },
                            defaults: {
                                css: {
                                    borderStyle: "solid",
                                    borderColor: "#000000"
                                },
                                dimensionCSSRules: {
                                    borderWidth: {
                                        value: 0.75,
                                        unit: "pt"
                                    }
                                }
                            }
                        },
                        options: {
                            table: {}
                        },
                        pageData: {
                            options: {},
                            attributes: {},
                            css: {},
                            dimensionCSSRules: {
                                paddingBottom: {
                                    unit: "pt",
                                    value: 42.5
                                },
                                paddingLeft: {
                                    unit: "pt",
                                    value: 70.85
                                },
                                paddingRight: {
                                    unit: "pt",
                                    value: 42.5
                                },
                                paddingTop: {
                                    unit: "pt",
                                    value: 42.5
                                },
                                width: {
                                    value: pageWidth,
                                    unit: "pt"
                                },
                                height: {
                                    value: pageHeight,
                                    unit: "pt"
                                }
                            },
                            children: []
                        },
                        paragraphData: {
                            options: {
                                isParagraph: true
                            },
                            css: {
                                margin: "0"
                            },
                            dimensionCSSRules: {
                                // default font size
                                fontSize: {
                                    value: 14,
                                    unit: "pt"
                                }
                            },
                            children: []
                        },
                        hexWordsMask: (/^'/),
                        pageContentHeight: 0,
                        pageHeight: pageHeight,
                        pageWidth: pageWidth,
                        currentTextElementParent: null,
                        currentTextElement: null,
                        currentPageIndex: 0,
                        currentElementIndex: 0,
                        ignoreGroups: [],
                        braceCounter: 0
                    },
                    parseResult = {
                        name: this.getFileName(),
                        pages: [copy(parseParams.pageData, {
                            children: [copy(parseParams.paragraphData, {
                                children: [{
                                    options: {},
                                    css: {},
                                    dimensionCSSRules: {},
                                    properties: {
                                        textContent: ""
                                    }
                                }]
                            })]
                        })]
                    };

                parseParams.currentTextElementParent = parseResult.pages[0].children[0];
                parseParams.currentTextElement = parseParams.currentTextElementParent.children[0];

                while (text[i]) {
                    switch (text[i]) {
                    case '\r':
                        i += 1;
                        break;
                    case '\n':
                        i += 1;
                        break;
                    case '\\':
                        i += 1;
                        if (text[i] !== '\\') {
                            i = this._parseControlWord(text, i, parseParams, parseResult);
                        } else {
                            if (!parseParams.ignoreGroups.length) {
                                if (!parseParams.currentTextElement) {
                                    parseParams.currentTextElement = {
                                        options: {},
                                        css: {},
                                        dimensionCSSRules: {},
                                        properties: {
                                            textContent: ""
                                        }
                                    };
                                    if (parseParams.currentTextElementParent.options.isImage) {
                                        parseParams.currentTextElementParent.attributes.src = (
                                            parseParams.currentTextElementParent.attributes.src || ""
                                        ) + parseParams.currentTextElement.properties.textContent;
                                    } else {
                                        parseParams.currentTextElementParent.children.push(parseParams.currentTextElement);
                                    }
                                }
                                if (parseParams.currentTextElementParent.options.isImage) {
                                    parseParams.currentTextElementParent.attributes.src = (
                                        parseParams.currentTextElementParent.attributes.src || ""
                                    ) + text[i];
                                } else {
                                    parseParams.currentTextElement.properties.textContent += text[i];
                                }
                            }
                            i += 1;
                        }
                        break;
                    case '{':
                        parseParams.braceCounter += 1;
                        i += 1;
                        break;
                    case '}':
                        if (parseParams.braceCounter === parseParams.ignoreGroups[parseParams.ignoreGroups.length - 1]) {
                            parseParams.ignoreGroups.pop();
                        }
                        parseParams.braceCounter -= 1;
                        i += 1;
                        if (parseParams.currentTextElement && parseParams.currentTextElement.properties.textContent.length) {
                            if (parseParams.currentTextElementParent.children.indexOf(parseParams.currentTextElement) < 0) {
                                parseParams.currentTextElementParent.children.push(parseParams.currentTextElement);
                            }
                            parseParams.currentTextElement = {
                                options: {},
                                css: {},
                                dimensionCSSRules: {},
                                properties: {
                                    textContent: ""
                                }
                            };
                        }
                        break;
                    default:
                        textContent = "";
                        if (!parseParams.ignoreGroups.length) {
                            if (!parseParams.currentTextElement) {
                                parseParams.currentTextElement = {
                                    options: {},
                                    css: {},
                                    dimensionCSSRules: {},
                                    properties: {
                                        textContent: ""
                                    }
                                };
                                if (parseParams.currentTextElementParent.options.isImage) {
                                    parseParams.currentTextElementParent.attributes.src = (
                                        parseParams.currentTextElementParent.attributes.src || ""
                                    ) + parseParams.currentTextElement.properties.textContent;
                                } else {
                                    parseParams.currentTextElementParent.children.push(parseParams.currentTextElement);
                                }
                            }
                            if (text[i] === " " && text[i + 1] === " ") {
                                i += 1;
                                textContent = this.getHalfTabAsSpaces();
                            } else {
                                textContent = text[i];
                            }

                            if (parseParams.currentTextElementParent.options.isImage) {
                                parseParams.currentTextElementParent.attributes.src = (
                                    parseParams.currentTextElementParent.attributes.src || ""
                                ) + textContent;
                            } else {
                                parseParams.currentTextElement.properties.textContent += textContent;
                            }
                        }
                        i += 1;
                        break;
                    }
                }

                if (typeof callback === 'function') {
                    callback.call(this, new jDoc.FileData(parseResult));
                }
            },
            fileTypeParsers: [{
                extension: ['rtf'],
                mime: ['text/rtf', 'application/rtf']
            }],
            initialize: function () {
                this.on('parsefromsimplefilestart', function () {
                    this.trigger('parsestart');
                }.bind(this));
                this.on('parsefromsimplefile', function (fileData) {
                    this.trigger('parse', fileData);
                }.bind(this));
                this.on('parsefromsimplefileend', function () {
                    this.trigger('parseend');
                }.bind(this));
            },
            options: {
                parseMethod: "parseFromSimpleFile"
            }
        }
    );

    jDoc.defineEngine('RTF', [
        "text/rtf",
        "application/rtf"
    ], RTF);
    /**
     *
     */
    var Simple = jDoc.Engine.extend(
        /** @lends Simple.prototype */
        {
            createFileData: function (text, callback) {
                var textContent,
                    i,
                    j,
                    l,
                    len,
                    textLines,
                    textSections,
                    breaks,
                    element,
                    isLink = false,
                    children = [];

                textLines = text.split(/\n/);
                l = textLines.length;

                for (j = 0; j < l; j++) {
                    textSections = textLines[j].split(/\s/);
                    len = textSections.length;

                    for (i = 0; i < len; i++) {
                        if (textSections[i]) {
                            isLink = jDoc.validateURL(textSections[i]);

                            element = {
                                options: {},
                                css: {},
                                attributes: {},
                                properties: {
                                    textContent: textSections[i] + " "
                                }
                            };

                            if (isLink) {
                                breaks = textSections[i].replace(/\S+/g, '') + " ";
                                textContent = textSections[i].replace(/\s+/, '');
                                element.isLink = true;
                                element.href = textContent;
                                element.properties.textContent = textContent;
                                element.after = breaks;
                            }

                            children.push(element);
                        }
                    }

                    if (j < l - 1) {
                        children.push(element = {
                            options: {
                                isEmptyLine: true
                            },
                            css: {},
                            attributes: {},
                            properties: {}
                        });
                    }
                }

                if (typeof callback === 'function') {
                    callback(
                        new jDoc.FileData({
                            name: this.getFileName(),
                            pages: [{
                                options: {},
                                css: {},
                                children: [{
                                    options: {
                                        isParagraph: true
                                    },
                                    css: {},
                                    children: [{
                                        options: {},
                                        css: {},
                                        children: children
                                    }]
                                }]
                            }]
                        })
                    );
                }
            },
            fileTypeParsers: [{
                extension: ['txt', ''],
                mime: ['text/plain', ''],
                isTextDocument: true
            }],
            initialize: function () {
                this.on('parsefromsimplefilestart', function () {
                    this.trigger('parsestart');
                }.bind(this));
                this.on('parsefromsimplefile', function (fileData) {
                    this.trigger('parse', fileData);
                }.bind(this));
                this.on('parsefromsimplefileend', function () {
                    this.trigger('parseend');
                }.bind(this));
            },
            options: {
                parseMethod: "parseFromSimpleFile"
            }
        }
    );

    /**
     * @type {Object}
     */
    jDoc.defineEngine('Simple', ['text/plain'], Simple);
    if (typeof define === "function" && define.amd) {
        define("jDoc", [], function () {
            return jDoc;
        });
    } else {
        window.jDoc = jDoc;
    }
}(window, document, navigator));
