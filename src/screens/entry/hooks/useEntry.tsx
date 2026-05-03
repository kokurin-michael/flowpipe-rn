import {useQueryClient} from '@tanstack/react-query';

// import {getGetExtractInfoQueryOptions} from '@api/orval/flowPipeAPI';

export const useEntry = () => {
  const queryClient = useQueryClient();
  // const {isPending, data, isError, error} = useGetExtractInfo(
  //   {
  //     url: url,
  //   },
  //   {query: {enabled: url.trim() !== ''}},
  // );

  const onDownloadPress = (url?: string) => {
    if (url && url.trim() !== '') {
      // queryClient.fetchQuery(getGetExtractInfoQueryOptions({url}));
    }
  };

  return {
    onDownloadPress,
  };
};
