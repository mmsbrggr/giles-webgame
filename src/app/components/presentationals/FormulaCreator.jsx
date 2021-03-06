/*
 * This file is part of Giles's Webgame.
 *
 * (c) Marcel Moosbrugger
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

import React from 'react';
import 'Styles/FormulaCreator.scss';
import InfoLink from 'Containers/InfoLink.jsx';
import Parser from 'Purs/Formula/Parser.purs';
import Formula from 'Purs/Formula.purs';
import Info from 'Purs/Formula/Info.purs';

/**
 * Component which allows a user to create first-order formula
 */
export default class FormulaCreator extends React.Component {

    /**
     * @param props.formula The formula to start with
     * @param props.onError The callback gets called if the user enters a not parsable formula
     * @param props.onSuccess The callback gets called if the user enters a valid formula
     * @param props.onEdit The callback gets called if the user edits the formula
     */
    constructor(props) {
        super(props);
        this.state = {value: '', error: undefined};
        this.state = {value: props.formula, error: (props.formula.length > 0) ? false : undefined};
        // when the user clicks on a symbol, the next blur of the input needs to
        // be ignored. After the click on the symbol the component focuses right back to the input
        this.ignoreNextBlur = false;
    }

    /**
     * On blur the string in the input gets evaluated.
     * The method tries to parse the formula and depending on whether or not that was
     * successful it calls the corresponding callbacks.
     */
    handleBlur() {
        if (this.ignoreNextBlur) return;

        const formula = Parser.parse(this.state.value);
        this.setState({error: formula.constructor.name === 'Left'});

        if (formula.constructor.name === 'Left') {
            this.props.onError(this.state.value, formula.value0.value1.column - 1);
        } else {
            this.props.onSuccess(Formula.toString(formula.value0), Info.constants(formula.value0));
        }
    }

    /**
     * Handles the onChange event of the input.
     *
     * @param event
     */
    handleChange(event) {
        this.setState({value: event.target.value});
        this.props.onEdit();
    }

    /**
     * Handles the onFocus event of the input.
     */
    handleFocus() {
        this.ignoreNextBlur = false;
        this.setState({error: undefined});
    }

    /**
     * Finishes the editing of the component when the user hits enter.
     *
     * @param event
     */
    handleKeyDown(event) {
        if (event.keyCode=== 13) {
            this.finishEditing();
        }
    }

    /**
     * Makes sure the current value of the input is parsed.
     */
    finishEditing() {
        this.refs.input.blur();
    }

    /**
     * Inserts a given symbol at the position saved at the last blur.
     * After that the cursor is positioned right after the inserted symbol.
     *
     * @param symbol
     */
    insertSymbol(symbol) {
        this.ignoreNextBlur = true;
        const insertPosition = this.refs.input.selectionStart;
        const value = this.state.value.slice(0, insertPosition) + symbol + this.state.value.slice(insertPosition);
        this.setState({value});

        // setTimeout 0 positions the callback function at the end of the current execution queue
        setTimeout(function () {
            this.refs.input.focus();
            this.refs.input.setSelectionRange(insertPosition + 1, insertPosition + 1);
        }.bind(this), 0);

        this.props.onEdit();
    }

    render() {
        return (
            <div className={'formula-creator' + (this.state.error === true ? " error" : (this.state.error === false) ? ' success' : '')}>
                <InfoLink infoKey="formula">
                    <label htmlFor="formula-input">Enter formula:</label>
                </InfoLink>
                <div className="input-container">
                    <input ref="input"
                           type="text"
                           id="formula-input"
                           value={this.state.value}
                           onChange={this.handleChange.bind(this)}
                           onFocus={this.handleFocus.bind(this)}
                           onBlur={this.handleBlur.bind(this)}
                           onKeyDown={this.handleKeyDown.bind(this)}
                           autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"/>
                </div>
                <div className="symbols">
                    <span onMouseDown={this.insertSymbol.bind(this, '\u2200')}>&forall;</span>
                    <span onMouseDown={this.insertSymbol.bind(this, '\u2203')}>&exist;</span>
                    <span onMouseDown={this.insertSymbol.bind(this, '\u2227')}>&and;</span>
                    <span onMouseDown={this.insertSymbol.bind(this, '\u0026')}>&amp;</span>
                    <span onMouseDown={this.insertSymbol.bind(this, '\u2228')}>&or;</span>
                    <span onMouseDown={this.insertSymbol.bind(this, '\u2192')}>&rarr;</span>
                    <span onMouseDown={this.insertSymbol.bind(this, '\u00AC')}>&not;</span>
                    <span onMouseDown={this.insertSymbol.bind(this, '\u22A4')}>&#8868;</span>
                    <span onMouseDown={this.insertSymbol.bind(this, '\u22A5')}>&#8869;</span>
                </div>
                <InfoLink infoKey="conventions">
                    <dl>
                        <dt>Conventions:</dt>
                        <dd>A...Z for predicates/propositions, a...t and 0...9 for constants, u...z for variables, strict bracketing</dd>
                    </dl>
                </InfoLink>
            </div>
        );
    }
}
