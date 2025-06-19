const tabs = document.querySelectorAll('[data-tabs]') ; 

let tabFocus = null;
tabs.forEach(tab => {
    const tabItems = tab.querySelectorAll('[data-tab]');
    tabItems.forEach(tabItem => {
        tabItem.addEventListener("click", () => {
            //100% luôn có 1 cái tab và 1 content luôn được active
            const tabAndContent = tab.querySelectorAll('.active');
            tabAndContent.forEach(ct => ct.classList.remove("active"));

            //Thêm mới active
            tabItem.classList.add("active");
            tab.querySelector(`[data-tabContent='${tabItem.dataset.tab}']`).classList.add("active")
        });
        
    });
  
    tab.addEventListener("mouseenter", () => {
        tabFocus = tab;
    })

    tab.addEventListener("mouseleave", () => {
        tabFocus = null;
    });    
});


document.addEventListener("keydown", (e) => {
    if (!tabFocus) return;
    const key = e.key;
    
    if (!/^[1-9]$/.test(key)) return;


    const tabItem = tabFocus.querySelector(`[data-tab="${key}"]`);
    const tabContent = tabFocus.querySelector(`[data-tabContent="${key}"]`);

    if (tabItem && tabContent) {
        const tabAndContent = tabFocus.querySelectorAll('.active');
        tabAndContent.forEach(ct => ct.classList.remove("active"));

        tabItem.classList.add("active");
        tabContent.classList.add("active");
    }
});