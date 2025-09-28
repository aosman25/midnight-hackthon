'use strict';
const __compactRuntime = require('@midnight-ntwrk/compact-runtime');
const expectedRuntimeVersionString = '0.8.1';
const expectedRuntimeVersion = expectedRuntimeVersionString.split('-')[0].split('.').map(Number);
const actualRuntimeVersion = __compactRuntime.versionString.split('-')[0].split('.').map(Number);
if (expectedRuntimeVersion[0] != actualRuntimeVersion[0]
     || (actualRuntimeVersion[0] == 0 && expectedRuntimeVersion[1] != actualRuntimeVersion[1])
     || expectedRuntimeVersion[1] > actualRuntimeVersion[1]
     || (expectedRuntimeVersion[1] == actualRuntimeVersion[1] && expectedRuntimeVersion[2] > actualRuntimeVersion[2]))
   throw new __compactRuntime.CompactError(`Version mismatch: compiled code expects ${expectedRuntimeVersionString}, runtime is ${__compactRuntime.versionString}`);
{ const MAX_FIELD = 52435875175126190479447740508185965837690552500527637822603658699938581184512n;
  if (__compactRuntime.MAX_FIELD !== MAX_FIELD)
     throw new __compactRuntime.CompactError(`compiler thinks maximum field value is ${MAX_FIELD}; run time thinks it is ${__compactRuntime.MAX_FIELD}`)
}

const _descriptor_0 = new __compactRuntime.CompactTypeUnsignedInteger(18446744073709551615n, 8);

const _descriptor_1 = new __compactRuntime.CompactTypeBytes(32);

const _descriptor_2 = new __compactRuntime.CompactTypeEnum(3, 1);

class _Applicant_0 {
  alignment() {
    return _descriptor_1.alignment().concat(_descriptor_2.alignment().concat(_descriptor_0.alignment()));
  }
  fromValue(value_0) {
    return {
      tenant: _descriptor_1.fromValue(value_0),
      status: _descriptor_2.fromValue(value_0),
      applicationTime: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_1.toValue(value_0.tenant).concat(_descriptor_2.toValue(value_0.status).concat(_descriptor_0.toValue(value_0.applicationTime)));
  }
}

const _descriptor_3 = new _Applicant_0();

const _descriptor_4 = new __compactRuntime.CompactTypeBoolean();

class _Listing_0 {
  alignment() {
    return _descriptor_1.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_4.alignment()))));
  }
  fromValue(value_0) {
    return {
      landlord: _descriptor_1.fromValue(value_0),
      rent: _descriptor_0.fromValue(value_0),
      minIncome: _descriptor_0.fromValue(value_0),
      minCredit: _descriptor_0.fromValue(value_0),
      isActive: _descriptor_4.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_1.toValue(value_0.landlord).concat(_descriptor_0.toValue(value_0.rent).concat(_descriptor_0.toValue(value_0.minIncome).concat(_descriptor_0.toValue(value_0.minCredit).concat(_descriptor_4.toValue(value_0.isActive)))));
  }
}

const _descriptor_5 = new _Listing_0();

const _descriptor_6 = new __compactRuntime.CompactTypeOpaqueString();

const _descriptor_7 = new __compactRuntime.CompactTypeUnsignedInteger(65535n, 2);

const _descriptor_8 = new __compactRuntime.CompactTypeVector(2, _descriptor_1);

class _ContractAddress_0 {
  alignment() {
    return _descriptor_1.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_1.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_1.toValue(value_0.bytes);
  }
}

const _descriptor_9 = new _ContractAddress_0();

const _descriptor_10 = new __compactRuntime.CompactTypeUnsignedInteger(255n, 1);

const _descriptor_11 = new __compactRuntime.CompactTypeUnsignedInteger(340282366920938463463374607431768211455n, 16);

