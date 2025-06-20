const tabs = document.querySelectorAll('[data-tabsIndex]') ; 
let tabChecked = null;
let currentTabIndex = 0 ; 
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
  
    
});
document.addEventListener("click", (e) => {
    const tabMain = e.target.closest('[data-tabsIndex]');
    if (tabMain) {
        tabChecked = tabMain;
    }
});

document.addEventListener("keydown", (e) => {
    if (!tabChecked) return;
    const key = e.key;
    
    if (!/^[1-9]$/.test(key) && key !== 'Tab') return;

    if (key === 'Tab') {
        e.preventDefault() ; 
        currentTabIndex = ( currentTabIndex + 1 ) % tabs.length ; 
        tabChecked = tabs[currentTabIndex];
        return;
    }

    const tabItem = tabChecked.querySelector(`[data-tab="${key}"]`);
    const tabContent = tabChecked.querySelector(`[data-tabContent="${key}"]`);

    if (tabItem && tabContent) {
        const tabAndContent = tabChecked.querySelectorAll('.active');
        tabAndContent.forEach(ct => ct.classList.remove("active"));

        tabItem.classList.add("active");
        tabContent.classList.add("active");
    }
});
