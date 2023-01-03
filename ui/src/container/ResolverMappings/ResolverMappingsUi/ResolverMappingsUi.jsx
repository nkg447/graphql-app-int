import * as React from "react";
import { useAtom } from "jotai";
import Store from "../../../store/store";
import QueryResolvers from "./QueryResolvers/QueryResolvers";
import { cloneDeep } from "lodash";

function ResolverMappingsUi(props) {
  const [resolverMappings, setResolverMappings] = useAtom(
    Store.resolverMappingsAtom
  );

  const updateResolverMappings = () => {
    setResolverMappings(cloneDeep(resolverMappings));
  };

  return (
    <div>
      <QueryResolvers
        queryResolvers={resolverMappings.queryResolvers}
        updateResolverMappings={updateResolverMappings}
      />
    </div>
  );
}
ResolverMappingsUi.propTypes = {};

export default ResolverMappingsUi;
