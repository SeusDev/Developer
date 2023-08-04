var cookieName = 'LappizToken';

var cookieValue = 'AAVjWn8sMjHIAsTEkDuYW7Dii7QI16WzH-vYopUXM8k9x4DgzhBXlDepyCnGANxbE20FUbYlHSWwXMfpKq1wFMNGmsNblRG4WoF1rOqOwBYIQQodogxivBKly2NCU53oh-hNJyHiI66CTBj-RfvF_5j5zeyd0jW2sIq2QMXt9G7IBZFyFrcoQxLq6jlvs8aGpHBDQn63eZwNu2PIlsDFDwYwudBvJRhzTp0cRWYxKNz0L9MZwHuCmDktNUMrAjVU2jeisz6CD0jytzb-NHHJQB09hVlEeaHWCA96UkNUssmUqOC_MKtB3LyOWJmQivE4qJhMKP4TP9oPwSXxW7U8q3q2VKPH_zF7Oc_NMGgByLwKzibg6_dwLBMbN7g7gVDuZRayeqxd2Pjf4iYcclOOFHmtQ_VlgSguFx8Ccx6NzaKw4H2sYLP8C4WtMVYrvJLfxSmzEjGo-ajeOs6FPd9zGq4AiJ_XlbiHZ5aXw23PznerLFNwzeOQbYMna6aBPV-BYpj-BgmvoLlpCCjOLPZDuA'

var myDate = new Date();
myDate.setMonth(myDate.getMonth() + 12);
document.cookie = cookieName + "=" + cookieValue + ";expires=" + myDate
    + ";domain=.lappiz.io;path=/";