import { beginCell } from "../boc/Builder";
import { Cell } from "../boc/Cell";
import { Slice } from "../boc/Slice";
import { Maybe } from "../utils/maybe";
import { TupleItem } from "./tuple";

export class TupleBuilder {
    private _tuple: TupleItem[] = [];

    writeNumber(v?: Maybe<bigint | number>) {
        if (v === null || v === undefined) {
            this._tuple.push({ type: 'null' });
        } else {
            this._tuple.push({ type: 'int', value: BigInt(v) });
        }
    }

    writeBoolean(v?: Maybe<boolean>) {
        if (v === null || v === undefined) {
            this._tuple.push({ type: 'null' });
        } else {
            this._tuple.push({ type: 'int', value: v ? -1n : 0n });
        }
    }

    writeBuffer(v?: Maybe<Buffer | null | undefined>) {
        if (v === null || v === undefined) {
            this._tuple.push({ type: 'null' });
        } else {
            this._tuple.push({ type: 'slice', cell: beginCell().storeBuffer(v).endCell() });
        }
    }

    writeString(v?: Maybe<string>) {
        if (v === null || v === undefined) {
            this._tuple.push({ type: 'null' });
        } else {
            this._tuple.push({ type: 'slice', cell: beginCell().storeStringTail(v).endCell() });
        }
    }

    writeCell(v?: Maybe<Cell | Slice>) {
        if (v === null || v === undefined) {
            this._tuple.push({ type: 'null' });
        } else {
            if (v instanceof Cell) {
                this._tuple.push({ type: 'cell', cell: v });
            } else if (v instanceof Slice) {
                this._tuple.push({ type: 'cell', cell: v.asCell() });
            }
        }
    }

    writeSlice(v?: Maybe<Cell | Slice>) {
        if (v === null || v === undefined) {
            this._tuple.push({ type: 'null' });
        } else {
            if (v instanceof Cell) {
                this._tuple.push({ type: 'slice', cell: v });
            } else if (v instanceof Slice) {
                this._tuple.push({ type: 'slice', cell: v.asCell() });
            }
        }
    }

    writeBuilder(v?: Maybe<Cell | Slice>) {
        if (v === null || v === undefined) {
            this._tuple.push({ type: 'null' });
        } else {
            if (v instanceof Cell) {
                this._tuple.push({ type: 'builder', cell: v });
            } else if (v instanceof Slice) {
                this._tuple.push({ type: 'builder', cell: v.asCell() });
            }
        }
    }

    writeTuple(v?: Maybe<TupleItem[]>) {
        if (v === null || v === undefined) {
            this._tuple.push({ type: 'null' });
        } else {
            this._tuple.push({ type: 'tuple', items: v });
        }
    }

    build() {
        return [...this._tuple];
    }
}