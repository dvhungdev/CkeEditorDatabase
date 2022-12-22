import demo1Image from "./asssets/demo/demo1.png";
import demo2Image from "./asssets/demo/demo2.png";
import demo3Image from "./asssets/demo/demo3.png";
import jQuery from "jquery";

const convertRaw = {

    KeoThaDapAn: {
        Image: demo1Image,
        ConvertRaw: function (raw) {
            raw = raw.replaceAll("(", "<strong>(");
            raw = raw.replaceAll(")", ")</strong>");
            raw = raw.replaceAll("A:", "<strong>A: </strong>");
            raw = raw.replaceAll("B:", "<strong>B: </strong>");

            // let arr = raw.split("\n");
            // let result = "";
            // if (Array.isArray(arr)) {
            //     for (let index = 0; index < arr.length; index++) {
            //         const text = arr[index];
            //         if (index % 2 == 1) {
            //             result = result + `<em>${text}</em>`;
            //         } else {
            //             result = result + text;
            //         }
            //     }

            // } else {
            //     result = raw;
            // }

            // return result;
            return raw;
        }
    },

    DapAnABCLoai1: {
        Image: demo2Image,
        ConvertRaw: function (raw) {
            let arrDapAn = ["A.", "B.", "C.", "D.", "E.", "F."];
            let result = "";
            for (let arrDapAnIndex = 0; arrDapAnIndex < arrDapAn.length; arrDapAnIndex++) {
                const textDapAn = arrDapAn[arrDapAnIndex];
                let arr = raw.split(textDapAn);
                let text = "";
                if (Array.isArray(arr) && arr.length > 1) {
                    let tmp1 = arr[1];
                    let indexTmp = tmp1.indexOf(arrDapAn[arrDapAnIndex + 1]);
                    if (indexTmp > -1) {
                        text = tmp1.substring(0, indexTmp);
                    } else {
                        text = arr[1];
                    }

                    text = text.replaceAll("<br />", "");
                    text = text.trim();
                    if (text != "") {
                        result = result + `${text}<br />\n`;
                    }
                }

                if (arr?.length == 1) {
                    break;
                }
            }

            return result;
        }
    },

    DapAnABCLoai2: {
        Image: demo2Image,
        ConvertRaw: function (raw) {
            let arrDapAn = ["1.", "2.", "3.", "4.", "5.", "6.", "7.", "8.", "9.", "10.", "11.", "12.", "13.", "14.", "15.", "16.", "17.", "18."];
            let result = "";
            for (let arrDapAnIndex = 0; arrDapAnIndex < arrDapAn.length; arrDapAnIndex++) {
                const textDapAn = arrDapAn[arrDapAnIndex];
                let arr = raw.split(textDapAn);
                let text = "";
                if (Array.isArray(arr) && arr.length > 1) {
                    let tmp1 = arr[1];
                    let indexTmp = tmp1.indexOf(arrDapAn[arrDapAnIndex + 1]);
                    if (indexTmp > -1) {
                        text = tmp1.substring(0, indexTmp);
                    } else {
                        text = arr[1];
                    }

                    text = text.replaceAll("<br />", "");
                    text = text.trim();
                    if (text != "") {
                        result = result + `${text}<br />\n`;
                    }
                }

                if (arr?.length == 1) {
                    break;
                }
            }

            return result;
        }
    },

    RawLoaiTable: {
        Image: demo2Image,
        ConvertRaw: function (raw) {
            let result = "";

            let listAbc = ["A.", "B.", "C.", "D.", "E."]

            let dom = jQuery(`<div>${raw}</div>`);
            let elTds = jQuery(dom).find("td");
            jQuery(elTds).each(function (index) {
                let text = jQuery(this).text();
                text = text.trim();

                listAbc.forEach(item => {
                    if (text.startsWith(item)) {
                        text = text.replace(item, "");

                        result = result + text.trim() + "<br />\n";
                    }
                });
            });

            return result;
        }
    },
    RawLoaiTable2: {
        Image: demo2Image,
        ConvertRaw: function (raw) {
            let result = "";

            debugger
            let dom = jQuery(`<div>${raw}</div>`);

            let elTrs = jQuery(dom).find("tr");
            jQuery(elTrs).each(function (index) {
                let elTds = jQuery(this).find("td");

                jQuery(elTds).each(function (index) {
                    let text = jQuery(this).text();
                    text = text.trim();
                    result = result + text.trim() + " ";
                });

                result += '"<br />\n"';
            });


            // let elTds = jQuery(dom).find("td");
            // jQuery(elTds).each(function (index) {
            //     let text = jQuery(this).text();
            //     text = text.trim();

            //     listAbc.forEach(item => {
            //         if (text.startsWith(item)) {
            //             text = text.replace(item, "");

            //             result = result + text.trim() + "<br />\n";
            //         }
            //     });
            // });

            return result;
        }
    },

    RawLoai123Span: {
        Image: demo2Image,
        ConvertRaw: function (raw) {
            let result = "";

            let listAbc = ["1.", "2.", "3.", "4.", "5."]
            debugger

            let dom = jQuery(`<div>${raw}</div>`);
            let elTds = jQuery(dom).find("span");
            jQuery(elTds).each(function (index) {
                let text = jQuery(this).html();
                text = text.trim();

                listAbc.forEach(item => {
                    if (text.startsWith(item)) {
                        text = text.replace(item, "");

                        result = result + text.trim() + "<br />\n";
                    }
                });
            });

            return result;
        }
    },

    RawTachDapAnABC: {
        Image: demo3Image,
        ConvertRaw: function (raw) {
            let result = "";

            let dom = jQuery(`<div>${raw}</div>`);
            let elTds = jQuery(dom).find("td");
            jQuery(elTds).each(function (index) {
                if (index != 0 && index % 2 == 0) {
                    result = result + "<br />\n"
                } else {
                    result = result + " ";
                }

                result = result + jQuery(this).html();
            });

            return result;
        }
    },



    DongNgoacInNgieng: {
        Image: demo2Image,
        ConvertRaw: function (raw) {
            raw = raw.replaceAll("(", "<em>(");
            raw = raw.replaceAll(")", ")</em>");
            return raw;
        }
    }

}

export default convertRaw;