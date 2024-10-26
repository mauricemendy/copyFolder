function doGet() {
  return HtmlService.createHtmlOutputFromFile('index');
}
function copyFolder() {
  // Demander l'ID du dossier à copier
  var folderId = Browser.inputBox('Entrez l\'ID du dossier à copier');

  // Demander le nom du nouveau dossier
  var newFolderName = Browser.inputBox('Entrez le nom du nouveau dossier');

  // Récupérer le dossier source
  var sourceFolder = DriveApp.getFolderById(folderId);

  // Créer le nouveau dossier
  var newFolder = DriveApp.createFolder(newFolderName);

  // Copier le contenu du dossier source vers le nouveau dossier
  copyFolderContents(sourceFolder, newFolder);

  // Afficher un message de confirmation
  Browser.msgBox('Dossier copié avec succès !');
}

function copyFolderContents(sourceFolder, targetFolder) {
  // Copier les fichiers du dossier source
  var files = sourceFolder.getFiles();
  while (files.hasNext()) {
    var file = files.next();
    targetFolder.addFile(file.makeCopy());
  }

  // Copier les sous-dossiers du dossier source
  var folders = sourceFolder.getFolders();
  while (folders.hasNext()) {
    var folder = folders.next();
    var newFolder = targetFolder.createFolder(folder.getName());
    copyFolderContents(folder, newFolder);
  }
}
