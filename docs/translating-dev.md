# How to translate riot-web (Dev Guide)

## Requirements

- A working [Development Setup](../../#setting-up-a-dev-environment)
- Be able to understand English
- Be able to understand the language you want to translate riot-web into

## Adding new strings

1. Check if the import ``import { _t } from 'matrix-react-sdk-vj/lib/languageHandler';`` is present. If not add it to the other import statements.
2. Add ``_t()`` to your string. (Don't forget curly braces when you assign an expression to JSX attributes in the render method)
3. Add the String to the ``en_EN.json`` file in ``src/i18n/strings`` (respect which repository you are on).

## Adding variables inside a string.

1. Extend your ``_t()`` call. Instead of ``_t(STRING)`` use ``_t(STRING, {})``
2. Decide how to name it. Please think about if the person who has to translate it can understand what it does.
3. Add it to the array in ``_t`` for example ``_t(STRING, {variable: this.variable})``
4. Add the variable inside the string. The syntax for variables is ``%(variable)s``. Please note the s at the end. The name of the variable has to match the previous used name.

## Things to know/Style Guides

- Do not use it inside ``getDefaultProps`` at the point where ``getDefaultProps`` is initialized the translations aren't loaded yet and it causes missing translations.
- If using translated strings as constants, translated strings can't be in constants loaded at class-load time since the translations won't be loaded.
- If a string is presented in the UI with punctuation like a full stop, include this in the translation strings, since punctuation varies between languages too.
