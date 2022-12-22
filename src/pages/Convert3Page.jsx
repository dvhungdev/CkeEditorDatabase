import { CKEditor } from 'ckeditor4-react';
import { useEffect, useRef, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import convertRaw from '../converterRaw';
import jQuery from 'jquery';
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

function Convert3Page() {
    const [data, setData] = useState('');
    const [dataConvert, setDataConvert] = useState('');
    // const [valueDapAn, setValueDapAn] = useState('');
    const [valueDapAn, setValueDapAn] = useState('My mother wakes up early.');

    function onEditorChange(event) {
        let data = event?.editor.getData() ?? '';
        data = replaceDataCommon(data);
        setData(data);
    }

    const dataConvertRef = useRef(null);

    function replaceDataCommon(data) {
        data = convertHelper.convertSpecificData(data);
        return data;
    }

    function handleSortTrue(dataNow, valueDapAnNow) {
        let result = '';
        dataNow = convertHelper.convertSpecificData(dataNow);

        var dom = jQuery(`<div>${dataNow}</div>`);
        var elTd = jQuery(dom).find('td');

        var lists = [];
        jQuery(elTd).each(function (index) {
            if (jQuery(this).text().trim() != '') {
                lists.push(jQuery(this).text().trim());
            }
        });

        var dapAn = valueDapAnNow;

        let listOrders = permute(lists);

        for (let index = 0; index < listOrders.length; index++) {
            var check = listOrders[index].join(' ');
            console.log(check + '\n');

            if (dapAn == check) {
                let newData = listOrders[index].join('\n');
                result = newData;
                // setDataConvert(newData);
                break;
            }
        }

        if (result == '') {
            result = '-----------------SAI---------------------';
        }
        return result;
    }

    function handleSortTrueList() {
        debugger;
        let result = '';
        var dom = jQuery(`<div>${data}</div>`);
        var dapAn = valueDapAn;

        let listDapAps = dapAn.split('\n').map((item) => {
            item = item.trim();
            let number = [
                '1.',
                '2.',
                '3.',
                '4.',
                '5.',
                '6.',
                '7.',
                '8.',
                '9.',
                '10.',
                '11.',
                '12.',
                '13.',
                '14.',
                '15.',
            ];
            for (let index = 0; index < number.length; index++) {
                const numberItem = number[index];
                if (item.startsWith(numberItem)) {
                    item = item.replace(numberItem, '');
                    item = item.trim();
                }
            }
            return item.trim();
        });

        let listDoms = jQuery(dom).find('table');

        for (let index = 0; index < listDapAps.length; index++) {
            const dapApItem = listDapAps[index];
            let domItem = listDoms[index];

            let row = handleSortTrue(
                `<table>${jQuery(domItem).html()}</table>`,
                dapApItem
            );

            result = result + row + '\n';
        }

        return result;
    }

    function permute(permutation) {
        var length = permutation.length,
            result = [permutation.slice()],
            c = new Array(length).fill(0),
            i = 1,
            k,
            p;

        while (i < length) {
            if (c[i] < i) {
                k = i % 2 && c[i];
                p = permutation[i];
                permutation[i] = permutation[k];
                permutation[k] = p;
                ++c[i];
                i = 1;
                result.push(permutation.slice());
            } else {
                c[i] = 0;
                ++i;
            }
        }
        return result;
    }

    //#region RAW
    function handleInstanceReady({ editor }) {
        window.editor = editor;
    }
    //#endregion

    return (
        <div className='app'>
            <h3>Convert3Page của Vui</h3>
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
                    </div>

                    <CKEditor
                        onBeforeLoad={(CKEDITOR) => {
                            CKEDITOR.plugins.add('customCommand', {
                                init: function (editor) {
                                    editor.addCommand('cleanText', {
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

                                            editor.setData(text);
                                        },
                                    });
                                    editor.keystrokeHandler.keystrokes[
                                        CKEDITOR.CTRL + 68 /* d */
                                    ] = 'cleanText';
                                },
                            });
                        }}
                        onInstanceReady={handleInstanceReady}
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
                                'justify,font,colorbutton,forms,image2,customCommand',
                            removeButtons:
                                'Scayt,HiddenField,CopyFormatting,About',
                            entities_latin: false,
                            colorButton_colors: 'e74c3c',
                            enterMode: 2,
                        }}
                    />
                    <textarea
                        className='text'
                        value={valueDapAn}
                        onChange={(event) => {
                            var value = replaceDataCommon(
                                event.target.value?.trim()
                            );
                            setValueDapAn(value);
                        }}
                    ></textarea>
                    <div style={{ fontSize: 11, marginTop: 8 }}>
                        <div>Ctrl + D: Clean text</div>
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
                            onClick={() => {
                                setDataConvert(
                                    handleSortTrue(data, valueDapAn)
                                );
                            }}
                        >
                            Sắp xếp đáp án
                        </button>
                        <button
                            className='btn-type'
                            onClick={() => {
                                setDataConvert(
                                    handleSortTrueList(data, valueDapAn)
                                );
                            }}
                        >
                            Sắp xếp đáp án cả bài
                        </button>
                    </div>
                    <textarea className='text' value={dataConvert}></textarea>
                    HTML
                    <textarea
                        className='text'
                        value={data}
                        ref={dataConvertRef}
                    ></textarea>
                </div>
            </div>
        </div>
    );
}

export default Convert3Page;
