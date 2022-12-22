import { CKEditor } from 'ckeditor4-react';
import { useEffect, useRef, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import convertRaw from '../converterRaw';
import convertHelper from '../convertHelper';
import $ from 'jquery';

const TYPE_CONVERT = {
    FULL_TEXT: 0,
    LINE_TEXT: 1,
    LINE_TEXT_SPACE: 2,
    LINE_TEXT_SPACE_IN_NGHIENG: 3,
    LINE_FULL: 4,
};

const TYPE_COLOR = {
    RED: 0,
    BLUE: 1,
};

function Convert1Page() {
    const [data, setData] = useState('');
    const [typeConvert, setTypeConvert] = useState(TYPE_CONVERT.FULL_TEXT);

    const type = useRef(TYPE_CONVERT.FULL_TEXT);
    const typeColor = useRef(TYPE_COLOR.RED);

    const dataConvertRef = useRef(null);

    function onEditorChange(event) {
        let data = event?.editor.getData() ?? '';
        setData(ConvertText(data));
    }

    function ConvertText(data) {
        data = convertHelper.convertSpecificData(data);
        var dom = $(`<div>` + data + `</div>`);

        $(dom)
            .find(
                `[style="color:#000000"],
        [style="color:#242021"],
        [style="color:#222222"],
        [style="background-color:#ffffff"],
        [style="background-color:#ffffff"]
        `
            )
            .contents()
            .unwrap();

        //Red
        let domRed = $(dom).find(
            `[style="color:#ff0000"],[style="color:#c00000"]`
        );
        $(domRed).removeAttr('style');
        $(domRed).each(function (index) {
            let element = this;
            $(element).replaceWith(
                '<span style="color:red">' + $(element).html() + '</red>'
            );
        });

        //Blue
        let domBlues = $(dom).find(
            `[style="color:#4472c4"],[style="color:#0070c0"]`
        );
        $(domBlues).removeAttr('style');
        $(domBlues).each(function (index) {
            let element = this;
            $(element).replaceWith(
                '<span style="color:blue">' + $(element).html() + '</span>'
            );
        });

        //Bold
        let domBold = $(dom).find(`strong`);
        $(domBold).each(function (index) {
            let element = this;
            $(element).replaceWith('<b>' + $(element).html() + '</b>');
        });

        //In nghieng
        let domInNghieng = $(dom).find(`em`);
        $(domInNghieng).each(function (index) {
            let element = this;
            $(element).replaceWith('<i>' + $(element).html() + '</i>');
        });

        //Table
        $(dom)
            .find('table')
            .removeAttr('border')
            .removeAttr('style')
            .removeAttr('cellpadding')
            .removeAttr('width')
            .removeAttr('cellspacing');

        $(dom)
            .find('td')
            .removeAttr('border')
            .removeAttr('style')
            .removeAttr('cellpadding')
            .removeAttr('width')
            .removeAttr('cellspacing');

        let result = $(dom).html();
        result = result.replaceAll('<br>', '<br />');
        result = convertHelper.convertSpecificData(result);
        return result;
    }

    return (
        <div className='app'>
            <h3>Convert1Page của Vui</h3>
            <div className='app-container'>
                <div className='item'>
                    <CKEditor
                        initData={''}
                        onChange={onEditorChange}
                        config={{
                            language: 'vi',
                            toolbar: [
                                [
                                    'Bold',
                                    'Italic',
                                    'TextColor',
                                    'RedColor',
                                    'Table',
                                ],
                            ],
                            extraPlugins:
                                'justify,font,colorbutton,forms,image2',
                            removeButtons:
                                'Scayt,HiddenField,CopyFormatting,About',
                            // allowedContent: true,
                            entities_latin: false,
                            colorButton_colors: 'ff0000,4472c4',
                            enterMode: 2,
                            pasteFromWordPromptCleanup: true,
                            pasteFromWordRemoveFontStyles: true,
                            forcePasteAsPlainText: true,
                            ignoreEmptyParagraph: true,
                            removeFormatAttributes: true,
                        }}
                    />
                </div>
                <div className='item'>
                    <div className='btn-group'>
                        <CopyToClipboard text={data}>
                            <button style={{ marginBottom: 4, height: 30 }}>
                                Copy to clipboard
                            </button>
                        </CopyToClipboard>
                        <br />
                    </div>
                    <textarea
                        className='text'
                        value={data}
                        ref={dataConvertRef}
                    ></textarea>
                    <br></br>
                    <br></br>
                    <div>HTML</div>
                    <div
                        style={{ padding: 12, border: '1px solid #ececec' }}
                        dangerouslySetInnerHTML={{
                            __html: data,
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
}

export default Convert1Page;
