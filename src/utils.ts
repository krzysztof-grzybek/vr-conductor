import { Component } from 'aframe';

export type ComponentDef<T, D extends Object> = T & Partial<Component<D>> & ThisType<T & Component<D>>

export type FullComponentDef<T> = T & Component;
