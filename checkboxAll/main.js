const tableCheckboxs = document.querySelectorAll('[data-tableCheckbox]');

tableCheckboxs.forEach(tableCheckbox => {
    let cnt = 0 ; 
    const inputAll = tableCheckbox.querySelector('[data-selectAll]');
    let selectedCnt = tableCheckbox.querySelector('[data-selectedCount]'); 
    const inputs = tableCheckbox.querySelectorAll('[data-rowCheckbox]');
    inputAll.addEventListener("click", () => {
        const checked = inputAll.checked;

        inputs.forEach(input => {
            input.checked = checked;
        });

        if(checked) {
            cnt = inputs.length ; 
        }
        else {
            cnt = 0 ; 
        }
        selectedCnt.textContent = cnt ; 

    });
    
    inputs.forEach(input => {
        input.onchange = () => { 
            if(input.checked) {
                cnt++ ; 
                selectedCnt.textContent = cnt ;
            }
            else {
                cnt-- ; 
                selectedCnt.textContent = cnt ;
            }

            if(cnt !== inputs.length) inputAll.indeterminate = true ; 
            
            if(cnt === 0) {
                inputAll.indeterminate = false ; 
                inputAll.checked = false ;
            }
        }
    });
});

