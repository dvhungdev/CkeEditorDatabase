import { CKEditor } from 'ckeditor4-react';
import { useEffect, useRef, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import $ from 'jquery';
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

function Editor1Page() {
    const [data, setData] = useState('');
    const [dataConvert, setDataConvert] = useState('');

    function onEditorChange(event) {
        let data = event?.editor.getData() ?? '';
        setData(data);

        let dataConvert = ConvertText(data);
        dataConvert = dataConvert.trim();
        setDataConvert(dataConvert);
    }

    const dataConvertRef = useRef();
    function ConvertText(data) {
        data = convertHelper.convertSpecificData(data);
        var dom = $(`<div>` + data + `</div>`);

        $(dom)
            .find(
                `[style="color:#000000"],
        [style="color:#242021"],
        [style="color:#222222"],
        [style="color:black"],
        [style="color:#0d0d0d"],
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
            `[style="color:#4472c4"],[style="color:#0070c0"],[style="color:#0000ff"]`
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

    function handleInstanceReady({ editor }) {
        window.editor = editor;
    }

    return (
        <div className='app'>
            <div className='app-container'>
                <div className='item'>
                    <div style={{ display: 'flex', marginBottom: 8 }}>
                        <div>
                            <button
                                className='btn-type'
                                onClick={() => {
                                    let dataNew = window.editor.getData();
                                    dataNew =
                                        convertHelper.convertSpecificData(
                                            dataNew
                                        );
                                    dataNew =
                                        convertRaw.DapAnABCLoai1.ConvertRaw(
                                            dataNew
                                        );
                                    window.editor.setData(dataNew);
                                }}
                            >
                                Lo???i (A. B. C.)
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
                                    dataNew =
                                        convertHelper.convertSpecificData(
                                            dataNew
                                        );

                                    dataNew =
                                        convertRaw.DapAnABCLoai2.ConvertRaw(
                                            dataNew
                                        );
                                    window.editor.setData(dataNew);
                                }}
                            >
                                Lo???i (1. 2. 3.)
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
                        onChange={onEditorChange}
                        initData={''}
                        onBeforeLoad={(CKEDITOR) => {
                            CKEDITOR.plugins.add('customCommand', {
                                init: function (editor) {
                                    editor.addCommand('cleanText', {
                                        exec: function (editor) {
                                            let text = editor.getData();
                                            text =
                                                convertHelper.convertSpecificData(
                                                    text
                                                );
                                            if (text.startsWith('<br />')) {
                                                text = text.replace(
                                                    '<br />',
                                                    ''
                                                );
                                            }
                                            if (text.startsWith(' ')) {
                                                text = text.replace(' ', '');
                                            }

                                            editor.setData(text);
                                        },
                                    });
                                    editor.keystrokeHandler.keystrokes[
                                        CKEDITOR.CTRL + 68 /* d */
                                    ] = 'cleanText';

                                    //
                                    editor.addCommand('duplicateBr', {
                                        exec: function (editor) {
                                            let text = editor.getData();
                                            text = text.replaceAll(
                                                '<br />',
                                                '<br /><br />\n'
                                            );
                                            editor.setData(text);
                                        },
                                    });
                                    editor.keystrokeHandler.keystrokes[
                                        CKEDITOR.CTRL + 81 /* q */
                                    ] = 'duplicateBr';

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
                            toolbar: [
                                [
                                    'Source',
                                    'Bold',
                                    'Italic',
                                    'TextColor',
                                    'RedColor',
                                    'Table',
                                    'document',
                                ],
                            ],
                            extraPlugins:
                                'justify,font,colorbutton,forms,image2,customCommand',
                            removeButtons:
                                'Scayt,HiddenField,CopyFormatting,About',
                            entities_latin: false,
                            colorButton_colors: 'ff0000,0000ff',
                            enterMode: 2,
                            // pasteFromWordPromptCleanup: true,
                            // pasteFromWordRemoveFontStyles: true,
                            // forcePasteAsPlainText: true,
                            // ignoreEmptyParagraph: true,
                            // removeFormatAttributes: true,
                        }}
                    />
                    <div style={{ fontSize: 11, marginTop: 8 }}>
                        <div>Ctrl + d: X??a d???u br ?????u d??ng - Clean Text</div>
                        <div>Ctrl + q: Th??m 1 d??ng n???a sau xu???ng d??ng</div>
                        <div>Ctrl + x: Select text copy</div>
                    </div>
                    {/* <textarea className='text' value={data}></textarea> */}
                </div>
                <div className='item'>
                    <div className='btn-group'>
                        <CopyToClipboard text={dataConvert}>
                            <button style={{ marginBottom: 4, height: 30 }}>
                                Copy to clipboard
                            </button>
                        </CopyToClipboard>
                        <br />
                        {convertHelper.isValidDataConvert(dataConvert) !=
                            '' && (
                            <>
                                <h6 style={{ color: 'red' }}>
                                    C?? th??? c?? k?? t??? ?????c bi???t ki???m tra ngay
                                </h6>
                            </>
                        )}
                    </div>
                    <div style={{ display: 'flex' }}>
                        <div>
                            <button
                                className='btn-type'
                                onClick={() => {
                                    let dataNew = dataConvert;
                                    dataNew = dataNew.replaceAll(
                                        '<br />',
                                        '\n'
                                    );
                                    dataNew = dataNew.replaceAll('\n\n', '\n');
                                    setDataConvert(dataNew);
                                }}
                            >
                                Tag br to Line
                            </button>
                        </div>
                    </div>

                    <textarea
                        ref={dataConvertRef}
                        className='text'
                        value={dataConvert}
                        onChange={(event) => {
                            setDataConvert(event.target.value);
                        }}
                    ></textarea>
                    <div>HTML</div>
                    <div
                        style={{ padding: 12, border: '1px solid #ececec' }}
                        dangerouslySetInnerHTML={{
                            __html: dataConvert,
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
}

export default Editor1Page;
