import { SvelteComponent } from 'svelte';
import { StringCaster } from 'cast-string';
export declare type PrimitiveType = string | number | boolean | null | undefined;
export declare type SerializableObject = {
    [name: string]: PrimitiveType | PrimitiveType[] | {
        [name: string]: SerializableObject;
    };
};
export declare type ComponentModule = {
    default: typeof SvelteComponent;
    load?: LoadFn;
    beforeEnter?: GuardHook;
};
export declare type SyncComponent = ComponentModule | typeof SvelteComponent;
export declare type AsyncComponent = () => Promise<SyncComponent>;
export declare type RouteProps = SerializableObject | ((route: Route) => SerializableObject);
export declare type PropSetters = Array<(route: Route) => SerializableObject>;
declare type SSRStateNode = {
    data?: SerializableObject;
    children?: SSRState;
};
export declare type SSRState = Record<string, SSRStateNode>;
export declare type LoadFn = (props: Record<string, any>, route: Route, ssrContext?: unknown) => Promise<SerializableObject>;
export declare type KeyFn = (route: Route) => PrimitiveType;
export declare type RouterViewDef = {
    name?: string;
    path?: string;
    component?: SyncComponent | AsyncComponent;
    props?: RouteProps;
    key?: KeyFn;
    meta?: RouteProps;
    children?: RouterViewDefGroup;
    beforeEnter?: GuardHook;
    beforeLeave?: GuardHook;
};
export declare type RouterViewDefGroup = Array<RouterViewDef | RouterViewDef[]>;
export declare type RouterViewResolved = {
    name: string;
    component?: SyncComponent;
    props?: SerializableObject;
    key?: PrimitiveType;
    children?: Record<string, RouterViewResolved>;
};
export declare type Query = Record<string, PrimitiveType | PrimitiveType[]> | URLSearchParams;
export declare type Location = {
    path: string;
    params?: Record<string, string | number | boolean>;
    query?: Query;
    hash?: string;
    state?: SerializableObject;
};
export declare type Route = {
    path: string;
    query: StringCaster;
    search: string;
    hash: string;
    state: SerializableObject;
    params: StringCaster;
    meta: Record<string, any>;
    href: string;
    _routerViews: Record<string, RouterViewResolved>;
    _beforeLeaveHooks: GuardHook[];
    _metaSetters: RouteProps[];
    _propSetters: PropSetters;
    _keySetters: KeyFn[];
};
export declare type GuardHookResult = void | boolean | string | Location;
export declare type GuardHook = (to: Route, from?: Route) => GuardHookResult | Promise<GuardHookResult>;
export declare type NormalHook = (to: Route, from?: Route) => void;
export declare type UpdateHook = (route: Route) => void;
export declare type Mode = 'server' | 'client';
export declare type HandlerResult = {
    route: Route;
    ssrState: SSRState | null;
} | null;
export default class Router {
    private base?;
    private pathQuery?;
    private urlRouter;
    private beforeChangeHooks;
    private afterChangeHooks;
    private updateHooks;
    private onPopStateWrapper;
    private mode?;
    current?: Route;
    constructor({ routes, base, pathQuery, mode }: {
        routes: RouterViewDefGroup;
        base?: string;
        pathQuery?: string;
        mode?: Mode;
    });
    private flatRoutes;
    handle(location: string | Location, ssrContext?: unknown): Promise<HandlerResult>;
    private locationToInternalURL;
    private internalURLtoHref;
    parseLocation(location: string | Location): {
        path: string;
        query: StringCaster;
        search: string;
        hash: string;
        state: SerializableObject;
        href: string;
    };
    href(location: string | Location): string;
    private runGuardHooks;
    private resolveRoute;
    private resolveRouterViews;
    private updateRoute;
    private updateRouteMeta;
    private updateRouteProps;
    private updateRouteKeys;
    setState(state: SerializableObject): void;
    push(location: string | Location): void;
    replace(location: string | Location): void;
    private onPopState;
    private silentGo;
    go(delta: number, state?: SerializableObject): void;
    back(state?: SerializableObject): void;
    forward(state?: SerializableObject): void;
    on(event: 'beforeChange' | 'beforeCurrentRouteLeave', handler: GuardHook): void;
    on(event: 'update', handler: UpdateHook): void;
    on(event: 'afterChange', handler: NormalHook): void;
    off(event: 'beforeChange' | 'beforeCurrentRouteLeave', handler: GuardHook): void;
    off(event: 'update', handler: UpdateHook): void;
    off(event: 'afterChange', handler: NormalHook): void;
    private emit;
}
export {};
