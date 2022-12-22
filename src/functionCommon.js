function renderCauhoi(start, step, count) {
    let result = "";
    for (let i = start; i < start + count; i++) {
        for (let index = 0; index < step; index++) {
            result = result + `Câu hỏi ${i}<br />`;
        }
    }
    return result;
}


function renderCauhoi2(start, step, line , count ) {
    let result = "";
    for (let i = start; i < start + count; i++) {
        for (let index = 0; index < step; index++) {
            result = result + `Câu hỏi ${i}<br />`;
        }
    }
    return result;
}

