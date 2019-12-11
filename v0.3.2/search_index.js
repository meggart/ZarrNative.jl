var documenterSearchIndex = {"docs":
[{"location":"storage/#Developing-new-storage-backends-1","page":"Storage Backends","title":"Developing new storage backends","text":"","category":"section"},{"location":"storage/#","page":"Storage Backends","title":"Storage Backends","text":"One advantage of the zarr data model is that it can be used in combiantion with a variety of storage backends. Currently in this package there is support for a DictStore (keeping data in memory), DirectoryStore (writing data to a local disk) and an S3Store for S3-compatible object store which is currently read-only. In oder to implement a new storage backend, you would have to create a subtype of Zarr.AbstractStore and implement the following methods:","category":"page"},{"location":"storage/#","page":"Storage Backends","title":"Storage Backends","text":"CurrentModule = Zarr","category":"page"},{"location":"storage/#","page":"Storage Backends","title":"Storage Backends","text":"storagesize\nzname\nBase.getindex(d::AbstractStore,i::String)\nBase.setindex!(d::AbstractStore,v,i::String)\nsubdirs\nBase.keys(d::AbstractStore)\nnewsub\ngetsub","category":"page"},{"location":"storage/#Zarr.storagesize","page":"Storage Backends","title":"Zarr.storagesize","text":"storagesize(d::AbstractStore)\n\nThis function shall return the size of all data files in a store.\n\n\n\n\n\n","category":"function"},{"location":"storage/#Zarr.zname","page":"Storage Backends","title":"Zarr.zname","text":"zname(d::AbstractStore)\n\nReturns the name of the current variable.\n\n\n\n\n\n","category":"function"},{"location":"storage/#Base.getindex-Tuple{Zarr.AbstractStore,String}","page":"Storage Backends","title":"Base.getindex","text":"Base.getindex(d::AbstractStore,i::String)\n\nReturns the data stored in the given key as a Vector{UInt8}\n\n\n\n\n\n","category":"method"},{"location":"storage/#Base.setindex!-Tuple{Zarr.AbstractStore,Any,String}","page":"Storage Backends","title":"Base.setindex!","text":"Base.setindex!(d::AbstractStore,v,i::String)\n\nWrites the values in v to the given store and key.\n\n\n\n\n\n","category":"method"},{"location":"storage/#Zarr.subdirs","page":"Storage Backends","title":"Zarr.subdirs","text":"subdirs(d::AbstractStore)\n\nReturns a list of keys for children stores in the given store.\n\n\n\n\n\n","category":"function"},{"location":"storage/#Base.keys-Tuple{Zarr.AbstractStore}","page":"Storage Backends","title":"Base.keys","text":"Base.keys(d::AbstractStore)\n\nReturns the keys of files in the given store.\n\n\n\n\n\n","category":"method"},{"location":"storage/#Zarr.newsub","page":"Storage Backends","title":"Zarr.newsub","text":"newsub(d::AbstractStore, name::String)\n\nCreate a new Store as a child of the given store d with given name. Returns the new created substore.\n\n\n\n\n\n","category":"function"},{"location":"storage/#Zarr.getsub","page":"Storage Backends","title":"Zarr.getsub","text":"getsub(d::AbstractStore, name::String)\n\nReturns the child store of name name.\n\n\n\n\n\n","category":"function"},{"location":"storage/#","page":"Storage Backends","title":"Storage Backends","text":"You can get some inspiration on how to implement this by looking at the source code of existing storage backends.","category":"page"},{"location":"s3examples/#Some-examples-on-how-to-access-public-S3-datasets-1","page":"Accessing cloud data Examples","title":"Some examples on how to access public S3 datasets","text":"","category":"section"},{"location":"s3examples/#","page":"Accessing cloud data Examples","title":"Accessing cloud data Examples","text":"With this package it is possible to access public datasets that are hosted remotely on a s3-compatible cloud store. Here we provide examples on how to read data from commonly used datasets.","category":"page"},{"location":"s3examples/#Accessing-data-on-Amazon-S3-1","page":"Accessing cloud data Examples","title":"Accessing data on Amazon S3","text":"","category":"section"},{"location":"s3examples/#","page":"Accessing cloud data Examples","title":"Accessing cloud data Examples","text":"First we show how to access the zarr-demo bucket on AWS S3. We have to setup a AWS configuration first, for options look at the documentation of AWSCore.jl. If you don't have an account, you can access the dataset without credentials as follows:","category":"page"},{"location":"s3examples/#","page":"Accessing cloud data Examples","title":"Accessing cloud data Examples","text":"using Zarr, AWSCore\nregion = \"eu-west-2\"\naws = aws_config(creds=nothing, region = region)","category":"page"},{"location":"s3examples/#","page":"Accessing cloud data Examples","title":"Accessing cloud data Examples","text":"Then we can create an S3Store based on the known bucket name and store base path.","category":"page"},{"location":"s3examples/#","page":"Accessing cloud data Examples","title":"Accessing cloud data Examples","text":"bucket = \"zarr-demo\"\nstore = \"store/foo/bar\"\nS3 = S3Store(bucket, store, aws = aws)","category":"page"},{"location":"s3examples/#","page":"Accessing cloud data Examples","title":"Accessing cloud data Examples","text":"Let's find out what is actually stored in there:","category":"page"},{"location":"s3examples/#","page":"Accessing cloud data Examples","title":"Accessing cloud data Examples","text":"z = zopen(S3)","category":"page"},{"location":"s3examples/#","page":"Accessing cloud data Examples","title":"Accessing cloud data Examples","text":"So we see that the store points to a zarr group with a single variable baz.","category":"page"},{"location":"s3examples/#","page":"Accessing cloud data Examples","title":"Accessing cloud data Examples","text":"v = z[\"baz\"]","category":"page"},{"location":"s3examples/#","page":"Accessing cloud data Examples","title":"Accessing cloud data Examples","text":"The variable seems to contain an ASCIIString.","category":"page"},{"location":"s3examples/#","page":"Accessing cloud data Examples","title":"Accessing cloud data Examples","text":"String(v[:])","category":"page"},{"location":"s3examples/#Accessing-CMIP6-data-on-GCS-1","page":"Accessing cloud data Examples","title":"Accessing CMIP6 data on GCS","text":"","category":"section"},{"location":"s3examples/#","page":"Accessing cloud data Examples","title":"Accessing cloud data Examples","text":"GCS is hosting a subset of the CMIP6 climate model ensemble runs. The data is stored in zarr format and accessible using this package. We first have to create an anonymous config again to access the data:","category":"page"},{"location":"s3examples/#","page":"Accessing cloud data Examples","title":"Accessing cloud data Examples","text":"using Zarr, AWSCore\naws_google = AWSCore.aws_config(creds=nothing, region=\"\", service_host=\"googleapis.com\", service_name=\"storage\")\ncmip6_base = S3Store(\"cmip6\",\"\", aws = aws_google, listversion=1)\nkeys(cmip6_base)","category":"page"},{"location":"s3examples/#","page":"Accessing cloud data Examples","title":"Accessing cloud data Examples","text":"8-element Array{String,1}:\n \"cmip6-zarr-consolidated-stores-noQC.csv\"\n \"cmip6-zarr-consolidated-stores.csv\"     \n \"cmip6.csv\"                              \n \"pangeo-cmip3.csv\"                       \n \"pangeo-cmip3.json\"                      \n \"pangeo-cmip5.csv\"                       \n \"pangeo-cmip5.json\"                      \n \"pangeo-cmip6.json\"                      ","category":"page"},{"location":"s3examples/#","page":"Accessing cloud data Examples","title":"Accessing cloud data Examples","text":"Looks like there is some configuration stored in these csv files. So let's read it into a DatFrame:","category":"page"},{"location":"s3examples/#","page":"Accessing cloud data Examples","title":"Accessing cloud data Examples","text":"using DataFrames, CSV\noverview = CSV.read(IOBuffer(cmip6_base[\"cmip6-zarr-consolidated-stores.csv\"]))","category":"page"},{"location":"s3examples/#","page":"Accessing cloud data Examples","title":"Accessing cloud data Examples","text":"138786×10 DataFrame. Omitted printing of 6 columns\n│ Row    │ activity_id │ institution_id │ source_id  │ experiment_id │\n│        │ String      │ String         │ String     │ String        │\n├────────┼─────────────┼────────────────┼────────────┼───────────────┤\n│ 1      │ AerChemMIP  │ BCC            │ BCC-ESM1   │ piClim-CH4    │\n│ 2      │ AerChemMIP  │ BCC            │ BCC-ESM1   │ piClim-CH4    │\n│ 3      │ AerChemMIP  │ BCC            │ BCC-ESM1   │ piClim-CH4    │\n│ 4      │ AerChemMIP  │ BCC            │ BCC-ESM1   │ piClim-CH4    │\n│ 5      │ AerChemMIP  │ BCC            │ BCC-ESM1   │ piClim-CH4    │\n│ 6      │ AerChemMIP  │ BCC            │ BCC-ESM1   │ piClim-CH4    │\n│ 7      │ AerChemMIP  │ BCC            │ BCC-ESM1   │ piClim-CH4    │\n⋮\n│ 138779 │ ScenarioMIP │ UA             │ MCM-UA-1-0 │ ssp585        │\n│ 138780 │ ScenarioMIP │ UA             │ MCM-UA-1-0 │ ssp585        │\n│ 138781 │ ScenarioMIP │ UA             │ MCM-UA-1-0 │ ssp585        │\n│ 138782 │ ScenarioMIP │ UA             │ MCM-UA-1-0 │ ssp585        │\n│ 138783 │ ScenarioMIP │ UA             │ MCM-UA-1-0 │ ssp585        │\n│ 138784 │ ScenarioMIP │ UA             │ MCM-UA-1-0 │ ssp585        │\n│ 138785 │ ScenarioMIP │ UA             │ MCM-UA-1-0 │ ssp585        │\n│ 138786 │ ScenarioMIP │ UA             │ MCM-UA-1-0 │ ssp585        │","category":"page"},{"location":"s3examples/#","page":"Accessing cloud data Examples","title":"Accessing cloud data Examples","text":"These columns contain the path to the store as well, so after some subsetting we can access the member run we are interested in:","category":"page"},{"location":"s3examples/#","page":"Accessing cloud data Examples","title":"Accessing cloud data Examples","text":"store = filter(overview) do row\n  row.activity_id == \"ScenarioMIP\" && row.institution_id==\"DKRZ\" && row.variable_id==\"tas\" && row.experiment_id==\"ssp585\"\nend\nstore.zstore[1]","category":"page"},{"location":"s3examples/#","page":"Accessing cloud data Examples","title":"Accessing cloud data Examples","text":"\"gs://cmip6/ScenarioMIP/DKRZ/MPI-ESM1-2-HR/ssp585/r1i1p1f1/Amon/tas/gn/\"","category":"page"},{"location":"s3examples/#","page":"Accessing cloud data Examples","title":"Accessing cloud data Examples","text":"So we can access the dataset and read some data from it:","category":"page"},{"location":"s3examples/#","page":"Accessing cloud data Examples","title":"Accessing cloud data Examples","text":"s = S3Store(\"cmip6\",\"ScenarioMIP/DKRZ/MPI-ESM1-2-HR/ssp585/r1i1p1f1/Amon/tas/gn/\", aws=aws_google, listversion=1)\ng = zopen(s)","category":"page"},{"location":"s3examples/#","page":"Accessing cloud data Examples","title":"Accessing cloud data Examples","text":"You can access the meta-information through g.attrs or for example read the first time slice through","category":"page"},{"location":"s3examples/#","page":"Accessing cloud data Examples","title":"Accessing cloud data Examples","text":"g[\"tas\"][:,:,1]","category":"page"},{"location":"s3examples/#","page":"Accessing cloud data Examples","title":"Accessing cloud data Examples","text":"384×192 reshape(::Array{Union{Missing, Float32},3}, 384, 192) with eltype Union{Missing, Float32}:\n 244.27   245.276  245.186  245.419  …  252.782  252.852  252.672  252.667\n 244.284  245.223  245.122  245.497     252.833  252.88   252.686  252.682\n 244.309  245.139  245.003  245.422     252.85   252.895  252.704  252.663\n 244.297  245.104  244.954  245.272     252.84   252.872  252.727  252.69\n 244.352  245.055  244.835  245.182     252.858  252.895  252.739  252.69\n 244.358  245.001  244.825  245.079  …  252.79   252.926  252.77   252.7  \n 244.34   244.924  244.79   245.104     252.778  252.907  252.768  252.672\n 244.348  244.87   244.737  245.112     252.756  252.928  252.755  252.712\n 244.339  244.803  244.684  245.223     252.741  252.911  252.78   252.706\n 244.383  244.723  244.649  245.005     252.729  252.842  252.78   252.719\n   ⋮                                 ⋱                      ⋮             \n 244.184  245.68   245.997  246.456  …  252.421  252.528  252.452  252.637\n 244.186  245.649  245.907  246.313     252.518  252.546  252.469  252.643\n 244.163  245.542  245.731  246.085     252.561  252.553  252.495  252.637\n 244.227  245.491  245.68   246.178     252.643  252.596  252.534  252.678\n 244.227  245.483  245.626  245.987     252.692  252.633  252.573  252.672\n 244.253  245.442  245.497  245.975  …  252.756  252.682  252.577  252.631\n 244.227  245.409  245.352  245.897     252.719  252.758  252.6    252.655\n 244.296  245.356  245.231  245.774     252.735  252.809  252.612  252.659\n 244.301  245.303  245.192  245.524     252.733  252.862  252.655  252.678","category":"page"},{"location":"reference/#Array-creation-1","page":"Function Reference","title":"Array creation","text":"","category":"section"},{"location":"reference/#","page":"Function Reference","title":"Function Reference","text":"zcreate\nzzeros","category":"page"},{"location":"reference/#Zarr.zcreate","page":"Function Reference","title":"Zarr.zcreate","text":"zcreate(T, dims...;kwargs)\n\nCreates a new empty zarr aray with element type T and array dimensions dims. The following keyword arguments are accepted:\n\npath=\"\" directory name to store a persistent array. If left empty, an in-memory array will be created\nname=\"\" name of the zarr array, defaults to the directory name\nstoragetype determines the storage to use, current options are DirectoryStore or DictStore\nchunks=dims size of the individual array chunks, must be a tuple of length length(dims)\nfill_value=nothing value to represent missing values\ncompressor=BloscCompressor() compressor type and properties\nattrs=Dict() a dict containing key-value pairs with metadata attributes associated to the array\nwriteable=true determines if the array is opened in read-only or write mode\n\n\n\n\n\nCreate a new subarray of the group g\n\n\n\n\n\n","category":"function"},{"location":"reference/#Zarr.zzeros","page":"Function Reference","title":"Zarr.zzeros","text":"zzeros(T, dims..., )\n\nCreates a zarr array and initializes all values with zero.\n\n\n\n\n\n","category":"function"},{"location":"reference/#Compressors-1","page":"Function Reference","title":"Compressors","text":"","category":"section"},{"location":"reference/#","page":"Function Reference","title":"Function Reference","text":"Zarr.BloscCompressor\nZarr.NoCompressor","category":"page"},{"location":"reference/#Zarr.BloscCompressor","page":"Function Reference","title":"Zarr.BloscCompressor","text":"BloscCompressor(;blocksize=0, clevel=5, cname=\"lz4\", shuffle=true)\n\nReturns a BloscCompressor struct that can serve as a Zarr array compressor. Keyword arguments are:\n\nclevel=5 the compression level, number between 0 (no compression) and 9 (max compression)\ncname=\"lz4\" compressor name, can be one of \"blosclz\", \"lz4\", and \"lz4hc\"\nshuffle=true enables/disables bit-shuffling\n\n\n\n\n\n","category":"type"},{"location":"reference/#Zarr.NoCompressor","page":"Function Reference","title":"Zarr.NoCompressor","text":"NoCompressor()\n\nCreates an object that can be passed to ZArray constructors without compression.\n\n\n\n\n\n","category":"type"},{"location":"#Zarr.jl-1","page":"Home","title":"Zarr.jl","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"Reading and Writing Zarr Datasets from Julia","category":"page"},{"location":"#Package-features-1","page":"Home","title":"Package features","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"This is a currently incomplete implementation of the Zarr specs v2. It is possible to read an write (compressed) chunked n-dimensional arrays to disk, memory and cloud storage backends. Have a look at the Tutorial for a quick start.","category":"page"},{"location":"#Manual-Outline-1","page":"Home","title":"Manual Outline","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"Pages = [\n    \"tutorial.md\",\n    \"storage.md\",\n    \"reference.md\",\n]\nDepth = 2","category":"page"},{"location":"#Index-1","page":"Home","title":"Index","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"CurrentModule = Zarr\nDocTestSetup  = quote\n    using Zarr\nend","category":"page"},{"location":"tutorial/#Tutorial-1","page":"Tutorial","title":"Tutorial","text":"","category":"section"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"Zarr provides classes and functions for working with N-dimensional arrays that behave like Julia arrays but whose data is divided into chunks and each chunk is compressed. If you are already familiar with HDF5 then Zarr arrays provide similar functionality, but with some additional flexibility. This tutorial is an attempt to recreate this  Python Zarr tutorial as closely as possible and some of the explanation text is just copied and modified from this source.","category":"page"},{"location":"tutorial/#Creating-an-in-memory-array-1","page":"Tutorial","title":"Creating an in-memory array","text":"","category":"section"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"Zarr has several functions for creating arrays. For example:","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"julia> using Zarr\n\njulia> z = zzeros(Int32,10000,10000,chunks=(1000,1000))\nZArray{Int32} of size 10000 x 10000","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"The code above creates a 2-dimensional array of 32-bit integers with 10000 rows and 10000 columns, divided into chunks where each chunk has 1000 rows and 1000 columns (and so there will be 100 chunks in total).","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"Other Array creation routines are [zcreate, zones and zfill].","category":"page"},{"location":"tutorial/#Reading-and-Writing-data-1","page":"Tutorial","title":"Reading and Writing data","text":"","category":"section"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"Zarr arrays support a similar interface to Julia arrays for reading and writing data, although they don't implement the all indexing methods of an AbstractArray yet. For example, the entire array can be filled with a scalar value:","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"julia> z[:] = 42\n42","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"Regions of the array can also be written to, e.g.:","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"julia> z[1,:]=1:10000;\n\njulia> z[:,1]=1:10000;","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"The contents of the array can be retrieved by slicing, which will load the requested region into memory as a Julia array, e.g.:","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"julia> z[1,1]\n1\n\njulia> z[end,end]\n42\n\njulia> z[1,:]\n10000-element Array{Int32,1}:\n     1\n     2\n     3\n     4\n     5\n     6\n     7\n     8\n     9\n    10\n     ⋮\n  9992\n  9993\n  9994\n  9995\n  9996\n  9997\n  9998\n  9999\n 10000\n\n\njulia> z[1:5,1:10]\n5×10 Array{Int32,2}:\n 1   2   3   4   5   6   7   8   9  10\n 2  42  42  42  42  42  42  42  42  42\n 3  42  42  42  42  42  42  42  42  42\n 4  42  42  42  42  42  42  42  42  42\n 5  42  42  42  42  42  42  42  42  42","category":"page"},{"location":"tutorial/#Persistent-arrays-1","page":"Tutorial","title":"Persistent arrays","text":"","category":"section"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"In the examples above, compressed data for each chunk of the array was stored in main memory. Zarr arrays can also be stored on a file system, enabling persistence of data between sessions. For example:","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"julia> using Zarr\n\njulia> p = \"data/example.zarr\"\n\"data/example.zarr\"\n\njulia> z1 = zcreate(Int, 10000,10000,path = p,chunks=(1000, 1000))\nZArray{Int64} of size 10000 x 10000","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"The array above will store its configuration metadata and all compressed chunk data in a directory called ‘data/example.zarr’ relative to the current working directory. The zarr.create() function provides a way to create a new persistent array. Note that there is no need to close an array: data are automatically flushed to disk, and files are automatically closed whenever an array is modified.","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"Persistent arrays support the same interface for reading and writing data, e.g.:","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"julia> z1[:] = 42\n42\n\njulia> z1[1,:]=1:10000;\n\njulia> z1[:,1]=1:10000;\n","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"Check that the data have been written and can be read again:","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"julia> z2 = zopen(p)\nZArray{Int64} of size 10000 x 10000\n\njulia> all(z1[:,:].==z2[:,:])\ntrue","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"A Julia-equivalent for zarr.load and zarr.save is still missing...","category":"page"},{"location":"tutorial/#Resizing-and-appending-1","page":"Tutorial","title":"Resizing and appending","text":"","category":"section"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"A Zarr array can be resized, which means that any of its dimensions can be increased or decreased in length. For example:","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"julia> using Zarr\n\njulia> z = zzeros(Int32,10000, 10000, chunks=(1000, 1000))\nZArray{Int32} of size 10000 x 10000\n\njulia> z[:] = 42\n42\n\njulia> resize!(z,20000, 10000)\n\njulia> size(z)\n(20000, 10000)","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"Note that when an array is resized, the underlying data are not rearranged in any way. If one or more dimensions are shrunk, any chunks falling outside the new array shape will be deleted from the underlying store.","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"For convenience, ZArrays also provide an append! method, which can be used to append data to any axis. E.g.:","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"julia> a = reshape(1:Int32(10000000),1000, 10000);\n\njulia> z = ZArray(a, chunks=(100, 1000))\nZArray{Int64} of size 1000 x 10000\n\njulia> size(z)\n(1000, 10000)\n\njulia> append!(z,a)\n\njulia> append!(z,hcat(a,a), dims=1)\n\njulia> size(z)\n(2000, 20000)","category":"page"},{"location":"tutorial/#Compressors-1","page":"Tutorial","title":"Compressors","text":"","category":"section"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"A number of different compressors can be used with Zarr. In this Julia package we currently support only Blosc compression, but more compression methods will be supported in the future. Different compressors can be provided via the compressor keyword argument accepted by all array creation functions. For example:","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"julia> using Zarr\n\njulia> compressor = Zarr.BloscCompressor(cname=\"zstd\", clevel=3, shuffle=true)\nZarr.BloscCompressor(0, 3, \"zstd\", true)\n\njulia> data = Int32(1):Int32(100000000)\n1:100000000\n\njulia> z = Zarr.zcreate(Int32,10000, 10000, chunks = (1000,1000),compressor=compressor)\nZArray{Int32} of size 10000 x 10000\n\njulia> z[:,:]=data\n1:100000000","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"This array above will use Blosc as the primary compressor, using the Zstandard algorithm (compression level 3) internally within Blosc, and with the bit-shuffle filter applied.","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"When using a compressor, it can be useful to get some diagnostics on the compression ratio. ZArrays provide a zinfo function which can be used to print some diagnostics, e.g.:","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"julia> zinfo(z)\nType                : ZArray\nData type           : Int32\nShape               : (10000, 10000)\nChunk Shape         : (1000, 1000)\nOrder               : C\nRead-Only           : false\nCompressor          : Zarr.BloscCompressor(0, 3, \"zstd\", true)\nStore type          : Dictionary Storage\nNo. bytes           : 400000000\nNo. bytes stored    : 2406369\nStorage ratio       : 166.2255456249644\nChunks initialized  : 100/100","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"If you don’t specify a compressor, by default Zarr uses the Blosc compressor. Blosc is generally very fast and can be configured in a variety of ways to improve the compression ratio for different types of data. Blosc is in fact a “meta-compressor”, which means that it can use a number of different compression algorithms internally to compress the data. Blosc also provides highly optimized implementations of byte- and bit-shuffle filters, which can improve compression ratios for some data.","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"To disable compression, set compressor=Zarr.NoCompressor() when creating an array, e.g.:","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"julia> z = zzeros(Int32,100000000, chunks=(1000000,), compressor=Zarr.NoCompressor());\n\njulia> storageratio(z)\n1.0","category":"page"}]
}
