xgettext --from-code=UTF-8 -o ..\ctrl-w.pot -L JavaScript --package-name=ctrl+w --copyright-holder=" " --msgid-bugs-address=http://twd.io/e/0fdb0w --add-comments=Translators: ..\CTRLW.user.js
msgmerge -U --backup=off ..\translations\fr\LC_MESSAGES\ctrl-w.po ..\ctrl-w.pot
msgmerge -U --backup=off ..\translations\en\LC_MESSAGES\ctrl-w.po ..\ctrl-w.pot
msgmerge -U --backup=off ..\translations\es\LC_MESSAGES\ctrl-w.po ..\ctrl-w.pot