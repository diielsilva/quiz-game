import {Question} from './question';
import {MatchState} from '../enums/match_state';

export interface Match {
  attempts: number;
  selected: Question;
  remaining: Question[];
  state: MatchState;
}
