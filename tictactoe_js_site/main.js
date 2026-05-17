let turn = 0;
let hasended = false;
const table = document.getElementById("main_table");
const maindiv = document.getElementById("GameInterface");
const h3text = document.getElementById("end-text");
const restartbutton = document.getElementById("restart");
const switchturnbutton = document.getElementById("switchturn");
startGame();
switchturnbutton.addEventListener("click", () => {
    if ( hasended )
        switchturnbutton.textContent = ( switchturnbutton.textContent == "X" ) ? "0" : "X";
})
restartbutton.addEventListener("click", () => {
    startGame();
});
function endgame(msg) {
    hasended = true;
    Array.from(table.rows).forEach(row => {
        Array.from(row.cells).forEach(cell => {
            cell.children[0].disabled = true;
        });
    });
    console.log(msg)
    h3text.textContent = msg;
}
function checkForCondition() {
    const f = table.rows[0].cells[0].children[0].textContent, f1 = table.rows[table.rows.length-1].cells[0].children[0].textContent;
    let hasfound = true, hasfound1 = true, hasfound2 = false, hasfound3 = false, isfull = true;
    for ( let index = 1; index < table.rows.length; index++ )
    {
        if ( table.rows[index].cells[index].children[0].textContent != f || f == '' )
            hasfound = false;
        if ( table.rows[table.rows.length-index-1].cells[index].children[0].textContent != f1 || f1 == '' )
            hasfound1 = false;
    }
    for ( let index = 0; index < table.rows[0].cells.length; index++ )
    {
        hasfound2 = true;
        const f2 = table.rows[index].cells[0].children[0].textContent;
        for ( let index1 = 1; index1 < table.rows.length; index1++ )
        {
            if ( table.rows[index].cells[index1].children[0].textContent != f2 || f2 == '' )
                hasfound2 = false;
        }
        if ( hasfound2 )
            break;
    }
    for ( let index = 0; index < table.rows.length; index++ )
    {
        hasfound3 = true;
        const f3 = table.rows[0].cells[index].children[0].textContent;
        for ( let index1 = 1; index1 < table.rows[0].cells.length; index1++ )
        {
            if ( table.rows[index1].cells[index].children[0].textContent != f3 || f3 == '' )
                hasfound3 = false;
        }
        if ( hasfound3 )
            break;
    }
    Array.from(table.rows).forEach(row => {
        Array.from(row.cells).forEach(cell => {
            if ( cell.children[0].textContent == '' )
                isfull = false;
        })
    });
    if ( hasfound || hasfound1 || hasfound2 || hasfound3 || isfull )
    {
        if ( !isfull || ( hasfound || hasfound1 || hasfound2 || hasfound3 ) )
            endgame(`Player: ${ ( ( turn - 1 ) % 2 == 0 ) ? 'X' : '0' } has won!`)
        else
            endgame("Draw")
        return;
    }
}
function startGame() {
    hasended = false;
    turn = ( switchturnbutton.textContent == "X" ) ? 0 : 1;
    h3text.textContent = "";
    Array.from(table.rows).forEach(row => {
        Array.from(row.cells).forEach(cell => {
            if ( cell.children[0] )
                cell.children[0].remove();
            const btn = document.createElement("button");
            cell.appendChild(btn);
            btn.disabled = false;
            btn.addEventListener("click", () => {
                if ( btn.textContent == '' )
                {
                    btn.textContent = ( turn % 2 == 0 ) ? 'X' : '0';
                    //turn = ( turn % 2 == 1 ) ? 0 : 1;
                    turn = turn + 1;
                    checkForCondition();
                }
            });
        });
    });
}