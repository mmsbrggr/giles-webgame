/*
 * This file is part of Giles's Webgame.
 *
 * (c) Marcel Moosbrugger
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

import { connect } from 'react-redux';
import GamePageP from 'Presentationals/GamePage.jsx';
import { setActiveFormula, applyGameStep, emptyActiveFormula } from 'Actions';

/** Maps the redux state to props which will get passed down **/
const mapStateToProps = (state) => {
    return {
        gameState: state.game.gameState,
        activeFormula: (!!state.game.activeFormula.formula) ? state.game.activeFormula : null,
        model: state.data.model,
        players: state.players
    }
};

/** Maps the redux dispatch function to props which will get passed to the GamePage **/
const mapDispatchToProps = (dispatch) => {
    return {
        activateFormula: (player, formula) => {
            dispatch(setActiveFormula(player, formula));
        },
        executeGameStep: (proponent, gameStep) => {
            dispatch(applyGameStep(proponent, gameStep));
        }
    }
};

/** Connects the GamePage with the redux store  **/
const GamePage = connect(
    mapStateToProps,
    mapDispatchToProps
)(GamePageP);

export default GamePage;
