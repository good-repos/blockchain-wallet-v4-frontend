import * as AT from './actionTypes'
import {
  CoinType,
  Erc20CoinType,
  PaymentValue,
  RemoteDataType,
  SwapOrderType,
  SwapQuoteType,
  SwapUserLimitsType
} from 'core/types'

export type SwapAccountType = {
  address: number | string
  archived: boolean
  balance: number | string
  baseCoin: Exclude<CoinType, Erc20CoinType>
  coin: CoinType
  index: number
  label: string
  type: 'ACCOUNT' | 'CUSTODIAL'
}

export type SwapAmountFormValues =
  | { amount?: string; cryptoAmount?: string }
  | undefined

export type InitSwapFormValuesType =
  | {
      BASE?: SwapAccountType
      COUNTER?: SwapAccountType
    }
  | undefined

export type SwapCoinType = CoinType

export enum SwapStepType {
  'INIT_SWAP',
  'COIN_SELECTION',
  'ENTER_AMOUNT',
  'UPGRADE_PROMPT',
  'PREVIEW_SWAP',
  'SUCCESSFUL_SWAP',
  'ORDER_DETAILS'
}

export type SwapSideType = 'BASE' | 'COUNTER'
export type SwapCheckoutFixType = 'CRYPTO' | 'FIAT'

// state
export type SwapState = {
  fix: SwapCheckoutFixType
  limits: RemoteDataType<string, SwapUserLimitsType>
  order?: SwapOrderType
  payment: RemoteDataType<string, undefined | PaymentValue>
  quote: RemoteDataType<string, { quote: SwapQuoteType; rate: number }>
  side: SwapSideType
  step: keyof typeof SwapStepType
  trades: {
    list: Array<SwapOrderType>
    status: RemoteDataType<string, string>
  }
}

// actions
interface FetchLimitsFailureActionType {
  payload: {
    error: string
  }
  type: typeof AT.FETCH_LIMITS_FAILURE
}
interface FetchLimitsLoadingActionType {
  type: typeof AT.FETCH_LIMITS_LOADING
}
interface FetchLimitsSuccessActionType {
  payload: {
    limits: SwapUserLimitsType
  }
  type: typeof AT.FETCH_LIMITS_SUCCESS
}

interface FetchQuoteFailureActionType {
  payload: {
    error: string
  }
  type: typeof AT.FETCH_QUOTE_FAILURE
}
interface FetchQuoteLoadingActionType {
  type: typeof AT.FETCH_QUOTE_LOADING
}
interface FetchQuoteSuccessActionType {
  payload: {
    quote: SwapQuoteType
    rate: number
  }
  type: typeof AT.FETCH_QUOTE_SUCCESS
}

interface FetchTradesFailureActionType {
  payload: {
    error: string
  }
  type: typeof AT.FETCH_TRADES_FAILURE
}
interface FetchTradesLoadingActionType {
  type: typeof AT.FETCH_TRADES_LOADING
}
interface FetchTradesSuccessActionType {
  payload: {
    trades: Array<SwapOrderType>
  }
  type: typeof AT.FETCH_TRADES_SUCCESS
}

interface UpdatePaymentFailureActionType {
  payload: {
    error: string
  }
  type: typeof AT.UPDATE_PAYMENT_FAILURE
}
interface UpdatePaymentLoadingActionType {
  type: typeof AT.UPDATE_PAYMENT_LOADING
}
interface UpdatePaymentSuccessActionType {
  payload: {
    payment: undefined | PaymentValue
  }
  type: typeof AT.UPDATE_PAYMENT_SUCCESS
}

interface SetSwapCheckoutFixType {
  payload: {
    fix: SwapCheckoutFixType
  }
  type: typeof AT.SET_CHECKOUT_FIX
}
interface SetSwapStepActionType {
  payload: SwapStepPayload
  type: typeof AT.SET_STEP
}

interface SwitchFixActionType {
  payload: {
    amount: string
    fix: SwapCheckoutFixType
  }
  type: typeof AT.SWITCH_FIX
}

export type SwapStepPayload =
  | {
      options?: never
      step: 'ENTER_AMOUNT'
    }
  | {
      options?: never
      step: 'INIT_SWAP'
    }
  | { options?: never; step: 'PREVIEW_SWAP' }
  | {
      options: {
        order: SwapOrderType
      }
      step: 'ORDER_DETAILS'
    }
  | {
      options: {
        order: SwapOrderType
      }
      step: 'SUCCESSFUL_SWAP'
    }
  | { options: { side: 'BASE' | 'COUNTER' }; step: 'COIN_SELECTION' }
  | { options?: never; step: 'UPGRADE_PROMPT' }

export type SwapActionTypes =
  | FetchLimitsFailureActionType
  | FetchLimitsLoadingActionType
  | FetchLimitsSuccessActionType
  | FetchQuoteFailureActionType
  | FetchQuoteLoadingActionType
  | FetchQuoteSuccessActionType
  | FetchTradesFailureActionType
  | FetchTradesLoadingActionType
  | FetchTradesSuccessActionType
  | UpdatePaymentFailureActionType
  | UpdatePaymentLoadingActionType
  | UpdatePaymentSuccessActionType
  | SetSwapCheckoutFixType
  | SetSwapStepActionType
  | SwitchFixActionType
