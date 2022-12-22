import { CKEditor } from 'ckeditor4-react';
import { useEffect, useRef, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import convertRaw from '../converterRaw';
import convertHelper from '../convertHelper';

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

    const [onChangeDataInit, setOnChangeDataInit] = useState(0);

    const type = useRef(TYPE_CONVERT.FULL_TEXT);
    const typeColor = useRef(TYPE_COLOR.RED);

    const dataConvertRef = useRef(null);

    function onEditorChange(event) {
        let data = event?.editor.getData() ?? '';

        switch (type.current) {
            case TYPE_CONVERT.LINE_TEXT:
                data = ConvertToLineText(data);
                break;
            case TYPE_CONVERT.LINE_TEXT_SPACE:
                data = ConvertToLineTextSpace(data);
                break;
            case TYPE_CONVERT.LINE_TEXT_SPACE_IN_NGHIENG:
                data = ConvertToLineTextSpaceInNghieng(data);
                break;
            case TYPE_CONVERT.LINE_FULL:
                data = ConvertToLineFull(data);
                break;
            case TYPE_CONVERT.FULL_TEXT:
            default:
                data = ConvertToFullText(data);
                break;
        }
        setData(data);
    }

    function replaceDataCommon(data) {
        data = convertHelper.convertSpecificData(data);

        return data;
    }

    function ConvertToFullText(data) {
        data = data.replaceAll('#e74c3c', 'red');
        data = data.replaceAll('#c0392b', 'red');

        data = data.replaceAll(`<span style="color:red">`, '<red>');
        data = data.replaceAll('</span>', '</red>');

        data = data.replaceAll(
            `<table border="1" cellpadding="1" cellspacing="1" style="width:100%">`,
            '<table>'
        );
        data = data.replaceAll(
            `<table border="1" cellpadding="1" cellspacing="1" style="width:500px">`,
            '<table>'
        );
        data = data.replaceAll(
            `<table border="1" cellpadding="1" cellspacing="1" style="width:800px">`,
            '<table>'
        );

        data = data.replaceAll('<strong>', '<b>');
        data = data.replaceAll('</strong>', '</b>');

        data = data.replaceAll('<em>', '<i>');
        data = data.replaceAll('</em>', '</i>');

        data = replaceDataCommon(data);

        return data;
    }

    function ConvertToLineText(data) {
        data = data.replaceAll(' ', '\n');
        data = data.replaceAll('&nbsp;', '\n');
        data = data.replaceAll(`<br />`, '');
        data = data.replaceAll('&rsquo;', "'");

        data = replaceDataCommon(data);

        return data;
    }

    function ConvertToLineFull(data) {
        function isCharacter(charactor) {
            const regex = /^[a-zA-Z]*$/;
            const found = charactor.match(regex);

            if (found == null) return false;
            return true;
        }

        let result = '';

        data = data.replaceAll('&hellip;', '...');
        data = data.replaceAll('&nbsp;', ' ');
        data = data.replaceAll(`<br />`, '');
        data = data.replaceAll(`\n`, '');

        for (var i = 0; i < data.length; i++) {
            if (isCharacter(data[i])) {
                result = result + data[i] + '\n';
            }
        }

        result = replaceDataCommon(result);
        return result;
    }

    function ConvertToLineTextSpace(data) {
        var result = '';

        data = data.replaceAll('&nbsp;', ' ');
        data = data.replaceAll('&hellip;', '...');
        data = data.replaceAll(`<br />`, '');
        data = data.replace(/ +/g, '_');

        data = data.replaceAll('Bài_đọc_1', '');
        data = data.replaceAll('Bài_đọc_2', '');
        data = data.replaceAll('Bài_đọc_3', '');
        data = data.replaceAll('Bài_đọc_4', '');
        data = data.replaceAll('Bài_đọc_5', '');
        data = data.replaceAll('Bài_đọc_6', '');
        data = data.replaceAll('Bài_đọc_7', '');
        data = data.replaceAll('Bài_đọc_8', '');
        data = data.replaceAll('Bài_đọc_9', '');
        data = data.replaceAll('Bài_đọc_10', '');
        data = data.replaceAll('Bài_đọc_11', '');
        data = data.replaceAll('Bài_đọc_12', '');
        data = data.replaceAll('Bài_đọc_13', '');

        for (let indexNumber = 50; indexNumber > 0; indexNumber--) {
            data = data.replaceAll(`${indexNumber}._`, '');
        }

        data = data.replaceAll('A._', '');
        data = data.replaceAll('B._', '');
        data = data.replaceAll('C._', '');
        data = data.replaceAll('D._', '');

        data = data.replaceAll('a._', '');
        data = data.replaceAll('b._', '');
        data = data.replaceAll('c._', '');
        data = data.replaceAll('d._', '');

        data = data.replaceAll('\n', '_');

        const myArray = data.split('_');
        for (let index = 0; index < myArray.length; index++) {
            if (myArray[index] != '' && myArray[index] != '\n') {
                result = result + myArray[index] + '\n';
            }
        }

        result = replaceDataCommon(result);
        return result;
    }

    function ConvertToLineTextSpaceInNghieng(data) {
        for (let indexNumber = 50; indexNumber > 0; indexNumber--) {
            data = data.replaceAll(`${indexNumber}. `, '');
        }

        data = data.replaceAll('<br />', '\n');
        data = data.replaceAll('\n\n', '\n');

        let result = '';
        const myArray = data.split('\n');

        for (let index = 0; index < myArray.length; index++) {
            let isInNghieng = index % 2;
            let text = isInNghieng
                ? `<i>${myArray[index]}</i>\n`
                : `${myArray[index]}<br />`;

            result = result + text;
        }

        result = replaceDataCommon(result);
        return result;
    }

    //#region RAW
    function handleInstanceReady({ editor }) {
        window.editor = editor;
    }

    //#endregion

    return (
        <div className='app'>
            <h3>Convert1Page của Vui</h3>
            <div className='app-container'>
                <div className='item'>
                    <div style={{ display: 'flex' }}>
                        <div>
                            <button
                                className='btn-type'
                                onClick={() => {
                                    let dataNew = window.editor.getData();
                                    dataNew = replaceDataCommon(dataNew);
                                    dataNew =
                                        convertRaw.KeoThaDapAn.ConvertRaw(
                                            dataNew
                                        );
                                    window.editor.setData(dataNew);
                                }}
                            >
                                Loại <strong>(1)</strong> in
                            </button>
                            <a
                                href={convertRaw.KeoThaDapAn.Image}
                                target='_bank'
                            >
                                show
                            </a>
                        </div>
                        <div>
                            <button
                                className='btn-type'
                                onClick={() => {
                                    let dataNew = window.editor.getData();
                                    dataNew = replaceDataCommon(dataNew);
                                    dataNew =
                                        convertRaw.DapAnABCLoai1.ConvertRaw(
                                            dataNew
                                        );
                                    window.editor.setData(dataNew);
                                }}
                            >
                                Loại (A. B. C.)
                            </button>
                            <a
                                href={convertRaw.DapAnABCLoai1.Image}
                                target='_bank'
                            >
                                show
                            </a>
                        </div>
                        <div>
                            <button
                                className='btn-type'
                                onClick={() => {
                                    let dataNew = window.editor.getData();
                                    dataNew = replaceDataCommon(dataNew);
                                    dataNew =
                                        convertRaw.DapAnABCLoai2.ConvertRaw(
                                            dataNew
                                        );
                                    window.editor.setData(dataNew);
                                }}
                            >
                                Loại (1. 2. 3.)
                            </button>
                            <a
                                href={convertRaw.DapAnABCLoai2.Image}
                                target='_bank'
                            >
                                show
                            </a>
                        </div>
                    </div>

                    <CKEditor
                        onInstanceReady={handleInstanceReady}
                        initData={''}
                        onChange={onEditorChange}
                        onBeforeLoad={(CKEDITOR) => {
                            CKEDITOR.plugins.add('insertRedColor', {
                                init: function (editor) {
                                    editor.addCommand('insertRedColor', {
                                        exec: function (editor) {
                                            let text = editor
                                                ?.getSelection()
                                                ?.getSelectedText();
                                            if (
                                                text != undefined &&
                                                text != ''
                                            ) {
                                                let textTmp = `<span style="color:#e74c3c">${text}<span>`;

                                                let range = editor
                                                    .getSelection()
                                                    .getRanges()[0];
                                                range.deleteContents(true);

                                                range.insertNode(
                                                    new CKEDITOR.dom.element.createFromHtml(
                                                        textTmp
                                                    )
                                                );
                                            }
                                        },
                                    });
                                    editor.ui.addButton('RedColor', {
                                        label: 'insertRedColor',
                                        command: 'insertRedColor',
                                        toolbar: 'insertRedColor',
                                        // icon: "https://cdn4.iconfinder.com/data/icons/24x24-free-pixel-icons/24/Clock.png",
                                        icon: 'https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-line/254000/79-512.png',
                                    });
                                    editor.keystrokeHandler.keystrokes[
                                        CKEDITOR.CTRL + 81 /* Q */
                                    ] = 'insertRedColor';

                                    editor.addCommand('dong_ngoac_in_nghieng', {
                                        exec: function (editor) {
                                            let text = editor.getData();
                                            text = replaceDataCommon(text);
                                            text =
                                                convertRaw.DongNgoacInNgieng.ConvertRaw(
                                                    text
                                                );
                                            editor.setData(text);
                                        },
                                    });
                                    editor.keystrokeHandler.keystrokes[
                                        CKEDITOR.CTRL + 49 /* 1 */
                                    ] = 'dong_ngoac_in_nghieng';
                                    editor.keystrokeHandler.keystrokes[
                                        CKEDITOR.CTRL + 97 /*  */
                                    ] = 'dong_ngoac_in_nghieng';

                                    editor.addCommand('dong_ngoac_in_dam', {
                                        exec: function (editor) {
                                            let dataNew = editor.getData();
                                            dataNew =
                                                replaceDataCommon(dataNew);
                                            dataNew =
                                                convertRaw.KeoThaDapAn.ConvertRaw(
                                                    dataNew
                                                );
                                            editor.setData(dataNew);
                                        },
                                    });
                                    editor.keystrokeHandler.keystrokes[
                                        CKEDITOR.CTRL + 50 /* 2 */
                                    ] = 'dong_ngoac_in_dam';
                                    editor.keystrokeHandler.keystrokes[
                                        CKEDITOR.CTRL + 98 /*  */
                                    ] = 'dong_ngoac_in_dam';

                                    //Clean đáp án TODO
                                    editor.addCommand('cleanDapAn1', {
                                        exec: function (editor) {
                                            let text = editor.getData();
                                            text = replaceDataCommon(text);
                                            if (text.startsWith('<br />')) {
                                                text = text.replace(
                                                    '<br />',
                                                    ''
                                                );
                                            }
                                            if (text.startsWith(' ')) {
                                                text = text.replace(' ', '');
                                            }

                                            text = text.trim();

                                            text =
                                                convertRaw.DapAnABCLoai1.ConvertRaw(
                                                    text
                                                );
                                            // text = convertRaw.DapAnABCLoai2.ConvertRaw(text);

                                            editor.setData(text);
                                        },
                                    });
                                    editor.keystrokeHandler.keystrokes[
                                        CKEDITOR.CTRL + 68 /* d */
                                    ] = 'cleanDapAn1';

                                    //CopyConvert
                                    editor.addCommand('CopyConvert2', {
                                        exec: function (editor) {
                                            dataConvertRef.current.select();
                                            window.document.execCommand('copy');
                                        },
                                    });
                                    // editor.keystrokeHandler.keystrokes[CKEDITOR.CTRL + 82 /* r */] = 'CopyConvert2';
                                    editor.keystrokeHandler.keystrokes[
                                        CKEDITOR.CTRL + 88 /* r */
                                    ] = 'CopyConvert2';
                                },
                            });
                        }}
                        config={{
                            language: 'vi',
                            // toolbarGroups: [
                            //   {
                            //     name: 'document',
                            //     groups: ['mode', 'document', 'doctools'],
                            //   },
                            //   { name: 'insert', groups: ['insert'] },
                            //   { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
                            //   { name: 'colors', groups: ['colors'] },
                            // ],
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
                                'justify,font,colorbutton,forms,image2,insertRedColor',
                            removeButtons:
                                'Scayt,HiddenField,CopyFormatting,About',
                            // allowedContent: true,
                            entities_latin: false,
                            colorButton_colors: 'e74c3c',
                            enterMode: 2,
                            pasteFromWordPromptCleanup: true,
                            pasteFromWordRemoveFontStyles: true,
                            forcePasteAsPlainText: true,
                            ignoreEmptyParagraph: true,
                            removeFormatAttributes: true,
                        }}
                    />
                    <div style={{ fontSize: 11, marginTop: 8 }}>
                        <div>
                            Ctrl + 1: Đóng ngoặc in nghiêng ===> ... (abc ) ...
                            => ...<em>(abc)</em>...{' '}
                        </div>
                        <div>
                            Ctrl + 2: Đóng ngoặc in đậm ===> ... (abc ) ... =>
                            ...<strong>(abc)</strong>...{' '}
                        </div>
                    </div>
                </div>
                <div className='item'>
                    <div className='btn-group'>
                        <CopyToClipboard text={data}>
                            <button style={{ marginBottom: 4, height: 30 }}>
                                Copy to clipboard
                            </button>
                        </CopyToClipboard>
                        <br />
                        <button
                            className='btn-type'
                            style={{
                                backgroundColor:
                                    typeConvert === TYPE_CONVERT.FULL_TEXT
                                        ? '#9e9efd'
                                        : '',
                                marginLeft: 0,
                            }}
                            onClick={() => {
                                setTypeConvert(TYPE_CONVERT.FULL_TEXT);
                                type.current = TYPE_CONVERT.FULL_TEXT;
                            }}
                        >
                            Đoạn văn
                        </button>
                        <button
                            className='btn-type'
                            style={{
                                backgroundColor:
                                    typeConvert === TYPE_CONVERT.LINE_TEXT
                                        ? '#9e9efd'
                                        : '',
                            }}
                            onClick={() => {
                                setTypeConvert(TYPE_CONVERT.LINE_TEXT);
                                type.current = TYPE_CONVERT.LINE_TEXT;
                            }}
                        >
                            Xuống dòng của câu
                        </button>
                        <button
                            className='btn-type'
                            style={{
                                backgroundColor:
                                    typeConvert === TYPE_CONVERT.LINE_TEXT_SPACE
                                        ? '#9e9efd'
                                        : '',
                            }}
                            onClick={() => {
                                setTypeConvert(TYPE_CONVERT.LINE_TEXT_SPACE);
                                type.current = TYPE_CONVERT.LINE_TEXT_SPACE;
                            }}
                        >
                            Xuống dòng của 3 đáp án
                        </button>
                        <button
                            className='btn-type'
                            style={{
                                backgroundColor:
                                    typeConvert ===
                                    TYPE_CONVERT.LINE_TEXT_SPACE_IN_NGHIENG
                                        ? '#9e9efd'
                                        : '',
                            }}
                            onClick={() => {
                                setTypeConvert(
                                    TYPE_CONVERT.LINE_TEXT_SPACE_IN_NGHIENG
                                );
                                type.current =
                                    TYPE_CONVERT.LINE_TEXT_SPACE_IN_NGHIENG;
                            }}
                        >
                            Xuống dòng của 3 đáp án ( In nghiêng )
                        </button>
                        <button
                            className='btn-type'
                            style={{
                                backgroundColor:
                                    typeConvert === TYPE_CONVERT.LINE_FULL
                                        ? '#9e9efd'
                                        : '',
                            }}
                            onClick={() => {
                                setTypeConvert(TYPE_CONVERT.LINE_FULL);
                                type.current = TYPE_CONVERT.LINE_FULL;
                            }}
                        >
                            Xuống dòng của text
                        </button>
                    </div>
                    <textarea
                        className='text'
                        value={data}
                        ref={dataConvertRef}
                    ></textarea>
                    {/* 
                    <button
                        className='btn-type'
                        onClick={() => {
                            let newData = data;
                            if (typeColor.current == TYPE_COLOR.RED) {
                                typeColor.current = TYPE_COLOR.BLUE;

                                newData = newData.replaceAll('<red>', '<blue>');
                                newData = newData.replaceAll(
                                    '</red>',
                                    '</blue>'
                                );
                            } else {
                                typeColor.current = TYPE_COLOR.RED;

                                newData = newData.replaceAll('<red>', '<red>');
                                newData = newData.replaceAll(
                                    '</red>',
                                    '</red>'
                                );
                            }
                            setData(newData);
                        }}
                        style={{
                            color:
                                typeColor.current === TYPE_COLOR.RED
                                    ? 'red'
                                    : 'blue',
                        }}
                    >
                        Màu blue
                    </button> */}
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