class Contract {
  witnesses;
  constructor(...args_0) {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`Contract constructor: expected 1 argument, received ${args_0.length}`);
    }
    const witnesses_0 = args_0[0];
    if (typeof(witnesses_0) !== 'object') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor is not an object');
    }
    if (typeof(witnesses_0.getTenantIncome) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named getTenantIncome');
    }
    if (typeof(witnesses_0.getTenantCredit) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named getTenantCredit');
    }
    if (typeof(witnesses_0.getTenantContactInfo) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named getTenantContactInfo');
    }
    if (typeof(witnesses_0.getSecretKey) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named getSecretKey');
    }
    this.witnesses = witnesses_0;
    this.circuits = {
      createListing: (...args_1) => {
        if (args_1.length !== 4) {
          throw new __compactRuntime.CompactError(`createListing: expected 4 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const rent_0 = args_1[1];
        const minIncome_0 = args_1[2];
        const minCredit_0 = args_1[3];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('createListing',
                                      'argument 1 (as invoked from Typescript)',
                                      'PrivateRent.compact line 47 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(rent_0) === 'bigint' && rent_0 >= 0n && rent_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('createListing',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'PrivateRent.compact line 47 char 1',
                                      'Uint<0..18446744073709551615>',
                                      rent_0)
        }
        if (!(typeof(minIncome_0) === 'bigint' && minIncome_0 >= 0n && minIncome_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('createListing',
                                      'argument 2 (argument 3 as invoked from Typescript)',
                                      'PrivateRent.compact line 47 char 1',
                                      'Uint<0..18446744073709551615>',
                                      minIncome_0)
        }
        if (!(typeof(minCredit_0) === 'bigint' && minCredit_0 >= 0n && minCredit_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('createListing',
                                      'argument 3 (argument 4 as invoked from Typescript)',
                                      'PrivateRent.compact line 47 char 1',
                                      'Uint<0..18446744073709551615>',
                                      minCredit_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(rent_0).concat(_descriptor_0.toValue(minIncome_0).concat(_descriptor_0.toValue(minCredit_0))),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment()))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._createListing_0(context,
                                               partialProofData,
                                               rent_0,
                                               minIncome_0,
                                               minCredit_0);
        partialProofData.output = { value: _descriptor_0.toValue(result_0), alignment: _descriptor_0.alignment() };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      applyToListing: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`applyToListing: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const listingId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('applyToListing',
                                      'argument 1 (as invoked from Typescript)',
                                      'PrivateRent.compact line 69 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(listingId_0) === 'bigint' && listingId_0 >= 0n && listingId_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('applyToListing',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'PrivateRent.compact line 69 char 1',
                                      'Uint<0..18446744073709551615>',
                                      listingId_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(listingId_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._applyToListing_0(context,
                                                partialProofData,
                                                listingId_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      acceptApplicant: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`acceptApplicant: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const listingId_0 = args_1[1];
        const tenantPk_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('acceptApplicant',
                                      'argument 1 (as invoked from Typescript)',
                                      'PrivateRent.compact line 102 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(listingId_0) === 'bigint' && listingId_0 >= 0n && listingId_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('acceptApplicant',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'PrivateRent.compact line 102 char 1',
                                      'Uint<0..18446744073709551615>',
                                      listingId_0)
        }
        if (!(tenantPk_0.buffer instanceof ArrayBuffer && tenantPk_0.BYTES_PER_ELEMENT === 1 && tenantPk_0.length === 32)) {
          __compactRuntime.type_error('acceptApplicant',
                                      'argument 2 (argument 3 as invoked from Typescript)',
                                      'PrivateRent.compact line 102 char 1',
                                      'Bytes<32>',
                                      tenantPk_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(listingId_0).concat(_descriptor_1.toValue(tenantPk_0)),
            alignment: _descriptor_0.alignment().concat(_descriptor_1.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._acceptApplicant_0(context,
                                                 partialProofData,
                                                 listingId_0,
                                                 tenantPk_0);
        partialProofData.output = { value: _descriptor_6.toValue(result_0), alignment: _descriptor_6.alignment() };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      proveQualification: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`proveQualification: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const listingId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('proveQualification',
                                      'argument 1 (as invoked from Typescript)',
                                      'PrivateRent.compact line 130 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(listingId_0) === 'bigint' && listingId_0 >= 0n && listingId_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('proveQualification',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'PrivateRent.compact line 130 char 1',
                                      'Uint<0..18446744073709551615>',
                                      listingId_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(listingId_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._proveQualification_0(context,
                                                    partialProofData,
                                                    listingId_0);
        partialProofData.output = { value: _descriptor_4.toValue(result_0), alignment: _descriptor_4.alignment() };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      getListingDetails: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`getListingDetails: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const listingId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('getListingDetails',
                                      'argument 1 (as invoked from Typescript)',
                                      'PrivateRent.compact line 142 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(listingId_0) === 'bigint' && listingId_0 >= 0n && listingId_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('getListingDetails',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'PrivateRent.compact line 142 char 1',
                                      'Uint<0..18446744073709551615>',
                                      listingId_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(listingId_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._getListingDetails_0(context,
                                                   partialProofData,
                                                   listingId_0);
        partialProofData.output = { value: _descriptor_5.toValue(result_0), alignment: _descriptor_5.alignment() };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      hasApplied: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`hasApplied: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const listingId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('hasApplied',
                                      'argument 1 (as invoked from Typescript)',
                                      'PrivateRent.compact line 148 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(listingId_0) === 'bigint' && listingId_0 >= 0n && listingId_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('hasApplied',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'PrivateRent.compact line 148 char 1',
                                      'Uint<0..18446744073709551615>',
                                      listingId_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(listingId_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._hasApplied_0(context,
                                            partialProofData,
                                            listingId_0);
        partialProofData.output = { value: _descriptor_4.toValue(result_0), alignment: _descriptor_4.alignment() };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      getApplicationStatus: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`getApplicationStatus: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const listingId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('getApplicationStatus',
                                      'argument 1 (as invoked from Typescript)',
                                      'PrivateRent.compact line 160 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(listingId_0) === 'bigint' && listingId_0 >= 0n && listingId_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('getApplicationStatus',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'PrivateRent.compact line 160 char 1',
                                      'Uint<0..18446744073709551615>',
                                      listingId_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(listingId_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._getApplicationStatus_0(context,
                                                      partialProofData,
                                                      listingId_0);
        partialProofData.output = { value: _descriptor_2.toValue(result_0), alignment: _descriptor_2.alignment() };
        return { result: result_0, context: context, proofData: partialProofData };
      }
    };
    this.impureCircuits = {
      createListing: this.circuits.createListing,
      applyToListing: this.circuits.applyToListing,
      acceptApplicant: this.circuits.acceptApplicant,
      proveQualification: this.circuits.proveQualification,
      getListingDetails: this.circuits.getListingDetails,
      hasApplied: this.circuits.hasApplied,
      getApplicationStatus: this.circuits.getApplicationStatus
    };
  }
  initialState(...args_0) {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 1 argument (as invoked from Typescript), received ${args_0.length}`);
    }
    const constructorContext_0 = args_0[0];
    if (typeof(constructorContext_0) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'constructorContext' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!('initialPrivateState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialPrivateState' in argument 1 (as invoked from Typescript)`);
    }
    if (!('initialZswapLocalState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript)`);
    }
    if (typeof(constructorContext_0.initialZswapLocalState) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript) to be an object`);
    }
    const state_0 = new __compactRuntime.ContractState();
    let stateValue_0 = __compactRuntime.StateValue.newArray();
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    state_0.data = stateValue_0;
    state_0.setOperation('createListing', new __compactRuntime.ContractOperation());
    state_0.setOperation('applyToListing', new __compactRuntime.ContractOperation());
    state_0.setOperation('acceptApplicant', new __compactRuntime.ContractOperation());
    state_0.setOperation('proveQualification', new __compactRuntime.ContractOperation());
    state_0.setOperation('getListingDetails', new __compactRuntime.ContractOperation());
    state_0.setOperation('hasApplied', new __compactRuntime.ContractOperation());
    state_0.setOperation('getApplicationStatus', new __compactRuntime.ContractOperation());
    const context = {
      originalState: state_0,
      currentPrivateState: constructorContext_0.initialPrivateState,
      currentZswapLocalState: constructorContext_0.initialZswapLocalState,
      transactionContext: new __compactRuntime.QueryContext(state_0.data, __compactRuntime.dummyContractAddress())
    };
    const partialProofData = {
      input: { value: [], alignment: [] },
      output: undefined,
      publicTranscript: [],
      privateTranscriptOutputs: []
    };
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_10.toValue(0n),
                                                                            alignment: _descriptor_10.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_10.toValue(1n),
                                                                            alignment: _descriptor_10.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_10.toValue(2n),
                                                                            alignment: _descriptor_10.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(0n),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    state_0.data = context.transactionContext.state;
    return {
      currentContractState: state_0,
      currentPrivateState: context.currentPrivateState,
      currentZswapLocalState: context.currentZswapLocalState
    }
  }
  _persistentHash_0(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_8, value_0);
    return result_0;
  }
  _getTenantIncome_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.witnessContext(ledger(context.transactionContext.state), context.currentPrivateState, context.transactionContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.getTenantIncome(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(typeof(result_0) === 'bigint' && result_0 >= 0n && result_0 <= 18446744073709551615n)) {
      __compactRuntime.type_error('getTenantIncome',
                                  'return value',
                                  'PrivateRent.compact line 34 char 1',
                                  'Uint<0..18446744073709551615>',
                                  result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_0.toValue(result_0),
      alignment: _descriptor_0.alignment()
    });
    return result_0;
  }
  _getTenantCredit_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.witnessContext(ledger(context.transactionContext.state), context.currentPrivateState, context.transactionContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.getTenantCredit(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(typeof(result_0) === 'bigint' && result_0 >= 0n && result_0 <= 18446744073709551615n)) {
      __compactRuntime.type_error('getTenantCredit',
                                  'return value',
                                  'PrivateRent.compact line 35 char 1',
                                  'Uint<0..18446744073709551615>',
                                  result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_0.toValue(result_0),
      alignment: _descriptor_0.alignment()
    });
    return result_0;
  }
  _getTenantContactInfo_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.witnessContext(ledger(context.transactionContext.state), context.currentPrivateState, context.transactionContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.getTenantContactInfo(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_6.toValue(result_0),
      alignment: _descriptor_6.alignment()
    });
    return result_0;
  }
  _getSecretKey_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.witnessContext(ledger(context.transactionContext.state), context.currentPrivateState, context.transactionContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.getSecretKey(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(result_0.buffer instanceof ArrayBuffer && result_0.BYTES_PER_ELEMENT === 1 && result_0.length === 32)) {
      __compactRuntime.type_error('getSecretKey',
                                  'return value',
                                  'PrivateRent.compact line 37 char 1',
                                  'Bytes<32>',
                                  result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_1.toValue(result_0),
      alignment: _descriptor_1.alignment()
    });
    return result_0;
  }
  _publicKey_0(sk_0) {
    return this._persistentHash_0([new Uint8Array([114, 101, 110, 116, 97, 108, 58, 112, 107, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                   sk_0]);
  }
  _createListing_0(context, partialProofData, rent_0, minIncome_0, minCredit_0)
  {
    const sk_0 = this._getSecretKey_0(context, partialProofData);
    const landlordPk_0 = this._publicKey_0(sk_0);
    const listingId_0 = _descriptor_0.fromValue(Contract._query(context,
                                                                partialProofData,
                                                                [
                                                                 { dup: { n: 0 } },
                                                                 { idx: { cached: false,
                                                                          pushPath: false,
                                                                          path: [
                                                                                 { tag: 'value',
                                                                                   value: { value: _descriptor_10.toValue(2n),
                                                                                            alignment: _descriptor_10.alignment() } }] } },
                                                                 { popeq: { cached: true,
                                                                            result: undefined } }]).value);
    const listing_0 = { landlord: landlordPk_0,
                        rent: rent_0,
                        minIncome: minIncome_0,
                        minCredit: minCredit_0,
                        isActive: true };
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_10.toValue(0n),
                                                alignment: _descriptor_10.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(listingId_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(listing_0),
                                                                            alignment: _descriptor_5.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_10.toValue(1n),
                                                alignment: _descriptor_10.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(listingId_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    const tmp_0 = 1n;
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_10.toValue(2n),
                                                alignment: _descriptor_10.alignment() } }] } },
                     { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                            { value: _descriptor_7.toValue(tmp_0),
                                              alignment: _descriptor_7.alignment() }
                                              .value
                                          )) } },
                     { ins: { cached: true, n: 1 } }]);
    return listingId_0;
  }
  _applyToListing_0(context, partialProofData, listingId_0) {
    __compactRuntime.assert(_descriptor_4.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_10.toValue(0n),
                                                                                                alignment: _descriptor_10.alignment() } }] } },
                                                                     { push: { storage: false,
                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(listingId_0),
                                                                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                                                                     'member',
                                                                     { popeq: { cached: true,
                                                                                result: undefined } }]).value),
                            'Listing does not exist');
    const listing_0 = _descriptor_5.fromValue(Contract._query(context,
                                                              partialProofData,
                                                              [
                                                               { dup: { n: 0 } },
                                                               { idx: { cached: false,
                                                                        pushPath: false,
                                                                        path: [
                                                                               { tag: 'value',
                                                                                 value: { value: _descriptor_10.toValue(0n),
                                                                                          alignment: _descriptor_10.alignment() } }] } },
                                                               { idx: { cached: false,
                                                                        pushPath: false,
                                                                        path: [
                                                                               { tag: 'value',
                                                                                 value: { value: _descriptor_0.toValue(listingId_0),
                                                                                          alignment: _descriptor_0.alignment() } }] } },
                                                               { popeq: { cached: false,
                                                                          result: undefined } }]).value);
    __compactRuntime.assert(listing_0.isActive, 'Listing is not active');
    const sk_0 = this._getSecretKey_0(context, partialProofData);
    const tenantPk_0 = this._publicKey_0(sk_0);
    const income_0 = this._getTenantIncome_0(context, partialProofData);
    const credit_0 = this._getTenantCredit_0(context, partialProofData);
    const meetsIncomeReq_0 = income_0 >= listing_0.minIncome;
    const meetsCreditReq_0 = credit_0 >= listing_0.minCredit;
    __compactRuntime.assert(meetsIncomeReq_0, 'Income requirement not met');
    __compactRuntime.assert(meetsCreditReq_0, 'Credit requirement not met');
    const applicant_0 = { tenant: tenantPk_0, status: 1, applicationTime: 0n };
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_10.toValue(1n),
                                                alignment: _descriptor_10.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_0.toValue(listingId_0),
                                                alignment: _descriptor_0.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(tenantPk_0),
                                                                            alignment: _descriptor_1.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(applicant_0),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _acceptApplicant_0(context, partialProofData, listingId_0, tenantPk_0) {
    const sk_0 = this._getSecretKey_0(context, partialProofData);
    const landlordPk_0 = this._publicKey_0(sk_0);
    const listing_0 = _descriptor_5.fromValue(Contract._query(context,
                                                              partialProofData,
                                                              [
                                                               { dup: { n: 0 } },
                                                               { idx: { cached: false,
                                                                        pushPath: false,
                                                                        path: [
                                                                               { tag: 'value',
                                                                                 value: { value: _descriptor_10.toValue(0n),
                                                                                          alignment: _descriptor_10.alignment() } }] } },
                                                               { idx: { cached: false,
                                                                        pushPath: false,
                                                                        path: [
                                                                               { tag: 'value',
                                                                                 value: { value: _descriptor_0.toValue(listingId_0),
                                                                                          alignment: _descriptor_0.alignment() } }] } },
                                                               { popeq: { cached: false,
                                                                          result: undefined } }]).value);
    __compactRuntime.assert(this._equal_0(listing_0.landlord, landlordPk_0),
                            'Only landlord can accept applicants');
    __compactRuntime.assert(_descriptor_4.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_10.toValue(1n),
                                                                                                alignment: _descriptor_10.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_0.toValue(listingId_0),
                                                                                                alignment: _descriptor_0.alignment() } }] } },
                                                                     { push: { storage: false,
                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(tenantPk_0),
                                                                                                                            alignment: _descriptor_1.alignment() }).encode() } },
                                                                     'member',
                                                                     { popeq: { cached: true,
                                                                                result: undefined } }]).value),
                            'Applicant not found');
    const applicant_0 = _descriptor_3.fromValue(Contract._query(context,
                                                                partialProofData,
                                                                [
                                                                 { dup: { n: 0 } },
                                                                 { idx: { cached: false,
                                                                          pushPath: false,
                                                                          path: [
                                                                                 { tag: 'value',
                                                                                   value: { value: _descriptor_10.toValue(1n),
                                                                                            alignment: _descriptor_10.alignment() } },
                                                                                 { tag: 'value',
                                                                                   value: { value: _descriptor_0.toValue(listingId_0),
                                                                                            alignment: _descriptor_0.alignment() } }] } },
                                                                 { idx: { cached: false,
                                                                          pushPath: false,
                                                                          path: [
                                                                                 { tag: 'value',
                                                                                   value: { value: _descriptor_1.toValue(tenantPk_0),
                                                                                            alignment: _descriptor_1.alignment() } }] } },
                                                                 { popeq: { cached: false,
                                                                            result: undefined } }]).value);
    __compactRuntime.assert(applicant_0.status === 1, 'Applicant not qualified');
    const updatedApplicant_0 = { tenant: applicant_0.tenant,
                                 status: 3,
                                 applicationTime: applicant_0.applicationTime };
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_10.toValue(1n),
                                                alignment: _descriptor_10.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_0.toValue(listingId_0),
                                                alignment: _descriptor_0.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(tenantPk_0),
                                                                            alignment: _descriptor_1.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(updatedApplicant_0),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    return this._getTenantContactInfo_0(context, partialProofData);
  }
  _proveQualification_0(context, partialProofData, listingId_0) {
    const listing_0 = _descriptor_5.fromValue(Contract._query(context,
                                                              partialProofData,
                                                              [
                                                               { dup: { n: 0 } },
                                                               { idx: { cached: false,
                                                                        pushPath: false,
                                                                        path: [
                                                                               { tag: 'value',
                                                                                 value: { value: _descriptor_10.toValue(0n),
                                                                                          alignment: _descriptor_10.alignment() } }] } },
                                                               { idx: { cached: false,
                                                                        pushPath: false,
                                                                        path: [
                                                                               { tag: 'value',
                                                                                 value: { value: _descriptor_0.toValue(listingId_0),
                                                                                          alignment: _descriptor_0.alignment() } }] } },
                                                               { popeq: { cached: false,
                                                                          result: undefined } }]).value);
    const income_0 = this._getTenantIncome_0(context, partialProofData);
    const credit_0 = this._getTenantCredit_0(context, partialProofData);
    return income_0 >= listing_0.minIncome && credit_0 >= listing_0.minCredit;
  }
  _getListingDetails_0(context, partialProofData, listingId_0) {
    __compactRuntime.assert(_descriptor_4.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_10.toValue(0n),
                                                                                                alignment: _descriptor_10.alignment() } }] } },
                                                                     { push: { storage: false,
                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(listingId_0),
                                                                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                                                                     'member',
                                                                     { popeq: { cached: true,
                                                                                result: undefined } }]).value),
                            'Listing does not exist');
    return _descriptor_5.fromValue(Contract._query(context,
                                                   partialProofData,
                                                   [
                                                    { dup: { n: 0 } },
                                                    { idx: { cached: false,
                                                             pushPath: false,
                                                             path: [
                                                                    { tag: 'value',
                                                                      value: { value: _descriptor_10.toValue(0n),
                                                                               alignment: _descriptor_10.alignment() } }] } },
                                                    { idx: { cached: false,
                                                             pushPath: false,
                                                             path: [
                                                                    { tag: 'value',
                                                                      value: { value: _descriptor_0.toValue(listingId_0),
                                                                               alignment: _descriptor_0.alignment() } }] } },
                                                    { popeq: { cached: false,
                                                               result: undefined } }]).value);
  }
  _hasApplied_0(context, partialProofData, listingId_0) {
    const sk_0 = this._getSecretKey_0(context, partialProofData);
    const tenantPk_0 = this._publicKey_0(sk_0);
    if (!_descriptor_4.fromValue(Contract._query(context,
                                                 partialProofData,
                                                 [
                                                  { dup: { n: 0 } },
                                                  { idx: { cached: false,
                                                           pushPath: false,
                                                           path: [
                                                                  { tag: 'value',
                                                                    value: { value: _descriptor_10.toValue(1n),
                                                                             alignment: _descriptor_10.alignment() } }] } },
                                                  { push: { storage: false,
                                                            value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(listingId_0),
                                                                                                         alignment: _descriptor_0.alignment() }).encode() } },
                                                  'member',
                                                  { popeq: { cached: true,
                                                             result: undefined } }]).value))
    {
      return false;
    } else {
      return _descriptor_4.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_10.toValue(1n),
                                                                                 alignment: _descriptor_10.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_0.toValue(listingId_0),
                                                                                 alignment: _descriptor_0.alignment() } }] } },
                                                      { push: { storage: false,
                                                                value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(tenantPk_0),
                                                                                                             alignment: _descriptor_1.alignment() }).encode() } },
                                                      'member',
                                                      { popeq: { cached: true,
                                                                 result: undefined } }]).value);
    }
  }
  _getApplicationStatus_0(context, partialProofData, listingId_0) {
    const sk_0 = this._getSecretKey_0(context, partialProofData);
    const tenantPk_0 = this._publicKey_0(sk_0);
    __compactRuntime.assert(_descriptor_4.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_10.toValue(1n),
                                                                                                alignment: _descriptor_10.alignment() } }] } },
                                                                     { push: { storage: false,
                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(listingId_0),
                                                                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                                                                     'member',
                                                                     { popeq: { cached: true,
                                                                                result: undefined } }]).value),
                            'No applications for this listing');
    __compactRuntime.assert(_descriptor_4.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_10.toValue(1n),
                                                                                                alignment: _descriptor_10.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_0.toValue(listingId_0),
                                                                                                alignment: _descriptor_0.alignment() } }] } },
                                                                     { push: { storage: false,
                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(tenantPk_0),
                                                                                                                            alignment: _descriptor_1.alignment() }).encode() } },
                                                                     'member',
                                                                     { popeq: { cached: true,
                                                                                result: undefined } }]).value),
                            'You have not applied to this listing');
    const applicant_0 = _descriptor_3.fromValue(Contract._query(context,
                                                                partialProofData,
                                                                [
                                                                 { dup: { n: 0 } },
                                                                 { idx: { cached: false,
                                                                          pushPath: false,
                                                                          path: [
                                                                                 { tag: 'value',
                                                                                   value: { value: _descriptor_10.toValue(1n),
                                                                                            alignment: _descriptor_10.alignment() } },
                                                                                 { tag: 'value',
                                                                                   value: { value: _descriptor_0.toValue(listingId_0),
                                                                                            alignment: _descriptor_0.alignment() } }] } },
                                                                 { idx: { cached: false,
                                                                          pushPath: false,
                                                                          path: [
                                                                                 { tag: 'value',
                                                                                   value: { value: _descriptor_1.toValue(tenantPk_0),
                                                                                            alignment: _descriptor_1.alignment() } }] } },
                                                                 { popeq: { cached: false,
                                                                            result: undefined } }]).value);
    return applicant_0.status;
  }
  _equal_0(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  static _query(context, partialProofData, prog) {
    var res;
    try {
      res = context.transactionContext.query(prog, __compactRuntime.CostModel.dummyCostModel());
    } catch (err) {
      throw new __compactRuntime.CompactError(err.toString());
    }
    context.transactionContext = res.context;
    var reads = res.events.filter((e) => e.tag === 'read');
    var i = 0;
    partialProofData.publicTranscript = partialProofData.publicTranscript.concat(prog.map((op) => {
      if(typeof(op) === 'object' && 'popeq' in op) {
        return { popeq: {
          ...op.popeq,
          result: reads[i++].content,
        } };
      } else {
        return op;
      }
    }));
    if(res.events.length == 1 && res.events[0].tag === 'read') {
      return res.events[0].content;
    } else {
      return res.events;
    }
  }
}
function ledger(state) {
  const context = {
    originalState: state,
    transactionContext: new __compactRuntime.QueryContext(state, __compactRuntime.dummyContractAddress())
  };
  const partialProofData = {
    input: { value: [], alignment: [] },
    output: undefined,
    publicTranscript: [],
    privateTranscriptOutputs: []
  };
  return {
    listings: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_4.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_10.toValue(0n),
                                                                                   alignment: _descriptor_10.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(0n),
                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_0.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_10.toValue(0n),
                                                                                   alignment: _descriptor_10.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'PrivateRent.compact line 29 char 1',
                                      'Uint<0..18446744073709551615>',
                                      key_0)
        }
        return _descriptor_4.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_10.toValue(0n),
                                                                                   alignment: _descriptor_10.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'PrivateRent.compact line 29 char 1',
                                      'Uint<0..18446744073709551615>',
                                      key_0)
        }
        return _descriptor_5.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_10.toValue(0n),
                                                                                   alignment: _descriptor_10.alignment() } }] } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_0.toValue(key_0),
                                                                                   alignment: _descriptor_0.alignment() } }] } },
                                                        { popeq: { cached: false,
                                                                   result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[0];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_5.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    applicants: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_4.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_10.toValue(1n),
                                                                                   alignment: _descriptor_10.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(0n),
                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_0.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_10.toValue(1n),
                                                                                   alignment: _descriptor_10.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'PrivateRent.compact line 30 char 1',
                                      'Uint<0..18446744073709551615>',
                                      key_0)
        }
        return _descriptor_4.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_10.toValue(1n),
                                                                                   alignment: _descriptor_10.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'PrivateRent.compact line 30 char 1',
                                      'Uint<0..18446744073709551615>',
                                      key_0)
        }
        if (state.asArray()[1].asMap().get({ value: _descriptor_0.toValue(key_0),
                                             alignment: _descriptor_0.alignment() }) === undefined) {
          throw new __compactRuntime.CompactError(`Map value undefined for ${key_0}`);
        }
        return {
          isEmpty(...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_1.length}`);
            }
            return _descriptor_4.fromValue(Contract._query(context,
                                                           partialProofData,
                                                           [
                                                            { dup: { n: 0 } },
                                                            { idx: { cached: false,
                                                                     pushPath: false,
                                                                     path: [
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_10.toValue(1n),
                                                                                       alignment: _descriptor_10.alignment() } },
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_0.toValue(key_0),
                                                                                       alignment: _descriptor_0.alignment() } }] } },
                                                            'size',
                                                            { push: { storage: false,
                                                                      value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(0n),
                                                                                                                   alignment: _descriptor_0.alignment() }).encode() } },
                                                            'eq',
                                                            { popeq: { cached: true,
                                                                       result: undefined } }]).value);
          },
          size(...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_1.length}`);
            }
            return _descriptor_0.fromValue(Contract._query(context,
                                                           partialProofData,
                                                           [
                                                            { dup: { n: 0 } },
                                                            { idx: { cached: false,
                                                                     pushPath: false,
                                                                     path: [
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_10.toValue(1n),
                                                                                       alignment: _descriptor_10.alignment() } },
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_0.toValue(key_0),
                                                                                       alignment: _descriptor_0.alignment() } }] } },
                                                            'size',
                                                            { popeq: { cached: true,
                                                                       result: undefined } }]).value);
          },
          member(...args_1) {
            if (args_1.length !== 1) {
              throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_1.length}`);
            }
            const key_1 = args_1[0];
            if (!(key_1.buffer instanceof ArrayBuffer && key_1.BYTES_PER_ELEMENT === 1 && key_1.length === 32)) {
              __compactRuntime.type_error('member',
                                          'argument 1',
                                          'PrivateRent.compact line 30 char 41',
                                          'Bytes<32>',
                                          key_1)
            }
            return _descriptor_4.fromValue(Contract._query(context,
                                                           partialProofData,
                                                           [
                                                            { dup: { n: 0 } },
                                                            { idx: { cached: false,
                                                                     pushPath: false,
                                                                     path: [
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_10.toValue(1n),
                                                                                       alignment: _descriptor_10.alignment() } },
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_0.toValue(key_0),
                                                                                       alignment: _descriptor_0.alignment() } }] } },
                                                            { push: { storage: false,
                                                                      value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(key_1),
                                                                                                                   alignment: _descriptor_1.alignment() }).encode() } },
                                                            'member',
                                                            { popeq: { cached: true,
                                                                       result: undefined } }]).value);
          },
          lookup(...args_1) {
            if (args_1.length !== 1) {
              throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_1.length}`);
            }
            const key_1 = args_1[0];
            if (!(key_1.buffer instanceof ArrayBuffer && key_1.BYTES_PER_ELEMENT === 1 && key_1.length === 32)) {
              __compactRuntime.type_error('lookup',
                                          'argument 1',
                                          'PrivateRent.compact line 30 char 41',
                                          'Bytes<32>',
                                          key_1)
            }
            return _descriptor_3.fromValue(Contract._query(context,
                                                           partialProofData,
                                                           [
                                                            { dup: { n: 0 } },
                                                            { idx: { cached: false,
                                                                     pushPath: false,
                                                                     path: [
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_10.toValue(1n),
                                                                                       alignment: _descriptor_10.alignment() } },
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_0.toValue(key_0),
                                                                                       alignment: _descriptor_0.alignment() } }] } },
                                                            { idx: { cached: false,
                                                                     pushPath: false,
                                                                     path: [
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_1.toValue(key_1),
                                                                                       alignment: _descriptor_1.alignment() } }] } },
                                                            { popeq: { cached: false,
                                                                       result: undefined } }]).value);
          },
          [Symbol.iterator](...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_1.length}`);
            }
            const self_0 = state.asArray()[1].asMap().get({ value: _descriptor_0.toValue(key_0),
                                                            alignment: _descriptor_0.alignment() });
            return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_1.fromValue(key.value),      _descriptor_3.fromValue(value.value)    ];  })[Symbol.iterator]();
          }
        }
      }
    },
    get nextListingId() {
      return _descriptor_0.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_10.toValue(2n),
                                                                                 alignment: _descriptor_10.alignment() } }] } },
                                                      { popeq: { cached: true,
                                                                 result: undefined } }]).value);
    }
  };
}
const _emptyContext = {
  originalState: new __compactRuntime.ContractState(),
  transactionContext: new __compactRuntime.QueryContext(new __compactRuntime.ContractState().data, __compactRuntime.dummyContractAddress())
};
const _dummyContract = new Contract({
  getTenantIncome: (...args) => undefined,
  getTenantCredit: (...args) => undefined,
  getTenantContactInfo: (...args) => undefined,
  getSecretKey: (...args) => undefined
});
const pureCircuits = {};
const contractReferenceLocations = { tag: 'publicLedgerArray', indices: { } };
exports.Contract = Contract;
exports.ledger = ledger;
exports.pureCircuits = pureCircuits;
exports.contractReferenceLocations = contractReferenceLocations;
//# sourceMappingURL=index.cjs.map
