/*
    Desighned by T2_Enkou（全く初心者です）

    シートファイルを開きます、paintの中になかったら、unusedの中に探す
    This script open the sheet file, if it's not in paint, look for it in unused.
    2023/03/05 

    メモ：廃墟のフォルダー構成を見ている時、廃墟のunusedフォルダーの名前は「unused」ではなく、「_unused」でしたので、matchの条件を変更致します。
*/

(function (enkou) {
    //Global
    var AEP_NAME = app.project.file.name.split(".")[0].split("_");
    var AEP_PATH = app.project.file.path;
    var PAINT_FOLDER = Folder(AEP_PATH + "/paint");
    var UNUSED_FOLDER = getUnusedFolder(Folder(AEP_PATH));
    var UNUSEDSOZAI_FOLDER = getUnusedSozaiFolder(UNUSED_FOLDER);

    //メインの素材フォルダーsheetあるかどうかを判断する
    var mainHaveSheetFile = false;
    //unusedフォルダーsheetあるかどうかを判断する
    var subHaveSheetFile = false;

    //メイン素材フォルダーかどうかを断言する
    function isMainSozaiFolder(folder) {
        return isFolder(folder) && isSozaiFolderName(folder.displayName);
    }

    //素材フォルダーかどうかを断言する
    function isSozaiFolder(folder) {
        return isFolder(folder) && isSozaiFolderName(folder.displayName);
    }

    //unusedフォルダーかどうかを断言する
    function isUnusedFolder(folder) {
        return isFolder(folder) && isUnusedFolderName(folder.displayName);
    }

    //素材フォルダー名かどうかを断言する
    function isSozaiFolderName(name) {
        return new RegExp(AEP_NAME[0], "i").test(name);
    }

    //Unusedフォルダーの名前かどうかを断言する
    function isUnusedFolderName(name) {
        return /^(_)?unused$/i.test(name);
    }

    //フォルダー名sheetかどうかを断言する
    function isSheetName(name) {
        return /sheet/i.test(name);
    }

    //ファイル名の拡張子は図デフォルトかどうかを断言する
    function isDefaultSuffix(text) {
        return /jpg|png|tga|tif|tiff/i.test(text);
    }

    //PCフォルダーかどうかを断言する
    function isFolder(value) {
        return value instanceof Folder;
    }

    //PCファイルかどうかを断言する
    function isFile(value) {
        return value instanceof File;
    }

    //ファイルの拡張子を貰う
    function getSuffix(fileName) {
        var result = "";

        fileName.replace(/[^\.]+\.([^\.]+)$/, function (match, suffix) {
            result = suffix;
        });

        return result;
    }

    //イテレータ
    function forEach(array, callback) {
        for (var i = 0; i < array.length; i++) {
            callback(array[i], i, array);
        }
    }

    //検索
    function find(array, callback) {
        for (var i = 0; i < array.length; i++) {
            var value = array[i];

            if (callback(value, i, array)) {
                return value;
            }
        }

        return undefined;
    }

    //paint中のメインの素材フォルダーを貰う
    function getMainSozaiFolder(folder) {
        var mainSozaiFolder = folder.getFiles();
        return find(mainSozaiFolder, isMainSozaiFolder);
    }

    //unusedフォルダーを貰う
    function getUnusedFolder(folder) {
        var unusedFolder = folder.getFiles();
        return find(unusedFolder, isUnusedFolder);
    }

    //unusedフォルダー中の素材フォルダーを貰う
    function getUnusedSozaiFolder(folder) {
        var unusedSozaiFolder = folder.getFiles();
        return find(unusedSozaiFolder, isSozaiFolder);
    }

    //paintフォルダーの中の素材フォルダーからシート探す
    function revealSozaiFolder(folders) {
        var targetFolder = find(folders, function (fileOrFolder) {
            //フォルダーかどうか、//フィルター名sheetかどうか
            return isFolder(fileOrFolder) && isSheetName(fileOrFolder.displayName);
        });

        if (targetFolder) {
            mainHaveSheetFile = true;
            var sheetFolder = targetFolder.getFiles();
            //シートフォルダーの中に繰り返す
            var file = find(sheetFolder, function (files) {
                //ファイルかどうか、//拡張子合ってるかどうか
                return isFile(files) && isDefaultSuffix(getSuffix(files.displayName));
            });

            if (file) {
                file.execute();
                return;
            }
        } else {
            mainHaveSheetFile = false;
        }
    }

    //unusedフォルダーの中の素材フォルダーからシート探す
    function revealUnusedSozaiFolder(unFolders) {
        var targetSheetFolder = find(unFolders, function (fileOrFolder) {
            //フォルダーかどうか、//フィルター名sheetかどうか
            return isFolder(fileOrFolder) && isSheetName(fileOrFolder.displayName);
        });

        if (targetSheetFolder) {
            subHaveSheetFile = true;
            var unusedSheetFolder = targetSheetFolder.getFiles();
            //シートフォルダーの中に繰り返す
            var unSheetFile = find(unusedSheetFolder, function (files) {
                //ファイルかどうか、//拡張子合ってるかどうか
                return isFile(files) && isDefaultSuffix(getSuffix(files.displayName));
            });

            if (unSheetFile) {
                unSheetFile.execute();
                return;
            }
        } else {
            subHaveSheetFile = false;
        }
    }

    //main
    function runScript(mainFolder, subFolder) {
        var sozaiFolder = getMainSozaiFolder(mainFolder).getFiles();

        if (subFolder) {
            var unusedSozaiFolder = subFolder.getFiles();
        }

        revealSozaiFolder(sozaiFolder);

        //素材フォルダーの中にsheetがなかった場合、unusedの中に探す
        if (unusedSozaiFolder) {
            //メインの素材フォルダーsheetなかったら
            if (!mainHaveSheetFile) {
                revealUnusedSozaiFolder(unusedSozaiFolder);
            }
        }

        if (!mainHaveSheetFile && !subHaveSheetFile) {
            alert("メイン素材フォルダーとunused素材フォルダーの中同時にsheetフォルダーがありませんでした。\n\nご確認お願い致します。");
        }
    }

    runScript(PAINT_FOLDER, UNUSEDSOZAI_FOLDER);
})(this);
