' 2022 © MaoHuPi
' forPdfInDir2word.vba

Function strInList(ByVal str As String, ByVal list As Collection) As Boolean
    Dim listItem as Variant
    strInList = False
    For Each listItem In list
        If listItem = str Then
            strInList = True
        End If
    Next listItem
End Function

Function listDir(ByVal dirPath As String, ByVal list As Collection)
    ' Dim dirPath As String
    ' Let dirPath = "C:\"
    Dim fileSystem As Object
    Dim div As Object
    Dim file As Object
    Dim docxList As New Collection
    Set fileSystem = CreateObject("Scripting.FileSystemObject")
    Set div = fileSystem.GetFolder(dirPath)
    For Each file In div.Files
        If InStr(1, file.Name, ".docx", 1) = Len(file.Name) - 4 Then
            docxList.Add(file.Name)
        End If
    Next file
    For Each file In div.Files
        If (InStr(1, file.Name, ".pdf", 1) = Len(file.Name) - 3) And (Not strInList(file.Name + ".docx", docxList)) Then
            list.Add(file.Name)
        End If
    Next file
End Function

Function pdf2word(ByVal dirPath As String, ByVal filePath As String, ByVal outputPath As String)
    ChangeFileOpenDirectory(dirPath)
    Documents.Open FileName:=filePath, ConfirmConversions:=False, _
        ReadOnly:=False, AddToRecentFiles:=False, PasswordDocument:="", _
        PasswordTemplate:="", Revert:=False, WritePasswordDocument:="", _
        WritePasswordTemplate:="", Format:=wdOpenFormatAuto, XMLTransform:=""
    ActiveDocument.SaveAs2 FileName:=outputPath, FileFormat:= _
        wdFormatXMLDocument, LockComments:=False, Password:="", AddToRecentFiles _
        :=True, WritePassword:="", ReadOnlyRecommended:=False, EmbedTrueTypeFonts _
        :=False, SaveNativePictureFormat:=False, SaveFormsData:=False, _
        SaveAsAOCELetter:=False, CompatibilityMode:=15
    ActiveDocument.Close _ 
        SaveChanges:=wdPromptToSaveChanges, _ 
        OriginalFormat:=wdPromptUser
End Function

Sub forPdfInDir2word()
    Dim dirPath
    ' Selection.WholeStory
    ' Let dirPath = Selection.Text
    Let dirPath = "C:\Users\...\pdfOCR\30-1_splited"
    Dim fileName As Variant
    Dim list As New Collection
    listDir dirPath, list
    For Each fileName In list
        On Error GoTo errorHandler
        pdf2word dirPath, fileName, fileName + ".docx"
        errorHandler: 
        If Err = 5121 Then
            Debug.Print("5121: " + fileName)
        ElseIf Err = 5132 Then
            Debug.Print("Done!")
            Exit Sub
        End If
    Next fileName
End Sub
