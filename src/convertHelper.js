import jQuery from "jquery";


const convertHelper = {
    convertSpecificData: function (data) {
        data = data.replaceAll('&hellip;', '...');
        data = data.replaceAll('&nbsp;', ' ');

        data = data.replaceAll('&rsquo;', "'");
        data = data.replaceAll('’', "'");
        data = data.replaceAll('&#39;', "'");

        data = data.replaceAll('&quot;', '"');
        data = data.replaceAll('&ldquo;', '"');
        data = data.replaceAll('&rdquo;', '"');

        data = data.replaceAll('&amp;', '&');
        data = data.trim();
        return data;
    },


    isValidDataConvert: function (dataConvert) {
        let stringWarning = "";

        let domWrap = jQuery(`<div>${dataConvert}</div>`);

        //Check span
        jQuery(domWrap).find('[style="color:red"]').remove();
        jQuery(domWrap).find('[style="color:blue"]').remove();

        console.log(jQuery(domWrap).html());

        if (jQuery(domWrap).find("span").length > 0) {
            stringWarning = "CÓ TRƯỜNG CHƯA CONVERT ĐƯỢC";
        }

        if (jQuery(domWrap).find("div").length > 0) {
            stringWarning = "CÓ TRƯỜNG CHƯA CONVERT ĐƯỢC";
        }

        if (dataConvert.includes(';')) {
            stringWarning = "CÓ TRƯỜNG CHƯA CONVERT ĐƯỢC";
        }

        return stringWarning;
    }

}



export default convertHelper;