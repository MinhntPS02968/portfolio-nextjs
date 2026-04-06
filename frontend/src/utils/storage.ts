'use client';

import Cookies from 'js-cookie'

export class useCookie {
    static get(cookieName: string): string {
        return Cookies.get(cookieName) ?? ''
    }
    static set(cookieName: string, value: string): void {
        Cookies.set(cookieName, value)
    }
    static delete(cookieName: string): void {
        Cookies.remove(cookieName)
    }
    static has(cookieName: string): boolean {
        return Cookies.get(cookieName) !== undefined
    }
    static getAll(): { name: string; value: string }[] {
        return Object.entries(Cookies.get() as Record<string, string>).map(([name, value]) => ({ name, value }))
    }
    static clearAll(): void {
        const allCookies = this.getAll()
        allCookies.forEach(cookie => {
            this.delete(cookie.name)
        })
    }
}

export class useLocalStorage {
    static get(key: string): string {
        return localStorage.getItem(key) ?? ''
    }
    static set(key: string, value: string): void {
        return localStorage.setItem(key, value)
    }
    static delete(key: string): void {
        return localStorage.removeItem(key)
    }
    static has(key: string): boolean {
        return localStorage.getItem(key) !== null
    }
    static getAll(): { key: string; value: string }[] {
        return Object.entries(localStorage).map(([key, value]) => ({ key, value }))
    }
    static clearAll(): void {
        const allKeys = this.getAll()
        allKeys.forEach(key => {
            this.delete(key.key)
        })
    }
}

export class useSessionStorage {
    static get(key: string): string {
        return sessionStorage.getItem(key) ?? ''
    }
    static set(key: string, value: string): void {
        return sessionStorage.setItem(key, value)
    }
    static delete(key: string): void {
        return sessionStorage.removeItem(key)
    }
    static has(key: string): boolean {
        return sessionStorage.getItem(key) !== null
    }
    static getAll(): { key: string; value: string }[] {
        return Object.entries(sessionStorage).map(([key, value]) => ({ key, value }))
    }
    static clearAll(): void {
        const allKeys = this.getAll()
        allKeys.forEach(key => {
            this.delete(key.key)
        })
    }
}