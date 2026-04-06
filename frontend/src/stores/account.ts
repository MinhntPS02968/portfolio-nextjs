"use client";

import { userApi } from "@/services/api/user";
import { vipBoosterApi } from "@/services/api/vip";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface State {
  account: {
    ReferralCode: string;
    TotalMember: string;
    TotalF1: string;
    StrongBusiness: string;
    WeakerBusiness: string;
  };
  balance: {
    status: number | null;
    FullName: string | null;
    rank: string | null;
    total_capital: number;
    balance_usdt: string | number;
    balance_otc: string | number;
    bot_profit_usdt: string | number;
    bot_profit_otc: string | number;
    my_bonus_usdt: string | number;
    my_bonus_otc: string | number;
    my_staking_origin: string | number;
    my_staking_profit: string | number;
    ref_code: string | null;
    total_member: number;
    total_f1: number;
    total_commission_received_usdt: number;
    matching_usdt: number;
    matching_otc: number;
    peer_commission_usdt: number;
    peer_commission_otc: number;
    leader_commission_otc: number;
    Yield: number | null;
    YieldCut: string | null;
    Tier: number | null;
    RankCommission: number | null;
    leader: string;
    hotrank: string | number;
  };
  referrals: any;
  refferral: string;
  myVipBoost: {
    current_vip_level: number;
    total_amount_locked: number;
    my_boost: {
      boost_id: string;
      from_vip_level: string;
      to_vip_level: string;
      amount_otc_locked: number;
      payment_this_time: number;
      currency: string;
      lock_time_days: number;
      time_start: string;
      time_unlock: string;
      days_remaining: number;
      can_unlock: boolean;
      status: string;
    };
  };
}

type Actions = {
  // State management
  setAccount: (account: any) => void;
  reset: () => void;
  getUserInfo: () => void;
  getBalance: () => void;
  getReferrals: (dto: any) => void;
  setRefferral: (refferral: string) => void;
  getMyVipBoost: () => void;
};

const initialState: State = {
  account: {
    ReferralCode: "",
    TotalMember: "",
    TotalF1: "",
    StrongBusiness: "",
    WeakerBusiness: "",
  },
  balance: {
    status: null,
    FullName: null,
    rank: null,
    total_capital: 0,
    balance_usdt: 0,
    balance_otc: 0,
    bot_profit_usdt: 0,
    bot_profit_otc: 0,
    my_bonus_usdt: 0,
    my_bonus_otc: 0,
    my_staking_profit: 0,
    my_staking_origin: 0,
    ref_code: "",
    total_member: 0,
    total_f1: 0,
    total_commission_received_usdt: 0,
    matching_usdt: 0,
    matching_otc: 0,
    peer_commission_usdt: 0,
    peer_commission_otc: 0,
    leader_commission_otc: 0,
    Yield: null,
    YieldCut: null,
    Tier: null,
    RankCommission: null,
    leader: "0",
    hotrank: 0,
  },
  myVipBoost: {
    current_vip_level: 1,
    total_amount_locked: 0,
    my_boost: {
      boost_id: "0",
      from_vip_level: "0",
      to_vip_level: "0",
      amount_otc_locked: 0,
      payment_this_time: 0,
      currency: "",
      lock_time_days: 0,
      time_start: "",
      time_unlock: "",
      days_remaining: 0,
      can_unlock: false,
      status: "",
    },
  },
  referrals: null,
  refferral: String(process.env.NEXT_PUBLIC_ROOT_REF_ID),
};

export const useAccountStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      ...initialState,

      // State Management Actions
      setAccount: (account: {
        ReferralCode: string;
        TotalMember: string;
        TotalF1: string;
        StrongBusiness: string;
        WeakerBusiness: string;
      }) => set({ account }),
      setRefferral: (refferral: string) => set({ refferral }),
      reset: () => set(initialState),
      getUserInfo: async () => {
        const response: any = await userApi.me();
        set({ account: response });
      },
      getBalance: async () => {
        const response: any = await userApi.balance();
        set({ balance: response });
      },
      getReferrals: async (dto: any) => {
        const response: any = await userApi.referrals(dto);
        set({ referrals: response });
      },
      getMyVipBoost: async () => {
        const response: any = await vipBoosterApi.getMyVipBoost();
        console.log(response);
        set({ myVipBoost: response });
      },
    }),
    {
      name: "account-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
