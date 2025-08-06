'use client'

import {
  ClientSideRowModelModule,
  ColDef,
  GridReadyEvent,
  InfiniteRowModelModule,
  ModuleRegistry,
  SortChangedEvent,
} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import { AgGridReact } from 'ag-grid-react'
import debounce from 'lodash/debounce'
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  InfiniteRowModelModule,
])

type Props<T = any> = {
  columnDefs: ColDef[]
  fetchData: (params: {
    page: number
    pageSize: number
    filters?: any
  }) => Promise<{
    data: T[]
    total: number
    page: number
  }>
  filters?: any
  pageSize?: number
  rowHeight?: number
  className?: string
}

const AbstractAgGrid = forwardRef(<T,>({
  columnDefs,
  fetchData,
  filters = {},
  pageSize = 50,
  rowHeight = 48,
  className = 'ag-theme-alpine',
}: Props<T>, ref: any) => {
  const gridRef = useRef<AgGridReact>(null)
  const [load, setLoad] = useState(false)


  const filtersRef = useRef(filters)

  useEffect(() => {
    filtersRef.current = filters
  }, [filters])

  const debouncedFetch = useRef(
    debounce(
      async (
        params: any,
        page: number,
        pageSize: number,
        successCallback: (a: any, b: any) => any,
        failCallback: () => any,
        _filters: any
      ) => {
        try {
          setLoad(true)
          const response = await fetchData({
            page,
            pageSize,
            filters: _filters,
          })

          const { data, total } = response
          const lastRow = params.endRow >= total ? total : -1
          successCallback(data, lastRow)
          if (!data || data.length === 0) {
            params?.api?.showNoRowsOverlay()
          } else {

          }


        } catch (error) {
          console.error('❌ Erro na chamada da API:', error)
          failCallback()
        } finally {
          setLoad(false)
        }
      },
      800
    )
  ).current

  const createDataSource = () => ({
    getRows: async (gridParams: any) => {
      const activeFilters = filtersRef.current
      const currentPage = Math.floor(gridParams.startRow / pageSize) + 1

      gridParams?.api?.showLoadingOverlay()

      debouncedFetch(
        gridParams,
        currentPage,
        pageSize,
        (rows, lastRow) => {
          gridParams.successCallback(rows, lastRow)

        },
        () => {
          gridParams.failCallback()

        },
        activeFilters
      )
    },

  })

  const onGridReady = (params: GridReadyEvent) => {
    params.api.setGridOption('datasource', createDataSource())
  }


  useImperativeHandle(ref, () => ({
    refresh: () => {
      gridRef.current?.api?.setGridOption('datasource', createDataSource());
    },
  }));

  const handleSort = (param: SortChangedEvent<any, any>) => {
    param?.columns?.map(column => {
      const columnName = column.getId()
      console.log(columnName)
    })
  }

  useEffect(() => {
    if (gridRef.current?.api) {
      gridRef.current.api.setGridOption('datasource', createDataSource())
    }
  }, [filters])

  return (
    <div style={{ height: '600px', width: '100%' }} className={className}>
      <AgGridReact
        onSortChanged={handleSort}
        ref={gridRef}
        columnDefs={columnDefs}
        rowModelType="infinite"
        cacheBlockSize={pageSize}
        rowHeight={rowHeight}
        onGridReady={onGridReady}
        pagination={false}
        animateRows
        cellSelection={true}
        copyHeadersToClipboard={true}
        suppressNoRowsOverlay={false}
        overlayNoRowsTemplate={`
          <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%;">
            <p style="color: #888; font-size: 16px;">Nenhum dado encontrado</p>
          </div>
        `}
        loading={load}
        overlayLoadingTemplate={'<div class="text-center"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div><h4 class="text-muted">Carregando dados</h4></div>'}
      />
    </div >
  )
})

export default AbstractAgGrid
