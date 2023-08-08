type Scalars = {
    Date: Date;
    ObjectID: string;
    timestamptz: string;
    uuid: string;
    link__Import: string;
    federation__FieldSet: string;
    _Any: unknown;
};
import Mobius from '../src';
declare const mobius: Mobius<"\n    directive @contact(\n        \"\"\"\n        Contact title of the subgraph owner\n        \"\"\"\n        name: String!\n\n        \"\"\"\n        URL where the subgraph's owner can be reached\n        \"\"\"\n        url: String\n\n        \"\"\"\n        Other relevant notes can be included here; supports markdown links\n        \"\"\"\n        description: String\n    ) on SCHEMA\n\n    directive @link(\n        url: String\n        as: String\n        for: link__Purpose\n        import: [link__Import]\n    ) on SCHEMA\n\n    directive @key(\n        fields: federation__FieldSet!\n        resolvable: Boolean = true\n    ) on OBJECT | INTERFACE\n\n    directive @federation__requires(\n        fields: federation__FieldSet!\n    ) on FIELD_DEFINITION\n\n    directive @federation__provides(\n        fields: federation__FieldSet!\n    ) on FIELD_DEFINITION\n\n    directive @federation__external(reason: String) on OBJECT | FIELD_DEFINITION\n\n    directive @federation__tag(\n        name: String!\n    ) on FIELD_DEFINITION | OBJECT | INTERFACE | UNION | ARGUMENT_DEFINITION | SCALAR | ENUM | ENUM_VALUE | INPUT_OBJECT | INPUT_FIELD_DEFINITION | SCHEMA\n\n    directive @federation__extends on OBJECT | INTERFACE\n\n    directive @federation__shareable on OBJECT | FIELD_DEFINITION\n\n    directive @federation__inaccessible on FIELD_DEFINITION | OBJECT | INTERFACE | UNION | ARGUMENT_DEFINITION | SCALAR | ENUM | ENUM_VALUE | INPUT_OBJECT | INPUT_FIELD_DEFINITION\n\n    directive @federation__override(from: String!) on FIELD_DEFINITION\n\n    directive @federation__composeDirective(name: String) on SCHEMA\n\n    directive @federation__interfaceObject on OBJECT\n\n    type Address {\n        address: String\n        city: String\n        state: String\n    }\n\n    type Capsule {\n        dragon: Dragon\n            @deprecated(\n                reason: \"This is not available in the REST API after MongoDB has been deprecated\"\n            )\n        id: ID\n        landings: Int\n        missions: [CapsuleMission]\n        original_launch: Date\n        reuse_count: Int\n        status: String\n        type: String\n    }\n\n    type CapsuleMission {\n        flight: Int\n        name: String\n    }\n\n    input CapsulesFind {\n        id: ID\n        landings: Int\n        mission: String\n        original_launch: Date\n        reuse_count: Int\n        status: String\n        type: String\n    }\n\n    type Core {\n        asds_attempts: Int\n        asds_landings: Int\n        block: Int\n        id: ID\n        missions: [CapsuleMission]\n        original_launch: Date\n        reuse_count: Int\n        rtls_attempts: Int\n        rtls_landings: Int\n        status: String\n        water_landing: Boolean\n    }\n\n    type CoreMission {\n        flight: Int\n        name: String\n    }\n\n    input CoresFind {\n        asds_attempts: Int\n        asds_landings: Int\n        block: Int\n        id: String\n        missions: String\n        original_launch: Date\n        reuse_count: Int\n        rtls_attempts: Int\n        rtls_landings: Int\n        status: String\n        water_landing: Boolean\n    }\n\n    scalar Date\n\n    type Distance {\n        feet: Float\n        meters: Float\n    }\n\n    type Dragon {\n        active: Boolean\n        crew_capacity: Int\n        description: String\n        diameter: Distance\n        dry_mass_kg: Int\n        dry_mass_lb: Int\n        first_flight: String\n        heat_shield: DragonHeatShield\n        height_w_trunk: Distance\n        id: ID\n        launch_payload_mass: Mass\n        launch_payload_vol: Volume\n        name: String\n        orbit_duration_yr: Int\n        pressurized_capsule: DragonPressurizedCapsule\n        return_payload_mass: Mass\n        return_payload_vol: Volume\n        sidewall_angle_deg: Float\n        thrusters: [DragonThrust]\n        trunk: DragonTrunk\n        type: String\n        wikipedia: String\n    }\n\n    type DragonHeatShield {\n        dev_partner: String\n        material: String\n        size_meters: Float\n        temp_degrees: Int\n    }\n\n    type DragonPressurizedCapsule {\n        payload_volume: Volume\n    }\n\n    type DragonThrust {\n        amount: Int\n        fuel_1: String\n        fuel_2: String\n        pods: Int\n        thrust: Force\n        type: String\n    }\n\n    type DragonTrunk {\n        cargo: DragonTrunkCargo\n        trunk_volume: Volume\n    }\n\n    type DragonTrunkCargo {\n        solar_array: Int\n        unpressurized_cargo: Boolean\n    }\n\n    type Force {\n        kN: Float\n        lbf: Float\n    }\n\n    type HistoriesResult {\n        data: [History]\n        result: Result\n    }\n\n    type History {\n        details: String\n        event_date_unix: Date\n        event_date_utc: Date\n        flight: Launch\n        id: ID\n        links: Link\n        title: String\n    }\n\n    input HistoryFind {\n        end: Date\n        flight_number: Int\n        id: ID\n        start: Date\n    }\n\n    type Info {\n        ceo: String\n        coo: String\n        cto: String\n        cto_propulsion: String\n        employees: Int\n        founded: Int\n        founder: String\n        headquarters: Address\n        launch_sites: Int\n        links: InfoLinks\n        name: String\n        summary: String\n        test_sites: Int\n        valuation: Float\n        vehicles: Int\n    }\n\n    type InfoLinks {\n        elon_twitter: String\n        flickr: String\n        twitter: String\n        website: String\n    }\n\n    type Landpad {\n        attempted_landings: String\n        details: String\n        full_name: String\n        id: ID\n        landing_type: String\n        location: Location\n        status: String\n        successful_landings: String\n        wikipedia: String\n    }\n\n    type Launch {\n        details: String\n        id: ID\n        is_tentative: Boolean\n        launch_date_local: Date\n        launch_date_unix: Date\n        launch_date_utc: Date\n        launch_site: LaunchSite\n        launch_success: Boolean\n        launch_year: String\n        links: LaunchLinks\n        mission_id: [String]\n        mission_name: String\n        rocket: LaunchRocket\n        ships: [Ship]\n        static_fire_date_unix: Date\n        static_fire_date_utc: Date\n        telemetry: LaunchTelemetry\n        tentative_max_precision: String\n        upcoming: Boolean\n    }\n\n    input LaunchFind {\n        apoapsis_km: Float\n        block: Int\n        cap_serial: String\n        capsule_reuse: String\n        core_flight: Int\n        core_reuse: String\n        core_serial: String\n        customer: String\n        eccentricity: Float\n        end: Date\n        epoch: Date\n        fairings_recovered: String\n        fairings_recovery_attempt: String\n        fairings_reuse: String\n        fairings_reused: String\n        fairings_ship: String\n        gridfins: String\n        id: ID\n        inclination_deg: Float\n        land_success: String\n        landing_intent: String\n        landing_type: String\n        landing_vehicle: String\n        launch_date_local: Date\n        launch_date_utc: Date\n        launch_success: String\n        launch_year: String\n        legs: String\n        lifespan_years: Float\n        longitude: Float\n        manufacturer: String\n        mean_motion: Float\n        mission_id: String\n        mission_name: String\n        nationality: String\n        norad_id: Int\n        orbit: String\n        payload_id: String\n        payload_type: String\n        periapsis_km: Float\n        period_min: Float\n        raan: Float\n        reference_system: String\n        regime: String\n        reused: String\n        rocket_id: String\n        rocket_name: String\n        rocket_type: String\n        second_stage_block: String\n        semi_major_axis_km: Float\n        ship: String\n        side_core1_reuse: String\n        side_core2_reuse: String\n        site_id: String\n        site_name_long: String\n        site_name: String\n        start: Date\n        tbd: String\n        tentative_max_precision: String\n        tentative: String\n    }\n\n    type LaunchLinks {\n        article_link: String\n        flickr_images: [String]\n        mission_patch: String\n        mission_patch_small: String\n        presskit: String\n        reddit_campaign: String\n        reddit_launch: String\n        reddit_media: String\n        reddit_recovery: String\n        video_link: String\n        wikipedia: String\n    }\n\n    type LaunchRocket {\n        fairings: LaunchRocketFairings\n        first_stage: LaunchRocketFirstStage\n        rocket: Rocket\n        rocket_name: String\n        rocket_type: String\n        second_stage: LaunchRocketSecondStage\n    }\n\n    type LaunchRocketFairings {\n        recovered: Boolean\n        recovery_attempt: Boolean\n        reused: Boolean\n        ship: String\n    }\n\n    type LaunchRocketFirstStage {\n        cores: [LaunchRocketFirstStageCore]\n    }\n\n    type LaunchRocketFirstStageCore {\n        block: Int\n        core: Core\n        flight: Int\n        gridfins: Boolean\n        land_success: Boolean\n        landing_intent: Boolean\n        landing_type: String\n        landing_vehicle: String\n        legs: Boolean\n        reused: Boolean\n    }\n\n    type LaunchRocketSecondStage {\n        block: Int\n        payloads: [Payload]\n    }\n\n    type LaunchSite {\n        site_id: String\n        site_name: String\n        site_name_long: String\n    }\n\n    type LaunchTelemetry {\n        flight_club: String\n    }\n\n    type LaunchesPastResult {\n        data: [Launch]\n        result: Result\n    }\n\n    type Launchpad {\n        attempted_launches: Int\n        details: String\n        id: ID\n        location: Location\n        name: String\n        status: String\n        successful_launches: Int\n        vehicles_launched: [Rocket]\n        wikipedia: String\n    }\n\n    type Link {\n        article: String\n        reddit: String\n        wikipedia: String\n    }\n\n    type Location {\n        latitude: Float\n        longitude: Float\n        name: String\n        region: String\n    }\n\n    type Mass {\n        kg: Int\n        lb: Int\n    }\n\n    type Mission {\n        description: String\n        id: ID\n        manufacturers: [String]\n        name: String\n        payloads: [Payload]\n        twitter: String\n        website: String\n        wikipedia: String\n    }\n\n    type MissionResult {\n        data: [Mission]\n        result: Result\n    }\n\n    input MissionsFind {\n        id: ID\n        manufacturer: String\n        name: String\n        payload_id: String\n    }\n\n    type Mutation {\n        \"\"\"\n        delete data from the table: \"users\"\n        \"\"\"\n        delete_users(\n            \"\"\"\n            filter the rows which have to be deleted\n            \"\"\"\n            where: users_bool_exp!\n        ): users_mutation_response\n\n        \"\"\"\n        insert data into the table: \"users\"\n        \"\"\"\n        insert_users(\n            \"\"\"\n            the rows to be inserted\n            \"\"\"\n            objects: [users_insert_input!]!\n\n            \"\"\"\n            on conflict condition\n            \"\"\"\n            on_conflict: users_on_conflict\n        ): users_mutation_response\n\n        \"\"\"\n        update data of the table: \"users\"\n        \"\"\"\n        update_users(\n            \"\"\"\n            sets the columns of the filtered rows to the given values\n            \"\"\"\n            _set: users_set_input\n\n            \"\"\"\n            filter the rows which have to be updated\n            \"\"\"\n            where: users_bool_exp!\n        ): users_mutation_response\n    }\n\n    scalar ObjectID\n\n    type Payload {\n        customers: [String]\n        id: ID\n        manufacturer: String\n        nationality: String\n        norad_id: [Int]\n        orbit: String\n        orbit_params: PayloadOrbitParams\n        payload_mass_kg: Float\n        payload_mass_lbs: Float\n        payload_type: String\n        reused: Boolean\n    }\n\n    type PayloadOrbitParams {\n        apoapsis_km: Float\n        arg_of_pericenter: Float\n        eccentricity: Float\n        epoch: Date\n        inclination_deg: Float\n        lifespan_years: Float\n        longitude: Float\n        mean_anomaly: Float\n        mean_motion: Float\n        periapsis_km: Float\n        period_min: Float\n        raan: Float\n        reference_system: String\n        regime: String\n        semi_major_axis_km: Float\n    }\n\n    input PayloadsFind {\n        apoapsis_km: Float\n        customer: String\n        eccentricity: Float\n        epoch: Date\n        inclination_deg: Float\n        lifespan_years: Float\n        longitude: Float\n        manufacturer: String\n        mean_motion: Float\n        nationality: String\n        norad_id: Int\n        orbit: String\n        payload_id: ID\n        payload_type: String\n        periapsis_km: Float\n        period_min: Float\n        raan: Float\n        reference_system: String\n        regime: String\n        reused: Boolean\n        semi_major_axis_km: Float\n    }\n\n    type Query {\n        capsule(id: ID!): Capsule\n        capsules(\n            find: CapsulesFind\n            limit: Int\n            offset: Int\n            order: String\n            sort: String\n        ): [Capsule]\n        capsulesPast(\n            find: CapsulesFind\n            limit: Int\n            offset: Int\n            order: String\n            sort: String\n        ): [Capsule]\n        capsulesUpcoming(\n            find: CapsulesFind\n            limit: Int\n            offset: Int\n            order: String\n            sort: String\n        ): [Capsule]\n        company: Info\n        core(id: ID!): Core\n        cores(\n            find: CoresFind\n            limit: Int\n            offset: Int\n            order: String\n            sort: String\n        ): [Core]\n        coresPast(\n            find: CoresFind\n            limit: Int\n            offset: Int\n            order: String\n            sort: String\n        ): [Core]\n        coresUpcoming(\n            find: CoresFind\n            limit: Int\n            offset: Int\n            order: String\n            sort: String\n        ): [Core]\n        dragon(id: ID!): Dragon\n        dragons(limit: Int, offset: Int): [Dragon]\n        histories(\n            find: HistoryFind\n            limit: Int\n            offset: Int\n            order: String\n            sort: String\n        ): [History]\n        historiesResult(\n            find: HistoryFind\n            limit: Int\n            offset: Int\n            order: String\n            sort: String\n        ): HistoriesResult\n        history(id: ID!): History\n        landpad(id: ID!): Landpad\n        landpads(limit: Int, offset: Int): [Landpad]\n        launch(id: ID!): Launch\n        launchLatest(offset: Int): Launch\n        launchNext(offset: Int): Launch\n        launches(\n            find: LaunchFind\n            limit: Int\n            offset: Int\n            order: String\n            sort: String\n        ): [Launch]\n        launchesPast(\n            find: LaunchFind\n            limit: Int\n            offset: Int\n            order: String\n            sort: String\n        ): [Launch]\n        launchesPastResult(\n            find: LaunchFind\n            limit: Int\n            offset: Int\n            order: String\n            sort: String\n        ): LaunchesPastResult\n        launchesUpcoming(\n            find: LaunchFind\n            limit: Int\n            offset: Int\n            order: String\n            sort: String\n        ): [Launch]\n        launchpad(id: ID!): Launchpad\n        launchpads(limit: Int, offset: Int): [Launchpad]\n        mission(id: ID!): Mission\n            @deprecated(\n                reason: \"Mission is not available on REST API after MongoDB deprecation\"\n            )\n        missions(find: MissionsFind, limit: Int, offset: Int): [Mission]\n            @deprecated(\n                reason: \"Mission is not available on REST API after MongoDB deprecation\"\n            )\n        missionsResult(\n            find: MissionsFind\n            limit: Int\n            offset: Int\n        ): MissionResult\n            @deprecated(\n                reason: \"Mission is not available on REST API after MongoDB deprecation\"\n            )\n        payload(id: ID!): Payload\n        payloads(\n            find: PayloadsFind\n            limit: Int\n            offset: Int\n            order: String\n            sort: String\n        ): [Payload]\n        roadster: Roadster\n        rocket(id: ID!): Rocket\n        rockets(limit: Int, offset: Int): [Rocket]\n        rocketsResult(limit: Int, offset: Int): RocketsResult\n        ship(id: ID!): Ship\n        ships(\n            find: ShipsFind\n            limit: Int\n            offset: Int\n            order: String\n            sort: String\n        ): [Ship]\n        shipsResult(\n            find: ShipsFind\n            limit: Int\n            offset: Int\n            order: String\n            sort: String\n        ): ShipsResult\n\n        \"\"\"\n        fetch data from the table: \"users\"\n        \"\"\"\n        users(\n            \"\"\"\n            distinct select on columns\n            \"\"\"\n            distinct_on: [users_select_column!]\n\n            \"\"\"\n            limit the nuber of rows returned\n            \"\"\"\n            limit: Int\n\n            \"\"\"\n            skip the first n rows. Use only with order_by\n            \"\"\"\n            offset: Int\n\n            \"\"\"\n            sort the rows by one or more columns\n            \"\"\"\n            order_by: [users_order_by!]\n\n            \"\"\"\n            filter the rows returned\n            \"\"\"\n            where: users_bool_exp\n        ): [users!]!\n\n        \"\"\"\n        fetch aggregated fields from the table: \"users\"\n        \"\"\"\n        users_aggregate(\n            \"\"\"\n            distinct select on columns\n            \"\"\"\n            distinct_on: [users_select_column!]\n\n            \"\"\"\n            limit the nuber of rows returned\n            \"\"\"\n            limit: Int\n\n            \"\"\"\n            skip the first n rows. Use only with order_by\n            \"\"\"\n            offset: Int\n\n            \"\"\"\n            sort the rows by one or more columns\n            \"\"\"\n            order_by: [users_order_by!]\n\n            \"\"\"\n            filter the rows returned\n            \"\"\"\n            where: users_bool_exp\n        ): users_aggregate!\n\n        \"\"\"\n        fetch data from the table: \"users\" using primary key columns\n        \"\"\"\n        users_by_pk(id: uuid!): users\n        _service: _Service!\n    }\n\n    type Result {\n        totalCount: Int\n    }\n\n    type Roadster {\n        apoapsis_au: Float\n        details: String\n        earth_distance_km: Float\n        earth_distance_mi: Float\n        eccentricity: Float\n        epoch_jd: Float\n        inclination: Float\n        launch_date_unix: Date\n        launch_date_utc: Date\n        launch_mass_kg: Int\n        launch_mass_lbs: Int\n        longitude: Float\n        mars_distance_km: Float\n        mars_distance_mi: Float\n        name: String\n        norad_id: Int\n        orbit_type: Float\n        periapsis_arg: Float\n        periapsis_au: Float\n        period_days: Float\n        semi_major_axis_au: Float\n        speed_kph: Float\n        speed_mph: Float\n        wikipedia: String\n    }\n\n    type Rocket {\n        active: Boolean\n        boosters: Int\n        company: String\n        cost_per_launch: Int\n        country: String\n        description: String\n        diameter: Distance\n        engines: RocketEngines\n        first_flight: Date\n        first_stage: RocketFirstStage\n        height: Distance\n        id: ID\n        landing_legs: RocketLandingLegs\n        mass: Mass\n        name: String\n        payload_weights: [RocketPayloadWeight]\n        second_stage: RocketSecondStage\n        stages: Int\n        success_rate_pct: Int\n        type: String\n        wikipedia: String\n    }\n\n    type RocketEngines {\n        engine_loss_max: String\n        layout: String\n        number: Int\n        propellant_1: String\n        propellant_2: String\n        thrust_sea_level: Force\n        thrust_to_weight: Float\n        thrust_vacuum: Force\n        type: String\n        version: String\n    }\n\n    type RocketFirstStage {\n        burn_time_sec: Int\n        engines: Int\n        fuel_amount_tons: Float\n        reusable: Boolean\n        thrust_sea_level: Force\n        thrust_vacuum: Force\n    }\n\n    type RocketLandingLegs {\n        material: String\n        number: Int\n    }\n\n    type RocketPayloadWeight {\n        id: String\n        kg: Int\n        lb: Int\n        name: String\n    }\n\n    type RocketSecondStage {\n        burn_time_sec: Int\n        engines: Int\n        fuel_amount_tons: Float\n        payloads: RocketSecondStagePayloads\n        thrust: Force\n    }\n\n    type RocketSecondStagePayloadCompositeFairing {\n        diameter: Distance\n        height: Distance\n    }\n\n    type RocketSecondStagePayloads {\n        composite_fairing: RocketSecondStagePayloadCompositeFairing\n        option_1: String\n    }\n\n    type RocketsResult {\n        data: [Rocket]\n        result: Result\n    }\n\n    type Ship {\n        abs: Int\n        active: Boolean\n        attempted_landings: Int\n        class: Int\n        course_deg: Int\n        home_port: String\n        id: ID\n        image: String\n        imo: Int\n        missions: [ShipMission]\n        mmsi: Int\n        model: String\n        name: String\n        position: ShipLocation\n        roles: [String]\n        speed_kn: Float\n        status: String\n        successful_landings: Int\n        type: String\n        url: String\n        weight_kg: Int\n        weight_lbs: Int\n        year_built: Int\n    }\n\n    type ShipLocation {\n        latitude: Float\n        longitude: Float\n    }\n\n    type ShipMission {\n        flight: String\n        name: String\n    }\n\n    input ShipsFind {\n        id: ID\n        name: String\n        model: String\n        type: String\n        role: String\n        active: Boolean\n        imo: Int\n        mmsi: Int\n        abs: Int\n        class: Int\n        weight_lbs: Int\n        weight_kg: Int\n        year_built: Int\n        home_port: String\n        status: String\n        speed_kn: Int\n        course_deg: Int\n        latitude: Float\n        longitude: Float\n        successful_landings: Int\n        attempted_landings: Int\n        mission: String\n    }\n\n    type ShipsResult {\n        data: [Ship]\n        result: Result\n    }\n\n    \"\"\"\n    expression to compare columns of type String. All fields are combined with logical 'AND'.\n    \"\"\"\n    input String_comparison_exp {\n        _eq: String\n        _gt: String\n        _gte: String\n        _ilike: String\n        _in: [String!]\n        _is_null: Boolean\n        _like: String\n        _lt: String\n        _lte: String\n        _neq: String\n        _nilike: String\n        _nin: [String!]\n        _nlike: String\n        _nsimilar: String\n        _similar: String\n    }\n\n    type Subscription {\n        \"\"\"\n        fetch data from the table: \"users\"\n        \"\"\"\n        users(\n            \"\"\"\n            distinct select on columns\n            \"\"\"\n            distinct_on: [users_select_column!]\n\n            \"\"\"\n            limit the nuber of rows returned\n            \"\"\"\n            limit: Int\n\n            \"\"\"\n            skip the first n rows. Use only with order_by\n            \"\"\"\n            offset: Int\n\n            \"\"\"\n            sort the rows by one or more columns\n            \"\"\"\n            order_by: [users_order_by!]\n\n            \"\"\"\n            filter the rows returned\n            \"\"\"\n            where: users_bool_exp\n        ): [users!]!\n\n        \"\"\"\n        fetch aggregated fields from the table: \"users\"\n        \"\"\"\n        users_aggregate(\n            \"\"\"\n            distinct select on columns\n            \"\"\"\n            distinct_on: [users_select_column!]\n\n            \"\"\"\n            limit the nuber of rows returned\n            \"\"\"\n            limit: Int\n\n            \"\"\"\n            skip the first n rows. Use only with order_by\n            \"\"\"\n            offset: Int\n\n            \"\"\"\n            sort the rows by one or more columns\n            \"\"\"\n            order_by: [users_order_by!]\n\n            \"\"\"\n            filter the rows returned\n            \"\"\"\n            where: users_bool_exp\n        ): users_aggregate!\n\n        \"\"\"\n        fetch data from the table: \"users\" using primary key columns\n        \"\"\"\n        users_by_pk(id: uuid!): users\n    }\n\n    type Volume {\n        cubic_feet: Int\n        cubic_meters: Int\n    }\n\n    \"\"\"\n    conflict action\n    \"\"\"\n    enum conflict_action {\n        \"\"\"\n        ignore the insert on this row\n        \"\"\"\n        ignore\n\n        \"\"\"\n        update the row with the given values\n        \"\"\"\n        update\n    }\n\n    \"\"\"\n    column ordering options\n    \"\"\"\n    enum order_by {\n        \"\"\"\n        in the ascending order, nulls last\n        \"\"\"\n        asc\n\n        \"\"\"\n        in the ascending order, nulls first\n        \"\"\"\n        asc_nulls_first\n\n        \"\"\"\n        in the ascending order, nulls last\n        \"\"\"\n        asc_nulls_last\n\n        \"\"\"\n        in the descending order, nulls first\n        \"\"\"\n        desc\n\n        \"\"\"\n        in the descending order, nulls first\n        \"\"\"\n        desc_nulls_first\n\n        \"\"\"\n        in the descending order, nulls last\n        \"\"\"\n        desc_nulls_last\n    }\n\n    scalar timestamptz\n\n    \"\"\"\n    expression to compare columns of type timestamptz. All fields are combined with logical 'AND'.\n    \"\"\"\n    input timestamptz_comparison_exp {\n        _eq: timestamptz\n        _gt: timestamptz\n        _gte: timestamptz\n        _in: [timestamptz!]\n        _is_null: Boolean\n        _lt: timestamptz\n        _lte: timestamptz\n        _neq: timestamptz\n        _nin: [timestamptz!]\n    }\n\n    \"\"\"\n    columns and relationships of \"users\"\n    \"\"\"\n    type users {\n        id: uuid!\n        name: String\n        rocket: String\n        timestamp: timestamptz!\n        twitter: String\n    }\n\n    \"\"\"\n    aggregated selection of \"users\"\n    \"\"\"\n    type users_aggregate {\n        aggregate: users_aggregate_fields\n        nodes: [users!]!\n    }\n\n    \"\"\"\n    aggregate fields of \"users\"\n    \"\"\"\n    type users_aggregate_fields {\n        count(columns: [users_select_column!], distinct: Boolean): Int\n        max: users_max_fields\n        min: users_min_fields\n    }\n\n    \"\"\"\n    order by aggregate values of table \"users\"\n    \"\"\"\n    input users_aggregate_order_by {\n        count: order_by\n        max: users_max_order_by\n        min: users_min_order_by\n    }\n\n    \"\"\"\n    input type for inserting array relation for remote table \"users\"\n    \"\"\"\n    input users_arr_rel_insert_input {\n        data: [users_insert_input!]!\n        on_conflict: users_on_conflict\n    }\n\n    \"\"\"\n    Boolean expression to filter rows from the table \"users\". All fields are combined with a logical 'AND'.\n    \"\"\"\n    input users_bool_exp {\n        _and: [users_bool_exp]\n        _not: users_bool_exp\n        _or: [users_bool_exp]\n        id: uuid_comparison_exp\n        name: String_comparison_exp\n        rocket: String_comparison_exp\n        timestamp: timestamptz_comparison_exp\n        twitter: String_comparison_exp\n    }\n\n    \"\"\"\n    unique or primary key constraints on table \"users\"\n    \"\"\"\n    enum users_constraint {\n        unique\n        or\n        primary\n        key\n        constraint\n        users_pkey\n    }\n\n    \"\"\"\n    input type for inserting data into table \"users\"\n    \"\"\"\n    input users_insert_input {\n        id: uuid\n        name: String\n        rocket: String\n        timestamp: timestamptz\n        twitter: String\n    }\n\n    \"\"\"\n    aggregate max on columns\n    \"\"\"\n    type users_max_fields {\n        name: String\n        rocket: String\n        timestamp: timestamptz\n        twitter: String\n    }\n\n    \"\"\"\n    order by max() on columns of table \"users\"\n    \"\"\"\n    input users_max_order_by {\n        name: order_by\n        rocket: order_by\n        timestamp: order_by\n        twitter: order_by\n    }\n\n    \"\"\"\n    aggregate min on columns\n    \"\"\"\n    type users_min_fields {\n        name: String\n        rocket: String\n        timestamp: timestamptz\n        twitter: String\n    }\n\n    \"\"\"\n    order by min() on columns of table \"users\"\n    \"\"\"\n    input users_min_order_by {\n        name: order_by\n        rocket: order_by\n        timestamp: order_by\n        twitter: order_by\n    }\n\n    \"\"\"\n    response of any mutation on the table \"users\"\n    \"\"\"\n    type users_mutation_response {\n        \"\"\"\n        number of affected rows by the mutation\n        \"\"\"\n        affected_rows: Int!\n\n        \"\"\"\n        data of the affected rows by the mutation\n        \"\"\"\n        returning: [users!]!\n    }\n\n    \"\"\"\n    input type for inserting object relation for remote table \"users\"\n    \"\"\"\n    input users_obj_rel_insert_input {\n        data: users_insert_input!\n        on_conflict: users_on_conflict\n    }\n\n    \"\"\"\n    on conflict condition type for table \"users\"\n    \"\"\"\n    input users_on_conflict {\n        constraint: users_constraint!\n        update_columns: [users_update_column!]!\n    }\n\n    \"\"\"\n    ordering options when selecting data from \"users\"\n    \"\"\"\n    input users_order_by {\n        id: order_by\n        name: order_by\n        rocket: order_by\n        timestamp: order_by\n        twitter: order_by\n    }\n\n    \"\"\"\n    select columns of table \"users\"\n    \"\"\"\n    enum users_select_column {\n        column\n        name\n        id\n        rocket\n        timestamp\n        twitter\n    }\n\n    \"\"\"\n    input type for updating data in table \"users\"\n    \"\"\"\n    input users_set_input {\n        id: uuid\n        name: String\n        rocket: String\n        timestamp: timestamptz\n        twitter: String\n    }\n\n    \"\"\"\n    update columns of table \"users\"\n    \"\"\"\n    enum users_update_column {\n        column\n        name\n        id\n        rocket\n        timestamp\n        twitter\n    }\n\n    scalar uuid\n\n    \"\"\"\n    expression to compare columns of type uuid. All fields are combined with logical 'AND'.\n    \"\"\"\n    input uuid_comparison_exp {\n        _eq: uuid\n        _gt: uuid\n        _gte: uuid\n        _in: [uuid!]\n        _is_null: Boolean\n        _lt: uuid\n        _lte: uuid\n        _neq: uuid\n        _nin: [uuid!]\n    }\n\n    enum link__Purpose {\n        \"\"\"\n        'SECURITY' features provide metadata necessary to securely resolve fields.\n        \"\"\"\n        SECURITY\n\n        \"\"\"\n        'EXECUTION' features provide metadata necessary for operation execution.\n        \"\"\"\n        EXECUTION\n    }\n\n    scalar link__Import\n\n    scalar federation__FieldSet\n\n    scalar _Any\n\n    type _Service {\n        sdl: String\n    }\n", Scalars, {
    Address: {
        address: string | null;
        city: string | null;
        state: string | null;
    };
    Capsule: {
        dragon: {
            active: boolean | null;
            crew_capacity: number | null;
            description: string | null;
            diameter: {
                feet: number | null;
                meters: number | null;
            } | null;
            dry_mass_kg: number | null;
            dry_mass_lb: number | null;
            first_flight: string | null;
            heat_shield: {
                dev_partner: string | null;
                material: string | null;
                size_meters: number | null;
                temp_degrees: number | null;
            } | null;
            height_w_trunk: {
                feet: number | null;
                meters: number | null;
            } | null;
            id: string | null;
            launch_payload_mass: {
                kg: number | null;
                lb: number | null;
            } | null;
            launch_payload_vol: {
                cubic_feet: number | null;
                cubic_meters: number | null;
            } | null;
            name: string | null;
            orbit_duration_yr: number | null;
            pressurized_capsule: {
                payload_volume: {
                    cubic_feet: number | null;
                    cubic_meters: number | null;
                } | null;
            } | null;
            return_payload_mass: {
                kg: number | null;
                lb: number | null;
            } | null;
            return_payload_vol: {
                cubic_feet: number | null;
                cubic_meters: number | null;
            } | null;
            sidewall_angle_deg: number | null;
            thrusters: ({
                amount: number | null;
                fuel_1: string | null;
                fuel_2: string | null;
                pods: number | null;
                thrust: {
                    kN: number | null;
                    lbf: number | null;
                } | null;
                type: string | null;
            } | null)[] | null;
            trunk: {
                cargo: {
                    solar_array: number | null;
                    unpressurized_cargo: boolean | null;
                } | null;
                trunk_volume: {
                    cubic_feet: number | null;
                    cubic_meters: number | null;
                } | null;
            } | null;
            type: string | null;
            wikipedia: string | null;
        } | null;
    };
    CapsuleMission: {
        flight: number | null;
        name: string | null;
    };
    CapsulesFind: {
        id: string | null;
        landings: number | null;
        mission: string | null;
        original_launch: Date | null;
        reuse_count: number | null;
        status: string | null;
        type: string | null;
    };
    Core: {
        asds_attempts: number | null;
        asds_landings: number | null;
        block: number | null;
        id: string | null;
        missions: ({
            flight: number | null;
            name: string | null;
        } | null)[] | null;
        original_launch: Date | null;
        reuse_count: number | null;
        rtls_attempts: number | null;
        rtls_landings: number | null;
        status: string | null;
        water_landing: boolean | null;
    };
    CoreMission: {
        flight: number | null;
        name: string | null;
    };
    CoresFind: {
        asds_attempts: number | null;
        asds_landings: number | null;
        block: number | null;
        id: string | null;
        missions: string | null;
        original_launch: Date | null;
        reuse_count: number | null;
        rtls_attempts: number | null;
        rtls_landings: number | null;
        status: string | null;
        water_landing: boolean | null;
    };
    Distance: {
        feet: number | null;
        meters: number | null;
    };
    Dragon: {
        active: boolean | null;
        crew_capacity: number | null;
        description: string | null;
        diameter: {
            feet: number | null;
            meters: number | null;
        } | null;
        dry_mass_kg: number | null;
        dry_mass_lb: number | null;
        first_flight: string | null;
        heat_shield: {
            dev_partner: string | null;
            material: string | null;
            size_meters: number | null;
            temp_degrees: number | null;
        } | null;
        height_w_trunk: {
            feet: number | null;
            meters: number | null;
        } | null;
        id: string | null;
        launch_payload_mass: {
            kg: number | null;
            lb: number | null;
        } | null;
        launch_payload_vol: {
            cubic_feet: number | null;
            cubic_meters: number | null;
        } | null;
        name: string | null;
        orbit_duration_yr: number | null;
        pressurized_capsule: {
            payload_volume: {
                cubic_feet: number | null;
                cubic_meters: number | null;
            } | null;
        } | null;
        return_payload_mass: {
            kg: number | null;
            lb: number | null;
        } | null;
        return_payload_vol: {
            cubic_feet: number | null;
            cubic_meters: number | null;
        } | null;
        sidewall_angle_deg: number | null;
        thrusters: ({
            amount: number | null;
            fuel_1: string | null;
            fuel_2: string | null;
            pods: number | null;
            thrust: {
                kN: number | null;
                lbf: number | null;
            } | null;
            type: string | null;
        } | null)[] | null;
        trunk: {
            cargo: {
                solar_array: number | null;
                unpressurized_cargo: boolean | null;
            } | null;
            trunk_volume: {
                cubic_feet: number | null;
                cubic_meters: number | null;
            } | null;
        } | null;
        type: string | null;
        wikipedia: string | null;
    };
    DragonHeatShield: {
        dev_partner: string | null;
        material: string | null;
        size_meters: number | null;
        temp_degrees: number | null;
    };
    DragonPressurizedCapsule: {
        payload_volume: {
            cubic_feet: number | null;
            cubic_meters: number | null;
        } | null;
    };
    DragonThrust: {
        amount: number | null;
        fuel_1: string | null;
        fuel_2: string | null;
        pods: number | null;
        thrust: {
            kN: number | null;
            lbf: number | null;
        } | null;
        type: string | null;
    };
    DragonTrunk: {
        cargo: {
            solar_array: number | null;
            unpressurized_cargo: boolean | null;
        } | null;
        trunk_volume: {
            cubic_feet: number | null;
            cubic_meters: number | null;
        } | null;
    };
    DragonTrunkCargo: {
        solar_array: number | null;
        unpressurized_cargo: boolean | null;
    };
    Force: {
        kN: number | null;
        lbf: number | null;
    };
    HistoriesResult: {
        data: ({
            details: string | null;
            event_date_unix: Date | null;
            event_date_utc: Date | null;
            flight: {
                details: string | null;
                id: string | null;
                is_tentative: boolean | null;
                launch_date_local: Date | null;
                launch_date_unix: Date | null;
                launch_date_utc: Date | null;
                launch_site: {
                    site_id: string | null;
                    site_name: string | null;
                    site_name_long: string | null;
                } | null;
                launch_success: boolean | null;
                launch_year: string | null;
                links: {
                    article_link: string | null;
                    flickr_images: (string | null)[] | null;
                    mission_patch: string | null;
                    mission_patch_small: string | null;
                    presskit: string | null;
                    reddit_campaign: string | null;
                    reddit_launch: string | null;
                    reddit_media: string | null;
                    reddit_recovery: string | null;
                    video_link: string | null;
                    wikipedia: string | null;
                } | null;
                mission_id: (string | null)[] | null;
                mission_name: string | null;
                rocket: {
                    fairings: {
                        recovered: boolean | null;
                        recovery_attempt: boolean | null;
                        reused: boolean | null;
                        ship: string | null;
                    } | null;
                    first_stage: {
                        cores: ({
                            block: number | null;
                            core: {
                                asds_attempts: number | null;
                                asds_landings: number | null;
                                block: number | null;
                                id: string | null;
                                missions: ({
                                    flight: number | null;
                                    name: string | null;
                                } | null)[] | null;
                                original_launch: Date | null;
                                reuse_count: number | null;
                                rtls_attempts: number | null;
                                rtls_landings: number | null;
                                status: string | null;
                                water_landing: boolean | null;
                            } | null;
                            flight: number | null;
                            gridfins: boolean | null;
                            land_success: boolean | null;
                            landing_intent: boolean | null;
                            landing_type: string | null;
                            landing_vehicle: string | null;
                            legs: boolean | null;
                            reused: boolean | null;
                        } | null)[] | null;
                    } | null;
                    rocket: {
                        active: boolean | null;
                        boosters: number | null;
                        company: string | null;
                        cost_per_launch: number | null;
                        country: string | null;
                        description: string | null;
                        diameter: {
                            feet: number | null;
                            meters: number | null;
                        } | null;
                        engines: {
                            engine_loss_max: string | null;
                            layout: string | null;
                            number: number | null;
                            propellant_1: string | null;
                            propellant_2: string | null;
                            thrust_sea_level: {
                                kN: number | null;
                                lbf: number | null;
                            } | null;
                            thrust_to_weight: number | null;
                            thrust_vacuum: {
                                kN: number | null;
                                lbf: number | null;
                            } | null;
                            type: string | null;
                            version: string | null;
                        } | null;
                        first_flight: Date | null;
                        first_stage: {
                            burn_time_sec: number | null;
                            engines: number | null;
                            fuel_amount_tons: number | null;
                            reusable: boolean | null;
                            thrust_sea_level: {
                                kN: number | null;
                                lbf: number | null;
                            } | null;
                            thrust_vacuum: {
                                kN: number | null;
                                lbf: number | null;
                            } | null;
                        } | null;
                        height: {
                            feet: number | null;
                            meters: number | null;
                        } | null;
                        id: string | null;
                        landing_legs: {
                            material: string | null;
                            number: number | null;
                        } | null;
                        mass: {
                            kg: number | null;
                            lb: number | null;
                        } | null;
                        name: string | null;
                        payload_weights: ({
                            id: string | null;
                            kg: number | null;
                            lb: number | null;
                            name: string | null;
                        } | null)[] | null;
                        second_stage: {
                            burn_time_sec: number | null;
                            engines: number | null;
                            fuel_amount_tons: number | null;
                            payloads: {
                                composite_fairing: {
                                    diameter: {
                                        feet: number | null;
                                        meters: number | null;
                                    } | null;
                                    height: {
                                        feet: number | null;
                                        meters: number | null;
                                    } | null;
                                } | null;
                                option_1: string | null;
                            } | null;
                            thrust: {
                                kN: number | null;
                                lbf: number | null;
                            } | null;
                        } | null;
                        stages: number | null;
                        success_rate_pct: number | null;
                        type: string | null;
                        wikipedia: string | null;
                    } | null;
                    rocket_name: string | null;
                    rocket_type: string | null;
                    second_stage: {
                        block: number | null;
                        payloads: ({
                            customers: (string | null)[] | null;
                            id: string | null;
                            manufacturer: string | null;
                            nationality: string | null;
                            norad_id: (number | null)[] | null;
                            orbit: string | null;
                            orbit_params: {
                                apoapsis_km: number | null;
                                arg_of_pericenter: number | null;
                                eccentricity: number | null;
                                epoch: Date | null;
                                inclination_deg: number | null;
                                lifespan_years: number | null;
                                longitude: number | null;
                                mean_anomaly: number | null;
                                mean_motion: number | null;
                                periapsis_km: number | null;
                                period_min: number | null;
                                raan: number | null;
                                reference_system: string | null;
                                regime: string | null;
                                semi_major_axis_km: number | null;
                            } | null;
                            payload_mass_kg: number | null;
                            payload_mass_lbs: number | null;
                            payload_type: string | null;
                            reused: boolean | null;
                        } | null)[] | null;
                    } | null;
                } | null;
                ships: ({
                    abs: number | null;
                    active: boolean | null;
                    attempted_landings: number | null;
                    class: number | null;
                    course_deg: number | null;
                    home_port: string | null;
                    id: string | null;
                    image: string | null;
                    imo: number | null;
                    missions: ({
                        flight: string | null;
                        name: string | null;
                    } | null)[] | null;
                    mmsi: number | null;
                    model: string | null;
                    name: string | null;
                    position: {
                        latitude: number | null;
                        longitude: number | null;
                    } | null;
                    roles: (string | null)[] | null;
                    speed_kn: number | null;
                    status: string | null;
                    successful_landings: number | null;
                    type: string | null;
                    url: string | null;
                    weight_kg: number | null;
                    weight_lbs: number | null;
                    year_built: number | null;
                } | null)[] | null;
                static_fire_date_unix: Date | null;
                static_fire_date_utc: Date | null;
                telemetry: {
                    flight_club: string | null;
                } | null;
                tentative_max_precision: string | null;
                upcoming: boolean | null;
            } | null;
            id: string | null;
            links: {
                article: string | null;
                reddit: string | null;
                wikipedia: string | null;
            } | null;
            title: string | null;
        } | null)[] | null;
        result: {
            totalCount: number | null;
        } | null;
    };
    History: {
        details: string | null;
        event_date_unix: Date | null;
        event_date_utc: Date | null;
        flight: {
            details: string | null;
            id: string | null;
            is_tentative: boolean | null;
            launch_date_local: Date | null;
            launch_date_unix: Date | null;
            launch_date_utc: Date | null;
            launch_site: {
                site_id: string | null;
                site_name: string | null;
                site_name_long: string | null;
            } | null;
            launch_success: boolean | null;
            launch_year: string | null;
            links: {
                article_link: string | null;
                flickr_images: (string | null)[] | null;
                mission_patch: string | null;
                mission_patch_small: string | null;
                presskit: string | null;
                reddit_campaign: string | null;
                reddit_launch: string | null;
                reddit_media: string | null;
                reddit_recovery: string | null;
                video_link: string | null;
                wikipedia: string | null;
            } | null;
            mission_id: (string | null)[] | null;
            mission_name: string | null;
            rocket: {
                fairings: {
                    recovered: boolean | null;
                    recovery_attempt: boolean | null;
                    reused: boolean | null;
                    ship: string | null;
                } | null;
                first_stage: {
                    cores: ({
                        block: number | null;
                        core: {
                            asds_attempts: number | null;
                            asds_landings: number | null;
                            block: number | null;
                            id: string | null;
                            missions: ({
                                flight: number | null;
                                name: string | null;
                            } | null)[] | null;
                            original_launch: Date | null;
                            reuse_count: number | null;
                            rtls_attempts: number | null;
                            rtls_landings: number | null;
                            status: string | null;
                            water_landing: boolean | null;
                        } | null;
                        flight: number | null;
                        gridfins: boolean | null;
                        land_success: boolean | null;
                        landing_intent: boolean | null;
                        landing_type: string | null;
                        landing_vehicle: string | null;
                        legs: boolean | null;
                        reused: boolean | null;
                    } | null)[] | null;
                } | null;
                rocket: {
                    active: boolean | null;
                    boosters: number | null;
                    company: string | null;
                    cost_per_launch: number | null;
                    country: string | null;
                    description: string | null;
                    diameter: {
                        feet: number | null;
                        meters: number | null;
                    } | null;
                    engines: {
                        engine_loss_max: string | null;
                        layout: string | null;
                        number: number | null;
                        propellant_1: string | null;
                        propellant_2: string | null;
                        thrust_sea_level: {
                            kN: number | null;
                            lbf: number | null;
                        } | null;
                        thrust_to_weight: number | null;
                        thrust_vacuum: {
                            kN: number | null;
                            lbf: number | null;
                        } | null;
                        type: string | null;
                        version: string | null;
                    } | null;
                    first_flight: Date | null;
                    first_stage: {
                        burn_time_sec: number | null;
                        engines: number | null;
                        fuel_amount_tons: number | null;
                        reusable: boolean | null;
                        thrust_sea_level: {
                            kN: number | null;
                            lbf: number | null;
                        } | null;
                        thrust_vacuum: {
                            kN: number | null;
                            lbf: number | null;
                        } | null;
                    } | null;
                    height: {
                        feet: number | null;
                        meters: number | null;
                    } | null;
                    id: string | null;
                    landing_legs: {
                        material: string | null;
                        number: number | null;
                    } | null;
                    mass: {
                        kg: number | null;
                        lb: number | null;
                    } | null;
                    name: string | null;
                    payload_weights: ({
                        id: string | null;
                        kg: number | null;
                        lb: number | null;
                        name: string | null;
                    } | null)[] | null;
                    second_stage: {
                        burn_time_sec: number | null;
                        engines: number | null;
                        fuel_amount_tons: number | null;
                        payloads: {
                            composite_fairing: {
                                diameter: {
                                    feet: number | null;
                                    meters: number | null;
                                } | null;
                                height: {
                                    feet: number | null;
                                    meters: number | null;
                                } | null;
                            } | null;
                            option_1: string | null;
                        } | null;
                        thrust: {
                            kN: number | null;
                            lbf: number | null;
                        } | null;
                    } | null;
                    stages: number | null;
                    success_rate_pct: number | null;
                    type: string | null;
                    wikipedia: string | null;
                } | null;
                rocket_name: string | null;
                rocket_type: string | null;
                second_stage: {
                    block: number | null;
                    payloads: ({
                        customers: (string | null)[] | null;
                        id: string | null;
                        manufacturer: string | null;
                        nationality: string | null;
                        norad_id: (number | null)[] | null;
                        orbit: string | null;
                        orbit_params: {
                            apoapsis_km: number | null;
                            arg_of_pericenter: number | null;
                            eccentricity: number | null;
                            epoch: Date | null;
                            inclination_deg: number | null;
                            lifespan_years: number | null;
                            longitude: number | null;
                            mean_anomaly: number | null;
                            mean_motion: number | null;
                            periapsis_km: number | null;
                            period_min: number | null;
                            raan: number | null;
                            reference_system: string | null;
                            regime: string | null;
                            semi_major_axis_km: number | null;
                        } | null;
                        payload_mass_kg: number | null;
                        payload_mass_lbs: number | null;
                        payload_type: string | null;
                        reused: boolean | null;
                    } | null)[] | null;
                } | null;
            } | null;
            ships: ({
                abs: number | null;
                active: boolean | null;
                attempted_landings: number | null;
                class: number | null;
                course_deg: number | null;
                home_port: string | null;
                id: string | null;
                image: string | null;
                imo: number | null;
                missions: ({
                    flight: string | null;
                    name: string | null;
                } | null)[] | null;
                mmsi: number | null;
                model: string | null;
                name: string | null;
                position: {
                    latitude: number | null;
                    longitude: number | null;
                } | null;
                roles: (string | null)[] | null;
                speed_kn: number | null;
                status: string | null;
                successful_landings: number | null;
                type: string | null;
                url: string | null;
                weight_kg: number | null;
                weight_lbs: number | null;
                year_built: number | null;
            } | null)[] | null;
            static_fire_date_unix: Date | null;
            static_fire_date_utc: Date | null;
            telemetry: {
                flight_club: string | null;
            } | null;
            tentative_max_precision: string | null;
            upcoming: boolean | null;
        } | null;
        id: string | null;
        links: {
            article: string | null;
            reddit: string | null;
            wikipedia: string | null;
        } | null;
        title: string | null;
    };
    HistoryFind: {
        end: Date | null;
        flight_number: number | null;
        id: string | null;
        start: Date | null;
    };
    Info: {
        ceo: string | null;
        coo: string | null;
        cto: string | null;
        cto_propulsion: string | null;
        employees: number | null;
        founded: number | null;
        founder: string | null;
        headquarters: {
            address: string | null;
            city: string | null;
            state: string | null;
        } | null;
        launch_sites: number | null;
        links: {
            elon_twitter: string | null;
            flickr: string | null;
            twitter: string | null;
            website: string | null;
        } | null;
        name: string | null;
        summary: string | null;
        test_sites: number | null;
        valuation: number | null;
        vehicles: number | null;
    };
    InfoLinks: {
        elon_twitter: string | null;
        flickr: string | null;
        twitter: string | null;
        website: string | null;
    };
    Landpad: {
        attempted_landings: string | null;
        details: string | null;
        full_name: string | null;
        id: string | null;
        landing_type: string | null;
        location: {
            latitude: number | null;
            longitude: number | null;
            name: string | null;
            region: string | null;
        } | null;
        status: string | null;
        successful_landings: string | null;
        wikipedia: string | null;
    };
    Launch: {
        details: string | null;
        id: string | null;
        is_tentative: boolean | null;
        launch_date_local: Date | null;
        launch_date_unix: Date | null;
        launch_date_utc: Date | null;
        launch_site: {
            site_id: string | null;
            site_name: string | null;
            site_name_long: string | null;
        } | null;
        launch_success: boolean | null;
        launch_year: string | null;
        links: {
            article_link: string | null;
            flickr_images: (string | null)[] | null;
            mission_patch: string | null;
            mission_patch_small: string | null;
            presskit: string | null;
            reddit_campaign: string | null;
            reddit_launch: string | null;
            reddit_media: string | null;
            reddit_recovery: string | null;
            video_link: string | null;
            wikipedia: string | null;
        } | null;
        mission_id: (string | null)[] | null;
        mission_name: string | null;
        rocket: {
            fairings: {
                recovered: boolean | null;
                recovery_attempt: boolean | null;
                reused: boolean | null;
                ship: string | null;
            } | null;
            first_stage: {
                cores: ({
                    block: number | null;
                    core: {
                        asds_attempts: number | null;
                        asds_landings: number | null;
                        block: number | null;
                        id: string | null;
                        missions: ({
                            flight: number | null;
                            name: string | null;
                        } | null)[] | null;
                        original_launch: Date | null;
                        reuse_count: number | null;
                        rtls_attempts: number | null;
                        rtls_landings: number | null;
                        status: string | null;
                        water_landing: boolean | null;
                    } | null;
                    flight: number | null;
                    gridfins: boolean | null;
                    land_success: boolean | null;
                    landing_intent: boolean | null;
                    landing_type: string | null;
                    landing_vehicle: string | null;
                    legs: boolean | null;
                    reused: boolean | null;
                } | null)[] | null;
            } | null;
            rocket: {
                active: boolean | null;
                boosters: number | null;
                company: string | null;
                cost_per_launch: number | null;
                country: string | null;
                description: string | null;
                diameter: {
                    feet: number | null;
                    meters: number | null;
                } | null;
                engines: {
                    engine_loss_max: string | null;
                    layout: string | null;
                    number: number | null;
                    propellant_1: string | null;
                    propellant_2: string | null;
                    thrust_sea_level: {
                        kN: number | null;
                        lbf: number | null;
                    } | null;
                    thrust_to_weight: number | null;
                    thrust_vacuum: {
                        kN: number | null;
                        lbf: number | null;
                    } | null;
                    type: string | null;
                    version: string | null;
                } | null;
                first_flight: Date | null;
                first_stage: {
                    burn_time_sec: number | null;
                    engines: number | null;
                    fuel_amount_tons: number | null;
                    reusable: boolean | null;
                    thrust_sea_level: {
                        kN: number | null;
                        lbf: number | null;
                    } | null;
                    thrust_vacuum: {
                        kN: number | null;
                        lbf: number | null;
                    } | null;
                } | null;
                height: {
                    feet: number | null;
                    meters: number | null;
                } | null;
                id: string | null;
                landing_legs: {
                    material: string | null;
                    number: number | null;
                } | null;
                mass: {
                    kg: number | null;
                    lb: number | null;
                } | null;
                name: string | null;
                payload_weights: ({
                    id: string | null;
                    kg: number | null;
                    lb: number | null;
                    name: string | null;
                } | null)[] | null;
                second_stage: {
                    burn_time_sec: number | null;
                    engines: number | null;
                    fuel_amount_tons: number | null;
                    payloads: {
                        composite_fairing: {
                            diameter: {
                                feet: number | null;
                                meters: number | null;
                            } | null;
                            height: {
                                feet: number | null;
                                meters: number | null;
                            } | null;
                        } | null;
                        option_1: string | null;
                    } | null;
                    thrust: {
                        kN: number | null;
                        lbf: number | null;
                    } | null;
                } | null;
                stages: number | null;
                success_rate_pct: number | null;
                type: string | null;
                wikipedia: string | null;
            } | null;
            rocket_name: string | null;
            rocket_type: string | null;
            second_stage: {
                block: number | null;
                payloads: ({
                    customers: (string | null)[] | null;
                    id: string | null;
                    manufacturer: string | null;
                    nationality: string | null;
                    norad_id: (number | null)[] | null;
                    orbit: string | null;
                    orbit_params: {
                        apoapsis_km: number | null;
                        arg_of_pericenter: number | null;
                        eccentricity: number | null;
                        epoch: Date | null;
                        inclination_deg: number | null;
                        lifespan_years: number | null;
                        longitude: number | null;
                        mean_anomaly: number | null;
                        mean_motion: number | null;
                        periapsis_km: number | null;
                        period_min: number | null;
                        raan: number | null;
                        reference_system: string | null;
                        regime: string | null;
                        semi_major_axis_km: number | null;
                    } | null;
                    payload_mass_kg: number | null;
                    payload_mass_lbs: number | null;
                    payload_type: string | null;
                    reused: boolean | null;
                } | null)[] | null;
            } | null;
        } | null;
        ships: ({
            abs: number | null;
            active: boolean | null;
            attempted_landings: number | null;
            class: number | null;
            course_deg: number | null;
            home_port: string | null;
            id: string | null;
            image: string | null;
            imo: number | null;
            missions: ({
                flight: string | null;
                name: string | null;
            } | null)[] | null;
            mmsi: number | null;
            model: string | null;
            name: string | null;
            position: {
                latitude: number | null;
                longitude: number | null;
            } | null;
            roles: (string | null)[] | null;
            speed_kn: number | null;
            status: string | null;
            successful_landings: number | null;
            type: string | null;
            url: string | null;
            weight_kg: number | null;
            weight_lbs: number | null;
            year_built: number | null;
        } | null)[] | null;
        static_fire_date_unix: Date | null;
        static_fire_date_utc: Date | null;
        telemetry: {
            flight_club: string | null;
        } | null;
        tentative_max_precision: string | null;
        upcoming: boolean | null;
    };
    LaunchFind: {
        [x: string]: any;
    };
    LaunchLinks: {
        article_link: string | null;
        flickr_images: (string | null)[] | null;
        mission_patch: string | null;
        mission_patch_small: string | null;
        presskit: string | null;
        reddit_campaign: string | null;
        reddit_launch: string | null;
        reddit_media: string | null;
        reddit_recovery: string | null;
        video_link: string | null;
        wikipedia: string | null;
    };
    LaunchRocket: {
        fairings: {
            recovered: boolean | null;
            recovery_attempt: boolean | null;
            reused: boolean | null;
            ship: string | null;
        } | null;
        first_stage: {
            cores: ({
                block: number | null;
                core: {
                    asds_attempts: number | null;
                    asds_landings: number | null;
                    block: number | null;
                    id: string | null;
                    missions: ({
                        flight: number | null;
                        name: string | null;
                    } | null)[] | null;
                    original_launch: Date | null;
                    reuse_count: number | null;
                    rtls_attempts: number | null;
                    rtls_landings: number | null;
                    status: string | null;
                    water_landing: boolean | null;
                } | null;
                flight: number | null;
                gridfins: boolean | null;
                land_success: boolean | null;
                landing_intent: boolean | null;
                landing_type: string | null;
                landing_vehicle: string | null;
                legs: boolean | null;
                reused: boolean | null;
            } | null)[] | null;
        } | null;
        rocket: {
            active: boolean | null;
            boosters: number | null;
            company: string | null;
            cost_per_launch: number | null;
            country: string | null;
            description: string | null;
            diameter: {
                feet: number | null;
                meters: number | null;
            } | null;
            engines: {
                engine_loss_max: string | null;
                layout: string | null;
                number: number | null;
                propellant_1: string | null;
                propellant_2: string | null;
                thrust_sea_level: {
                    kN: number | null;
                    lbf: number | null;
                } | null;
                thrust_to_weight: number | null;
                thrust_vacuum: {
                    kN: number | null;
                    lbf: number | null;
                } | null;
                type: string | null;
                version: string | null;
            } | null;
            first_flight: Date | null;
            first_stage: {
                burn_time_sec: number | null;
                engines: number | null;
                fuel_amount_tons: number | null;
                reusable: boolean | null;
                thrust_sea_level: {
                    kN: number | null;
                    lbf: number | null;
                } | null;
                thrust_vacuum: {
                    kN: number | null;
                    lbf: number | null;
                } | null;
            } | null;
            height: {
                feet: number | null;
                meters: number | null;
            } | null;
            id: string | null;
            landing_legs: {
                material: string | null;
                number: number | null;
            } | null;
            mass: {
                kg: number | null;
                lb: number | null;
            } | null;
            name: string | null;
            payload_weights: ({
                id: string | null;
                kg: number | null;
                lb: number | null;
                name: string | null;
            } | null)[] | null;
            second_stage: {
                burn_time_sec: number | null;
                engines: number | null;
                fuel_amount_tons: number | null;
                payloads: {
                    composite_fairing: {
                        diameter: {
                            feet: number | null;
                            meters: number | null;
                        } | null;
                        height: {
                            feet: number | null;
                            meters: number | null;
                        } | null;
                    } | null;
                    option_1: string | null;
                } | null;
                thrust: {
                    kN: number | null;
                    lbf: number | null;
                } | null;
            } | null;
            stages: number | null;
            success_rate_pct: number | null;
            type: string | null;
            wikipedia: string | null;
        } | null;
        rocket_name: string | null;
        rocket_type: string | null;
        second_stage: {
            block: number | null;
            payloads: ({
                customers: (string | null)[] | null;
                id: string | null;
                manufacturer: string | null;
                nationality: string | null;
                norad_id: (number | null)[] | null;
                orbit: string | null;
                orbit_params: {
                    apoapsis_km: number | null;
                    arg_of_pericenter: number | null;
                    eccentricity: number | null;
                    epoch: Date | null;
                    inclination_deg: number | null;
                    lifespan_years: number | null;
                    longitude: number | null;
                    mean_anomaly: number | null;
                    mean_motion: number | null;
                    periapsis_km: number | null;
                    period_min: number | null;
                    raan: number | null;
                    reference_system: string | null;
                    regime: string | null;
                    semi_major_axis_km: number | null;
                } | null;
                payload_mass_kg: number | null;
                payload_mass_lbs: number | null;
                payload_type: string | null;
                reused: boolean | null;
            } | null)[] | null;
        } | null;
    };
    LaunchRocketFairings: {
        recovered: boolean | null;
        recovery_attempt: boolean | null;
        reused: boolean | null;
        ship: string | null;
    };
    LaunchRocketFirstStage: {
        cores: ({
            block: number | null;
            core: {
                asds_attempts: number | null;
                asds_landings: number | null;
                block: number | null;
                id: string | null;
                missions: ({
                    flight: number | null;
                    name: string | null;
                } | null)[] | null;
                original_launch: Date | null;
                reuse_count: number | null;
                rtls_attempts: number | null;
                rtls_landings: number | null;
                status: string | null;
                water_landing: boolean | null;
            } | null;
            flight: number | null;
            gridfins: boolean | null;
            land_success: boolean | null;
            landing_intent: boolean | null;
            landing_type: string | null;
            landing_vehicle: string | null;
            legs: boolean | null;
            reused: boolean | null;
        } | null)[] | null;
    };
    LaunchRocketFirstStageCore: {
        block: number | null;
        core: {
            asds_attempts: number | null;
            asds_landings: number | null;
            block: number | null;
            id: string | null;
            missions: ({
                flight: number | null;
                name: string | null;
            } | null)[] | null;
            original_launch: Date | null;
            reuse_count: number | null;
            rtls_attempts: number | null;
            rtls_landings: number | null;
            status: string | null;
            water_landing: boolean | null;
        } | null;
        flight: number | null;
        gridfins: boolean | null;
        land_success: boolean | null;
        landing_intent: boolean | null;
        landing_type: string | null;
        landing_vehicle: string | null;
        legs: boolean | null;
        reused: boolean | null;
    };
    LaunchRocketSecondStage: {
        block: number | null;
        payloads: ({
            customers: (string | null)[] | null;
            id: string | null;
            manufacturer: string | null;
            nationality: string | null;
            norad_id: (number | null)[] | null;
            orbit: string | null;
            orbit_params: {
                apoapsis_km: number | null;
                arg_of_pericenter: number | null;
                eccentricity: number | null;
                epoch: Date | null;
                inclination_deg: number | null;
                lifespan_years: number | null;
                longitude: number | null;
                mean_anomaly: number | null;
                mean_motion: number | null;
                periapsis_km: number | null;
                period_min: number | null;
                raan: number | null;
                reference_system: string | null;
                regime: string | null;
                semi_major_axis_km: number | null;
            } | null;
            payload_mass_kg: number | null;
            payload_mass_lbs: number | null;
            payload_type: string | null;
            reused: boolean | null;
        } | null)[] | null;
    };
    LaunchSite: {
        site_id: string | null;
        site_name: string | null;
        site_name_long: string | null;
    };
    LaunchTelemetry: {
        flight_club: string | null;
    };
    LaunchesPastResult: {
        data: ({
            details: string | null;
            id: string | null;
            is_tentative: boolean | null;
            launch_date_local: Date | null;
            launch_date_unix: Date | null;
            launch_date_utc: Date | null;
            launch_site: {
                site_id: string | null;
                site_name: string | null;
                site_name_long: string | null;
            } | null;
            launch_success: boolean | null;
            launch_year: string | null;
            links: {
                article_link: string | null;
                flickr_images: (string | null)[] | null;
                mission_patch: string | null;
                mission_patch_small: string | null;
                presskit: string | null;
                reddit_campaign: string | null;
                reddit_launch: string | null;
                reddit_media: string | null;
                reddit_recovery: string | null;
                video_link: string | null;
                wikipedia: string | null;
            } | null;
            mission_id: (string | null)[] | null;
            mission_name: string | null;
            rocket: {
                fairings: {
                    recovered: boolean | null;
                    recovery_attempt: boolean | null;
                    reused: boolean | null;
                    ship: string | null;
                } | null;
                first_stage: {
                    cores: ({
                        block: number | null;
                        core: {
                            asds_attempts: number | null;
                            asds_landings: number | null;
                            block: number | null;
                            id: string | null;
                            missions: ({
                                flight: number | null;
                                name: string | null;
                            } | null)[] | null;
                            original_launch: Date | null;
                            reuse_count: number | null;
                            rtls_attempts: number | null;
                            rtls_landings: number | null;
                            status: string | null;
                            water_landing: boolean | null;
                        } | null;
                        flight: number | null;
                        gridfins: boolean | null;
                        land_success: boolean | null;
                        landing_intent: boolean | null;
                        landing_type: string | null;
                        landing_vehicle: string | null;
                        legs: boolean | null;
                        reused: boolean | null;
                    } | null)[] | null;
                } | null;
                rocket: {
                    active: boolean | null;
                    boosters: number | null;
                    company: string | null;
                    cost_per_launch: number | null;
                    country: string | null;
                    description: string | null;
                    diameter: {
                        feet: number | null;
                        meters: number | null;
                    } | null;
                    engines: {
                        engine_loss_max: string | null;
                        layout: string | null;
                        number: number | null;
                        propellant_1: string | null;
                        propellant_2: string | null;
                        thrust_sea_level: {
                            kN: number | null;
                            lbf: number | null;
                        } | null;
                        thrust_to_weight: number | null;
                        thrust_vacuum: {
                            kN: number | null;
                            lbf: number | null;
                        } | null;
                        type: string | null;
                        version: string | null;
                    } | null;
                    first_flight: Date | null;
                    first_stage: {
                        burn_time_sec: number | null;
                        engines: number | null;
                        fuel_amount_tons: number | null;
                        reusable: boolean | null;
                        thrust_sea_level: {
                            kN: number | null;
                            lbf: number | null;
                        } | null;
                        thrust_vacuum: {
                            kN: number | null;
                            lbf: number | null;
                        } | null;
                    } | null;
                    height: {
                        feet: number | null;
                        meters: number | null;
                    } | null;
                    id: string | null;
                    landing_legs: {
                        material: string | null;
                        number: number | null;
                    } | null;
                    mass: {
                        kg: number | null;
                        lb: number | null;
                    } | null;
                    name: string | null;
                    payload_weights: ({
                        id: string | null;
                        kg: number | null;
                        lb: number | null;
                        name: string | null;
                    } | null)[] | null;
                    second_stage: {
                        burn_time_sec: number | null;
                        engines: number | null;
                        fuel_amount_tons: number | null;
                        payloads: {
                            composite_fairing: {
                                diameter: {
                                    feet: number | null;
                                    meters: number | null;
                                } | null;
                                height: {
                                    feet: number | null;
                                    meters: number | null;
                                } | null;
                            } | null;
                            option_1: string | null;
                        } | null;
                        thrust: {
                            kN: number | null;
                            lbf: number | null;
                        } | null;
                    } | null;
                    stages: number | null;
                    success_rate_pct: number | null;
                    type: string | null;
                    wikipedia: string | null;
                } | null;
                rocket_name: string | null;
                rocket_type: string | null;
                second_stage: {
                    block: number | null;
                    payloads: ({
                        customers: (string | null)[] | null;
                        id: string | null;
                        manufacturer: string | null;
                        nationality: string | null;
                        norad_id: (number | null)[] | null;
                        orbit: string | null;
                        orbit_params: {
                            apoapsis_km: number | null;
                            arg_of_pericenter: number | null;
                            eccentricity: number | null;
                            epoch: Date | null;
                            inclination_deg: number | null;
                            lifespan_years: number | null;
                            longitude: number | null;
                            mean_anomaly: number | null;
                            mean_motion: number | null;
                            periapsis_km: number | null;
                            period_min: number | null;
                            raan: number | null;
                            reference_system: string | null;
                            regime: string | null;
                            semi_major_axis_km: number | null;
                        } | null;
                        payload_mass_kg: number | null;
                        payload_mass_lbs: number | null;
                        payload_type: string | null;
                        reused: boolean | null;
                    } | null)[] | null;
                } | null;
            } | null;
            ships: ({
                abs: number | null;
                active: boolean | null;
                attempted_landings: number | null;
                class: number | null;
                course_deg: number | null;
                home_port: string | null;
                id: string | null;
                image: string | null;
                imo: number | null;
                missions: ({
                    flight: string | null;
                    name: string | null;
                } | null)[] | null;
                mmsi: number | null;
                model: string | null;
                name: string | null;
                position: {
                    latitude: number | null;
                    longitude: number | null;
                } | null;
                roles: (string | null)[] | null;
                speed_kn: number | null;
                status: string | null;
                successful_landings: number | null;
                type: string | null;
                url: string | null;
                weight_kg: number | null;
                weight_lbs: number | null;
                year_built: number | null;
            } | null)[] | null;
            static_fire_date_unix: Date | null;
            static_fire_date_utc: Date | null;
            telemetry: {
                flight_club: string | null;
            } | null;
            tentative_max_precision: string | null;
            upcoming: boolean | null;
        } | null)[] | null;
        result: {
            totalCount: number | null;
        } | null;
    };
    Launchpad: {
        attempted_launches: number | null;
        details: string | null;
        id: string | null;
        location: {
            latitude: number | null;
            longitude: number | null;
            name: string | null;
            region: string | null;
        } | null;
        name: string | null;
        status: string | null;
        successful_launches: number | null;
        vehicles_launched: ({
            active: boolean | null;
            boosters: number | null;
            company: string | null;
            cost_per_launch: number | null;
            country: string | null;
            description: string | null;
            diameter: {
                feet: number | null;
                meters: number | null;
            } | null;
            engines: {
                engine_loss_max: string | null;
                layout: string | null;
                number: number | null;
                propellant_1: string | null;
                propellant_2: string | null;
                thrust_sea_level: {
                    kN: number | null;
                    lbf: number | null;
                } | null;
                thrust_to_weight: number | null;
                thrust_vacuum: {
                    kN: number | null;
                    lbf: number | null;
                } | null;
                type: string | null;
                version: string | null;
            } | null;
            first_flight: Date | null;
            first_stage: {
                burn_time_sec: number | null;
                engines: number | null;
                fuel_amount_tons: number | null;
                reusable: boolean | null;
                thrust_sea_level: {
                    kN: number | null;
                    lbf: number | null;
                } | null;
                thrust_vacuum: {
                    kN: number | null;
                    lbf: number | null;
                } | null;
            } | null;
            height: {
                feet: number | null;
                meters: number | null;
            } | null;
            id: string | null;
            landing_legs: {
                material: string | null;
                number: number | null;
            } | null;
            mass: {
                kg: number | null;
                lb: number | null;
            } | null;
            name: string | null;
            payload_weights: ({
                id: string | null;
                kg: number | null;
                lb: number | null;
                name: string | null;
            } | null)[] | null;
            second_stage: {
                burn_time_sec: number | null;
                engines: number | null;
                fuel_amount_tons: number | null;
                payloads: {
                    composite_fairing: {
                        diameter: {
                            feet: number | null;
                            meters: number | null;
                        } | null;
                        height: {
                            feet: number | null;
                            meters: number | null;
                        } | null;
                    } | null;
                    option_1: string | null;
                } | null;
                thrust: {
                    kN: number | null;
                    lbf: number | null;
                } | null;
            } | null;
            stages: number | null;
            success_rate_pct: number | null;
            type: string | null;
            wikipedia: string | null;
        } | null)[] | null;
        wikipedia: string | null;
    };
    Link: {
        article: string | null;
        reddit: string | null;
        wikipedia: string | null;
    };
    Location: {
        latitude: number | null;
        longitude: number | null;
        name: string | null;
        region: string | null;
    };
    Mass: {
        kg: number | null;
        lb: number | null;
    };
    Mission: {
        description: string | null;
        id: string | null;
        manufacturers: (string | null)[] | null;
        name: string | null;
        payloads: ({
            customers: (string | null)[] | null;
            id: string | null;
            manufacturer: string | null;
            nationality: string | null;
            norad_id: (number | null)[] | null;
            orbit: string | null;
            orbit_params: {
                apoapsis_km: number | null;
                arg_of_pericenter: number | null;
                eccentricity: number | null;
                epoch: Date | null;
                inclination_deg: number | null;
                lifespan_years: number | null;
                longitude: number | null;
                mean_anomaly: number | null;
                mean_motion: number | null;
                periapsis_km: number | null;
                period_min: number | null;
                raan: number | null;
                reference_system: string | null;
                regime: string | null;
                semi_major_axis_km: number | null;
            } | null;
            payload_mass_kg: number | null;
            payload_mass_lbs: number | null;
            payload_type: string | null;
            reused: boolean | null;
        } | null)[] | null;
        twitter: string | null;
        website: string | null;
        wikipedia: string | null;
    };
    MissionResult: {
        data: ({
            description: string | null;
            id: string | null;
            manufacturers: (string | null)[] | null;
            name: string | null;
            payloads: ({
                customers: (string | null)[] | null;
                id: string | null;
                manufacturer: string | null;
                nationality: string | null;
                norad_id: (number | null)[] | null;
                orbit: string | null;
                orbit_params: {
                    apoapsis_km: number | null;
                    arg_of_pericenter: number | null;
                    eccentricity: number | null;
                    epoch: Date | null;
                    inclination_deg: number | null;
                    lifespan_years: number | null;
                    longitude: number | null;
                    mean_anomaly: number | null;
                    mean_motion: number | null;
                    periapsis_km: number | null;
                    period_min: number | null;
                    raan: number | null;
                    reference_system: string | null;
                    regime: string | null;
                    semi_major_axis_km: number | null;
                } | null;
                payload_mass_kg: number | null;
                payload_mass_lbs: number | null;
                payload_type: string | null;
                reused: boolean | null;
            } | null)[] | null;
            twitter: string | null;
            website: string | null;
            wikipedia: string | null;
        } | null)[] | null;
        result: {
            totalCount: number | null;
        } | null;
    };
    MissionsFind: {
        id: string | null;
        manufacturer: string | null;
        name: string | null;
        payload_id: string | null;
    };
    Mutation: {
        delete_users: (p: {
            where: {
                _and: (any | null)[] | null;
                _not: any | null;
                _or: (any | null)[] | null;
                id: {
                    _eq: string | null;
                    _gt: string | null;
                    _gte: string | null;
                    _in: string[] | null;
                    _is_null: boolean | null;
                    _lt: string | null;
                    _lte: string | null;
                    _neq: string | null;
                    _nin: string[] | null;
                } | null;
                name: {
                    _eq: string | null;
                    _gt: string | null;
                    _gte: string | null;
                    _ilike: string | null;
                    _in: string[] | null;
                    _is_null: boolean | null;
                    _like: string | null;
                    _lt: string | null;
                    _lte: string | null;
                    _neq: string | null;
                    _nilike: string | null;
                    _nin: string[] | null;
                    _nlike: string | null;
                    _nsimilar: string | null;
                    _similar: string | null;
                } | null;
                rocket: {
                    _eq: string | null;
                    _gt: string | null;
                    _gte: string | null;
                    _ilike: string | null;
                    _in: string[] | null;
                    _is_null: boolean | null;
                    _like: string | null;
                    _lt: string | null;
                    _lte: string | null;
                    _neq: string | null;
                    _nilike: string | null;
                    _nin: string[] | null;
                    _nlike: string | null;
                    _nsimilar: string | null;
                    _similar: string | null;
                } | null;
                timestamp: {
                    _eq: string | null;
                    _gt: string | null;
                    _gte: string | null;
                    _in: string[] | null;
                    _is_null: boolean | null;
                    _lt: string | null;
                    _lte: string | null;
                    _neq: string | null;
                    _nin: string[] | null;
                } | null;
                twitter: {
                    _eq: string | null;
                    _gt: string | null;
                    _gte: string | null;
                    _ilike: string | null;
                    _in: string[] | null;
                    _is_null: boolean | null;
                    _like: string | null;
                    _lt: string | null;
                    _lte: string | null;
                    _neq: string | null;
                    _nilike: string | null;
                    _nin: string[] | null;
                    _nlike: string | null;
                    _nsimilar: string | null;
                    _similar: string | null;
                } | null;
            };
        }) => {
            affected_rows: number;
            returning: {
                id: string;
                name: string | null;
                rocket: string | null;
                timestamp: string;
                twitter: string | null;
            }[];
        } | null;
        insert_users: (p: {
            objects: {
                id: string | null;
                name: string | null;
                rocket: string | null;
                timestamp: string | null;
                twitter: string | null;
            }[];
            on_conflict?: {
                constraint: "key" | "constraint" | "unique" | "or" | "primary" | "users_pkey";
                update_columns: ("name" | "id" | "rocket" | "twitter" | "timestamp" | "column")[];
            } | undefined;
        }) => {
            affected_rows: number;
            returning: {
                id: string;
                name: string | null;
                rocket: string | null;
                timestamp: string;
                twitter: string | null;
            }[];
        } | null;
        update_users: (p: {
            _set?: {
                id: string | null;
                name: string | null;
                rocket: string | null;
                timestamp: string | null;
                twitter: string | null;
            } | undefined;
            where: {
                _and: (any | null)[] | null;
                _not: any | null;
                _or: (any | null)[] | null;
                id: {
                    _eq: string | null;
                    _gt: string | null;
                    _gte: string | null;
                    _in: string[] | null;
                    _is_null: boolean | null;
                    _lt: string | null;
                    _lte: string | null;
                    _neq: string | null;
                    _nin: string[] | null;
                } | null;
                name: {
                    _eq: string | null;
                    _gt: string | null;
                    _gte: string | null;
                    _ilike: string | null;
                    _in: string[] | null;
                    _is_null: boolean | null;
                    _like: string | null;
                    _lt: string | null;
                    _lte: string | null;
                    _neq: string | null;
                    _nilike: string | null;
                    _nin: string[] | null;
                    _nlike: string | null;
                    _nsimilar: string | null;
                    _similar: string | null;
                } | null;
                rocket: {
                    _eq: string | null;
                    _gt: string | null;
                    _gte: string | null;
                    _ilike: string | null;
                    _in: string[] | null;
                    _is_null: boolean | null;
                    _like: string | null;
                    _lt: string | null;
                    _lte: string | null;
                    _neq: string | null;
                    _nilike: string | null;
                    _nin: string[] | null;
                    _nlike: string | null;
                    _nsimilar: string | null;
                    _similar: string | null;
                } | null;
                timestamp: {
                    _eq: string | null;
                    _gt: string | null;
                    _gte: string | null;
                    _in: string[] | null;
                    _is_null: boolean | null;
                    _lt: string | null;
                    _lte: string | null;
                    _neq: string | null;
                    _nin: string[] | null;
                } | null;
                twitter: {
                    _eq: string | null;
                    _gt: string | null;
                    _gte: string | null;
                    _ilike: string | null;
                    _in: string[] | null;
                    _is_null: boolean | null;
                    _like: string | null;
                    _lt: string | null;
                    _lte: string | null;
                    _neq: string | null;
                    _nilike: string | null;
                    _nin: string[] | null;
                    _nlike: string | null;
                    _nsimilar: string | null;
                    _similar: string | null;
                } | null;
            };
        }) => {
            affected_rows: number;
            returning: {
                id: string;
                name: string | null;
                rocket: string | null;
                timestamp: string;
                twitter: string | null;
            }[];
        } | null;
    };
    Payload: {
        customers: (string | null)[] | null;
        id: string | null;
        manufacturer: string | null;
        nationality: string | null;
        norad_id: (number | null)[] | null;
        orbit: string | null;
        orbit_params: {
            apoapsis_km: number | null;
            arg_of_pericenter: number | null;
            eccentricity: number | null;
            epoch: Date | null;
            inclination_deg: number | null;
            lifespan_years: number | null;
            longitude: number | null;
            mean_anomaly: number | null;
            mean_motion: number | null;
            periapsis_km: number | null;
            period_min: number | null;
            raan: number | null;
            reference_system: string | null;
            regime: string | null;
            semi_major_axis_km: number | null;
        } | null;
        payload_mass_kg: number | null;
        payload_mass_lbs: number | null;
        payload_type: string | null;
        reused: boolean | null;
    };
    PayloadOrbitParams: {
        apoapsis_km: number | null;
        arg_of_pericenter: number | null;
        eccentricity: number | null;
        epoch: Date | null;
        inclination_deg: number | null;
        lifespan_years: number | null;
        longitude: number | null;
        mean_anomaly: number | null;
        mean_motion: number | null;
        periapsis_km: number | null;
        period_min: number | null;
        raan: number | null;
        reference_system: string | null;
        regime: string | null;
        semi_major_axis_km: number | null;
    };
    PayloadsFind: {
        apoapsis_km: number | null;
        customer: string | null;
        eccentricity: number | null;
        epoch: Date | null;
        inclination_deg: number | null;
        lifespan_years: number | null;
        longitude: number | null;
        manufacturer: string | null;
        mean_motion: number | null;
        nationality: string | null;
        norad_id: number | null;
        orbit: string | null;
        payload_id: string | null;
        payload_type: string | null;
        periapsis_km: number | null;
        period_min: number | null;
        raan: number | null;
        reference_system: string | null;
        regime: string | null;
        reused: boolean | null;
        semi_major_axis_km: number | null;
    };
    Query: {
        capsule: (p: {
            id: string;
        }) => {
            dragon: {
                active: boolean | null;
                crew_capacity: number | null;
                description: string | null;
                diameter: {
                    feet: number | null;
                    meters: number | null;
                } | null;
                dry_mass_kg: number | null;
                dry_mass_lb: number | null;
                first_flight: string | null;
                heat_shield: {
                    dev_partner: string | null;
                    material: string | null;
                    size_meters: number | null;
                    temp_degrees: number | null;
                } | null;
                height_w_trunk: {
                    feet: number | null;
                    meters: number | null;
                } | null;
                id: string | null;
                launch_payload_mass: {
                    kg: number | null;
                    lb: number | null;
                } | null;
                launch_payload_vol: {
                    cubic_feet: number | null;
                    cubic_meters: number | null;
                } | null;
                name: string | null;
                orbit_duration_yr: number | null;
                pressurized_capsule: {
                    payload_volume: {
                        cubic_feet: number | null;
                        cubic_meters: number | null;
                    } | null;
                } | null;
                return_payload_mass: {
                    kg: number | null;
                    lb: number | null;
                } | null;
                return_payload_vol: {
                    cubic_feet: number | null;
                    cubic_meters: number | null;
                } | null;
                sidewall_angle_deg: number | null;
                thrusters: ({
                    amount: number | null;
                    fuel_1: string | null;
                    fuel_2: string | null;
                    pods: number | null;
                    thrust: {
                        kN: number | null;
                        lbf: number | null;
                    } | null;
                    type: string | null;
                } | null)[] | null;
                trunk: {
                    cargo: {
                        solar_array: number | null;
                        unpressurized_cargo: boolean | null;
                    } | null;
                    trunk_volume: {
                        cubic_feet: number | null;
                        cubic_meters: number | null;
                    } | null;
                } | null;
                type: string | null;
                wikipedia: string | null;
            } | null;
        } | null;
        capsules: (p?: {
            find?: {
                id: string | null;
                landings: number | null;
                mission: string | null;
                original_launch: Date | null;
                reuse_count: number | null;
                status: string | null;
                type: string | null;
            } | undefined;
            limit?: number | undefined;
            offset?: number | undefined;
            order?: string | undefined;
            sort?: string | undefined;
        } | undefined) => ({
            dragon: {
                active: boolean | null;
                crew_capacity: number | null;
                description: string | null;
                diameter: {
                    feet: number | null;
                    meters: number | null;
                } | null;
                dry_mass_kg: number | null;
                dry_mass_lb: number | null;
                first_flight: string | null;
                heat_shield: {
                    dev_partner: string | null;
                    material: string | null;
                    size_meters: number | null;
                    temp_degrees: number | null;
                } | null;
                height_w_trunk: {
                    feet: number | null;
                    meters: number | null;
                } | null;
                id: string | null;
                launch_payload_mass: {
                    kg: number | null;
                    lb: number | null;
                } | null;
                launch_payload_vol: {
                    cubic_feet: number | null;
                    cubic_meters: number | null;
                } | null;
                name: string | null;
                orbit_duration_yr: number | null;
                pressurized_capsule: {
                    payload_volume: {
                        cubic_feet: number | null;
                        cubic_meters: number | null;
                    } | null;
                } | null;
                return_payload_mass: {
                    kg: number | null;
                    lb: number | null;
                } | null;
                return_payload_vol: {
                    cubic_feet: number | null;
                    cubic_meters: number | null;
                } | null;
                sidewall_angle_deg: number | null;
                thrusters: ({
                    amount: number | null;
                    fuel_1: string | null;
                    fuel_2: string | null;
                    pods: number | null;
                    thrust: {
                        kN: number | null;
                        lbf: number | null;
                    } | null;
                    type: string | null;
                } | null)[] | null;
                trunk: {
                    cargo: {
                        solar_array: number | null;
                        unpressurized_cargo: boolean | null;
                    } | null;
                    trunk_volume: {
                        cubic_feet: number | null;
                        cubic_meters: number | null;
                    } | null;
                } | null;
                type: string | null;
                wikipedia: string | null;
            } | null;
        } | null)[] | null;
        capsulesPast: (p?: {
            find?: {
                id: string | null;
                landings: number | null;
                mission: string | null;
                original_launch: Date | null;
                reuse_count: number | null;
                status: string | null;
                type: string | null;
            } | undefined;
            limit?: number | undefined;
            offset?: number | undefined;
            order?: string | undefined;
            sort?: string | undefined;
        } | undefined) => ({
            dragon: {
                active: boolean | null;
                crew_capacity: number | null;
                description: string | null;
                diameter: {
                    feet: number | null;
                    meters: number | null;
                } | null;
                dry_mass_kg: number | null;
                dry_mass_lb: number | null;
                first_flight: string | null;
                heat_shield: {
                    dev_partner: string | null;
                    material: string | null;
                    size_meters: number | null;
                    temp_degrees: number | null;
                } | null;
                height_w_trunk: {
                    feet: number | null;
                    meters: number | null;
                } | null;
                id: string | null;
                launch_payload_mass: {
                    kg: number | null;
                    lb: number | null;
                } | null;
                launch_payload_vol: {
                    cubic_feet: number | null;
                    cubic_meters: number | null;
                } | null;
                name: string | null;
                orbit_duration_yr: number | null;
                pressurized_capsule: {
                    payload_volume: {
                        cubic_feet: number | null;
                        cubic_meters: number | null;
                    } | null;
                } | null;
                return_payload_mass: {
                    kg: number | null;
                    lb: number | null;
                } | null;
                return_payload_vol: {
                    cubic_feet: number | null;
                    cubic_meters: number | null;
                } | null;
                sidewall_angle_deg: number | null;
                thrusters: ({
                    amount: number | null;
                    fuel_1: string | null;
                    fuel_2: string | null;
                    pods: number | null;
                    thrust: {
                        kN: number | null;
                        lbf: number | null;
                    } | null;
                    type: string | null;
                } | null)[] | null;
                trunk: {
                    cargo: {
                        solar_array: number | null;
                        unpressurized_cargo: boolean | null;
                    } | null;
                    trunk_volume: {
                        cubic_feet: number | null;
                        cubic_meters: number | null;
                    } | null;
                } | null;
                type: string | null;
                wikipedia: string | null;
            } | null;
        } | null)[] | null;
        capsulesUpcoming: (p?: {
            find?: {
                id: string | null;
                landings: number | null;
                mission: string | null;
                original_launch: Date | null;
                reuse_count: number | null;
                status: string | null;
                type: string | null;
            } | undefined;
            limit?: number | undefined;
            offset?: number | undefined;
            order?: string | undefined;
            sort?: string | undefined;
        } | undefined) => ({
            dragon: {
                active: boolean | null;
                crew_capacity: number | null;
                description: string | null;
                diameter: {
                    feet: number | null;
                    meters: number | null;
                } | null;
                dry_mass_kg: number | null;
                dry_mass_lb: number | null;
                first_flight: string | null;
                heat_shield: {
                    dev_partner: string | null;
                    material: string | null;
                    size_meters: number | null;
                    temp_degrees: number | null;
                } | null;
                height_w_trunk: {
                    feet: number | null;
                    meters: number | null;
                } | null;
                id: string | null;
                launch_payload_mass: {
                    kg: number | null;
                    lb: number | null;
                } | null;
                launch_payload_vol: {
                    cubic_feet: number | null;
                    cubic_meters: number | null;
                } | null;
                name: string | null;
                orbit_duration_yr: number | null;
                pressurized_capsule: {
                    payload_volume: {
                        cubic_feet: number | null;
                        cubic_meters: number | null;
                    } | null;
                } | null;
                return_payload_mass: {
                    kg: number | null;
                    lb: number | null;
                } | null;
                return_payload_vol: {
                    cubic_feet: number | null;
                    cubic_meters: number | null;
                } | null;
                sidewall_angle_deg: number | null;
                thrusters: ({
                    amount: number | null;
                    fuel_1: string | null;
                    fuel_2: string | null;
                    pods: number | null;
                    thrust: {
                        kN: number | null;
                        lbf: number | null;
                    } | null;
                    type: string | null;
                } | null)[] | null;
                trunk: {
                    cargo: {
                        solar_array: number | null;
                        unpressurized_cargo: boolean | null;
                    } | null;
                    trunk_volume: {
                        cubic_feet: number | null;
                        cubic_meters: number | null;
                    } | null;
                } | null;
                type: string | null;
                wikipedia: string | null;
            } | null;
        } | null)[] | null;
        company: {
            ceo: string | null;
            coo: string | null;
            cto: string | null;
            cto_propulsion: string | null;
            employees: number | null;
            founded: number | null;
            founder: string | null;
            headquarters: {
                address: string | null;
                city: string | null;
                state: string | null;
            } | null;
            launch_sites: number | null;
            links: {
                elon_twitter: string | null;
                flickr: string | null;
                twitter: string | null;
                website: string | null;
            } | null;
            name: string | null;
            summary: string | null;
            test_sites: number | null;
            valuation: number | null;
            vehicles: number | null;
        } | null;
        core: (p: {
            id: string;
        }) => {
            asds_attempts: number | null;
            asds_landings: number | null;
            block: number | null;
            id: string | null;
            missions: ({
                flight: number | null;
                name: string | null;
            } | null)[] | null;
            original_launch: Date | null;
            reuse_count: number | null;
            rtls_attempts: number | null;
            rtls_landings: number | null;
            status: string | null;
            water_landing: boolean | null;
        } | null;
        cores: (p?: {
            find?: {
                asds_attempts: number | null;
                asds_landings: number | null;
                block: number | null;
                id: string | null;
                missions: string | null;
                original_launch: Date | null;
                reuse_count: number | null;
                rtls_attempts: number | null;
                rtls_landings: number | null;
                status: string | null;
                water_landing: boolean | null;
            } | undefined;
            limit?: number | undefined;
            offset?: number | undefined;
            order?: string | undefined;
            sort?: string | undefined;
        } | undefined) => ({
            asds_attempts: number | null;
            asds_landings: number | null;
            block: number | null;
            id: string | null;
            missions: ({
                flight: number | null;
                name: string | null;
            } | null)[] | null;
            original_launch: Date | null;
            reuse_count: number | null;
            rtls_attempts: number | null;
            rtls_landings: number | null;
            status: string | null;
            water_landing: boolean | null;
        } | null)[] | null;
        coresPast: (p?: {
            find?: {
                asds_attempts: number | null;
                asds_landings: number | null;
                block: number | null;
                id: string | null;
                missions: string | null;
                original_launch: Date | null;
                reuse_count: number | null;
                rtls_attempts: number | null;
                rtls_landings: number | null;
                status: string | null;
                water_landing: boolean | null;
            } | undefined;
            limit?: number | undefined;
            offset?: number | undefined;
            order?: string | undefined;
            sort?: string | undefined;
        } | undefined) => ({
            asds_attempts: number | null;
            asds_landings: number | null;
            block: number | null;
            id: string | null;
            missions: ({
                flight: number | null;
                name: string | null;
            } | null)[] | null;
            original_launch: Date | null;
            reuse_count: number | null;
            rtls_attempts: number | null;
            rtls_landings: number | null;
            status: string | null;
            water_landing: boolean | null;
        } | null)[] | null;
        coresUpcoming: (p?: {
            find?: {
                asds_attempts: number | null;
                asds_landings: number | null;
                block: number | null;
                id: string | null;
                missions: string | null;
                original_launch: Date | null;
                reuse_count: number | null;
                rtls_attempts: number | null;
                rtls_landings: number | null;
                status: string | null;
                water_landing: boolean | null;
            } | undefined;
            limit?: number | undefined;
            offset?: number | undefined;
            order?: string | undefined;
            sort?: string | undefined;
        } | undefined) => ({
            asds_attempts: number | null;
            asds_landings: number | null;
            block: number | null;
            id: string | null;
            missions: ({
                flight: number | null;
                name: string | null;
            } | null)[] | null;
            original_launch: Date | null;
            reuse_count: number | null;
            rtls_attempts: number | null;
            rtls_landings: number | null;
            status: string | null;
            water_landing: boolean | null;
        } | null)[] | null;
        dragon: (p: {
            id: string;
        }) => {
            active: boolean | null;
            crew_capacity: number | null;
            description: string | null;
            diameter: {
                feet: number | null;
                meters: number | null;
            } | null;
            dry_mass_kg: number | null;
            dry_mass_lb: number | null;
            first_flight: string | null;
            heat_shield: {
                dev_partner: string | null;
                material: string | null;
                size_meters: number | null;
                temp_degrees: number | null;
            } | null;
            height_w_trunk: {
                feet: number | null;
                meters: number | null;
            } | null;
            id: string | null;
            launch_payload_mass: {
                kg: number | null;
                lb: number | null;
            } | null;
            launch_payload_vol: {
                cubic_feet: number | null;
                cubic_meters: number | null;
            } | null;
            name: string | null;
            orbit_duration_yr: number | null;
            pressurized_capsule: {
                payload_volume: {
                    cubic_feet: number | null;
                    cubic_meters: number | null;
                } | null;
            } | null;
            return_payload_mass: {
                kg: number | null;
                lb: number | null;
            } | null;
            return_payload_vol: {
                cubic_feet: number | null;
                cubic_meters: number | null;
            } | null;
            sidewall_angle_deg: number | null;
            thrusters: ({
                amount: number | null;
                fuel_1: string | null;
                fuel_2: string | null;
                pods: number | null;
                thrust: {
                    kN: number | null;
                    lbf: number | null;
                } | null;
                type: string | null;
            } | null)[] | null;
            trunk: {
                cargo: {
                    solar_array: number | null;
                    unpressurized_cargo: boolean | null;
                } | null;
                trunk_volume: {
                    cubic_feet: number | null;
                    cubic_meters: number | null;
                } | null;
            } | null;
            type: string | null;
            wikipedia: string | null;
        } | null;
        dragons: (p?: {
            limit?: number | undefined;
            offset?: number | undefined;
        } | undefined) => ({
            active: boolean | null;
            crew_capacity: number | null;
            description: string | null;
            diameter: {
                feet: number | null;
                meters: number | null;
            } | null;
            dry_mass_kg: number | null;
            dry_mass_lb: number | null;
            first_flight: string | null;
            heat_shield: {
                dev_partner: string | null;
                material: string | null;
                size_meters: number | null;
                temp_degrees: number | null;
            } | null;
            height_w_trunk: {
                feet: number | null;
                meters: number | null;
            } | null;
            id: string | null;
            launch_payload_mass: {
                kg: number | null;
                lb: number | null;
            } | null;
            launch_payload_vol: {
                cubic_feet: number | null;
                cubic_meters: number | null;
            } | null;
            name: string | null;
            orbit_duration_yr: number | null;
            pressurized_capsule: {
                payload_volume: {
                    cubic_feet: number | null;
                    cubic_meters: number | null;
                } | null;
            } | null;
            return_payload_mass: {
                kg: number | null;
                lb: number | null;
            } | null;
            return_payload_vol: {
                cubic_feet: number | null;
                cubic_meters: number | null;
            } | null;
            sidewall_angle_deg: number | null;
            thrusters: ({
                amount: number | null;
                fuel_1: string | null;
                fuel_2: string | null;
                pods: number | null;
                thrust: {
                    kN: number | null;
                    lbf: number | null;
                } | null;
                type: string | null;
            } | null)[] | null;
            trunk: {
                cargo: {
                    solar_array: number | null;
                    unpressurized_cargo: boolean | null;
                } | null;
                trunk_volume: {
                    cubic_feet: number | null;
                    cubic_meters: number | null;
                } | null;
            } | null;
            type: string | null;
            wikipedia: string | null;
        } | null)[] | null;
        histories: (p?: {
            find?: {
                end: Date | null;
                flight_number: number | null;
                id: string | null;
                start: Date | null;
            } | undefined;
            limit?: number | undefined;
            offset?: number | undefined;
            order?: string | undefined;
            sort?: string | undefined;
        } | undefined) => ({
            details: string | null;
            event_date_unix: Date | null;
            event_date_utc: Date | null;
            flight: {
                details: string | null;
                id: string | null;
                is_tentative: boolean | null;
                launch_date_local: Date | null;
                launch_date_unix: Date | null;
                launch_date_utc: Date | null;
                launch_site: {
                    site_id: string | null;
                    site_name: string | null;
                    site_name_long: string | null;
                } | null;
                launch_success: boolean | null;
                launch_year: string | null;
                links: {
                    article_link: string | null;
                    flickr_images: (string | null)[] | null;
                    mission_patch: string | null;
                    mission_patch_small: string | null;
                    presskit: string | null;
                    reddit_campaign: string | null;
                    reddit_launch: string | null;
                    reddit_media: string | null;
                    reddit_recovery: string | null;
                    video_link: string | null;
                    wikipedia: string | null;
                } | null;
                mission_id: (string | null)[] | null;
                mission_name: string | null;
                rocket: {
                    fairings: {
                        recovered: boolean | null;
                        recovery_attempt: boolean | null;
                        reused: boolean | null;
                        ship: string | null;
                    } | null;
                    first_stage: {
                        cores: ({
                            block: number | null;
                            core: {
                                asds_attempts: number | null;
                                asds_landings: number | null;
                                block: number | null;
                                id: string | null;
                                missions: ({
                                    flight: number | null;
                                    name: string | null;
                                } | null)[] | null;
                                original_launch: Date | null;
                                reuse_count: number | null;
                                rtls_attempts: number | null;
                                rtls_landings: number | null;
                                status: string | null;
                                water_landing: boolean | null;
                            } | null;
                            flight: number | null;
                            gridfins: boolean | null;
                            land_success: boolean | null;
                            landing_intent: boolean | null;
                            landing_type: string | null;
                            landing_vehicle: string | null;
                            legs: boolean | null;
                            reused: boolean | null;
                        } | null)[] | null;
                    } | null;
                    rocket: {
                        active: boolean | null;
                        boosters: number | null;
                        company: string | null;
                        cost_per_launch: number | null;
                        country: string | null;
                        description: string | null;
                        diameter: {
                            feet: number | null;
                            meters: number | null;
                        } | null;
                        engines: {
                            engine_loss_max: string | null;
                            layout: string | null;
                            number: number | null;
                            propellant_1: string | null;
                            propellant_2: string | null;
                            thrust_sea_level: {
                                kN: number | null;
                                lbf: number | null;
                            } | null;
                            thrust_to_weight: number | null;
                            thrust_vacuum: {
                                kN: number | null;
                                lbf: number | null;
                            } | null;
                            type: string | null;
                            version: string | null;
                        } | null;
                        first_flight: Date | null;
                        first_stage: {
                            burn_time_sec: number | null;
                            engines: number | null;
                            fuel_amount_tons: number | null;
                            reusable: boolean | null;
                            thrust_sea_level: {
                                kN: number | null;
                                lbf: number | null;
                            } | null;
                            thrust_vacuum: {
                                kN: number | null;
                                lbf: number | null;
                            } | null;
                        } | null;
                        height: {
                            feet: number | null;
                            meters: number | null;
                        } | null;
                        id: string | null;
                        landing_legs: {
                            material: string | null;
                            number: number | null;
                        } | null;
                        mass: {
                            kg: number | null;
                            lb: number | null;
                        } | null;
                        name: string | null;
                        payload_weights: ({
                            id: string | null;
                            kg: number | null;
                            lb: number | null;
                            name: string | null;
                        } | null)[] | null;
                        second_stage: {
                            burn_time_sec: number | null;
                            engines: number | null;
                            fuel_amount_tons: number | null;
                            payloads: {
                                composite_fairing: {
                                    diameter: {
                                        feet: number | null;
                                        meters: number | null;
                                    } | null;
                                    height: {
                                        feet: number | null;
                                        meters: number | null;
                                    } | null;
                                } | null;
                                option_1: string | null;
                            } | null;
                            thrust: {
                                kN: number | null;
                                lbf: number | null;
                            } | null;
                        } | null;
                        stages: number | null;
                        success_rate_pct: number | null;
                        type: string | null;
                        wikipedia: string | null;
                    } | null;
                    rocket_name: string | null;
                    rocket_type: string | null;
                    second_stage: {
                        block: number | null;
                        payloads: ({
                            customers: (string | null)[] | null;
                            id: string | null;
                            manufacturer: string | null;
                            nationality: string | null;
                            norad_id: (number | null)[] | null;
                            orbit: string | null;
                            orbit_params: {
                                apoapsis_km: number | null;
                                arg_of_pericenter: number | null;
                                eccentricity: number | null;
                                epoch: Date | null;
                                inclination_deg: number | null;
                                lifespan_years: number | null;
                                longitude: number | null;
                                mean_anomaly: number | null;
                                mean_motion: number | null;
                                periapsis_km: number | null;
                                period_min: number | null;
                                raan: number | null;
                                reference_system: string | null;
                                regime: string | null;
                                semi_major_axis_km: number | null;
                            } | null;
                            payload_mass_kg: number | null;
                            payload_mass_lbs: number | null;
                            payload_type: string | null;
                            reused: boolean | null;
                        } | null)[] | null;
                    } | null;
                } | null;
                ships: ({
                    abs: number | null;
                    active: boolean | null;
                    attempted_landings: number | null;
                    class: number | null;
                    course_deg: number | null;
                    home_port: string | null;
                    id: string | null;
                    image: string | null;
                    imo: number | null;
                    missions: ({
                        flight: string | null;
                        name: string | null;
                    } | null)[] | null;
                    mmsi: number | null;
                    model: string | null;
                    name: string | null;
                    position: {
                        latitude: number | null;
                        longitude: number | null;
                    } | null;
                    roles: (string | null)[] | null;
                    speed_kn: number | null;
                    status: string | null;
                    successful_landings: number | null;
                    type: string | null;
                    url: string | null;
                    weight_kg: number | null;
                    weight_lbs: number | null;
                    year_built: number | null;
                } | null)[] | null;
                static_fire_date_unix: Date | null;
                static_fire_date_utc: Date | null;
                telemetry: {
                    flight_club: string | null;
                } | null;
                tentative_max_precision: string | null;
                upcoming: boolean | null;
            } | null;
            id: string | null;
            links: {
                article: string | null;
                reddit: string | null;
                wikipedia: string | null;
            } | null;
            title: string | null;
        } | null)[] | null;
        historiesResult: (p?: {
            find?: {
                end: Date | null;
                flight_number: number | null;
                id: string | null;
                start: Date | null;
            } | undefined;
            limit?: number | undefined;
            offset?: number | undefined;
            order?: string | undefined;
            sort?: string | undefined;
        } | undefined) => {
            data: ({
                details: string | null;
                event_date_unix: Date | null;
                event_date_utc: Date | null;
                flight: {
                    details: string | null;
                    id: string | null;
                    is_tentative: boolean | null;
                    launch_date_local: Date | null;
                    launch_date_unix: Date | null;
                    launch_date_utc: Date | null;
                    launch_site: {
                        site_id: string | null;
                        site_name: string | null;
                        site_name_long: string | null;
                    } | null;
                    launch_success: boolean | null;
                    launch_year: string | null;
                    links: {
                        article_link: string | null;
                        flickr_images: (string | null)[] | null;
                        mission_patch: string | null;
                        mission_patch_small: string | null;
                        presskit: string | null;
                        reddit_campaign: string | null;
                        reddit_launch: string | null;
                        reddit_media: string | null;
                        reddit_recovery: string | null;
                        video_link: string | null;
                        wikipedia: string | null;
                    } | null;
                    mission_id: (string | null)[] | null;
                    mission_name: string | null;
                    rocket: {
                        fairings: {
                            recovered: boolean | null;
                            recovery_attempt: boolean | null;
                            reused: boolean | null;
                            ship: string | null;
                        } | null;
                        first_stage: {
                            cores: ({
                                block: number | null;
                                core: {
                                    asds_attempts: number | null;
                                    asds_landings: number | null;
                                    block: number | null;
                                    id: string | null;
                                    missions: ({
                                        flight: number | null;
                                        name: string | null;
                                    } | null)[] | null;
                                    original_launch: Date | null;
                                    reuse_count: number | null;
                                    rtls_attempts: number | null;
                                    rtls_landings: number | null;
                                    status: string | null;
                                    water_landing: boolean | null;
                                } | null;
                                flight: number | null;
                                gridfins: boolean | null;
                                land_success: boolean | null;
                                landing_intent: boolean | null;
                                landing_type: string | null;
                                landing_vehicle: string | null;
                                legs: boolean | null;
                                reused: boolean | null;
                            } | null)[] | null;
                        } | null;
                        rocket: {
                            active: boolean | null;
                            boosters: number | null;
                            company: string | null;
                            cost_per_launch: number | null;
                            country: string | null;
                            description: string | null;
                            diameter: {
                                feet: number | null;
                                meters: number | null;
                            } | null;
                            engines: {
                                engine_loss_max: string | null;
                                layout: string | null;
                                number: number | null;
                                propellant_1: string | null;
                                propellant_2: string | null;
                                thrust_sea_level: {
                                    kN: number | null;
                                    lbf: number | null;
                                } | null;
                                thrust_to_weight: number | null;
                                thrust_vacuum: {
                                    kN: number | null;
                                    lbf: number | null;
                                } | null;
                                type: string | null;
                                version: string | null;
                            } | null;
                            first_flight: Date | null;
                            first_stage: {
                                burn_time_sec: number | null;
                                engines: number | null;
                                fuel_amount_tons: number | null;
                                reusable: boolean | null;
                                thrust_sea_level: {
                                    kN: number | null;
                                    lbf: number | null;
                                } | null;
                                thrust_vacuum: {
                                    kN: number | null;
                                    lbf: number | null;
                                } | null;
                            } | null;
                            height: {
                                feet: number | null;
                                meters: number | null;
                            } | null;
                            id: string | null;
                            landing_legs: {
                                material: string | null;
                                number: number | null;
                            } | null;
                            mass: {
                                kg: number | null;
                                lb: number | null;
                            } | null;
                            name: string | null;
                            payload_weights: ({
                                id: string | null;
                                kg: number | null;
                                lb: number | null;
                                name: string | null;
                            } | null)[] | null;
                            second_stage: {
                                burn_time_sec: number | null;
                                engines: number | null;
                                fuel_amount_tons: number | null;
                                payloads: {
                                    composite_fairing: {
                                        diameter: {
                                            feet: number | null;
                                            meters: number | null;
                                        } | null;
                                        height: {
                                            feet: number | null;
                                            meters: number | null;
                                        } | null;
                                    } | null;
                                    option_1: string | null;
                                } | null;
                                thrust: {
                                    kN: number | null;
                                    lbf: number | null;
                                } | null;
                            } | null;
                            stages: number | null;
                            success_rate_pct: number | null;
                            type: string | null;
                            wikipedia: string | null;
                        } | null;
                        rocket_name: string | null;
                        rocket_type: string | null;
                        second_stage: {
                            block: number | null;
                            payloads: ({
                                customers: (string | null)[] | null;
                                id: string | null;
                                manufacturer: string | null;
                                nationality: string | null;
                                norad_id: (number | null)[] | null;
                                orbit: string | null;
                                orbit_params: {
                                    apoapsis_km: number | null;
                                    arg_of_pericenter: number | null;
                                    eccentricity: number | null;
                                    epoch: Date | null;
                                    inclination_deg: number | null;
                                    lifespan_years: number | null;
                                    longitude: number | null;
                                    mean_anomaly: number | null;
                                    mean_motion: number | null;
                                    periapsis_km: number | null;
                                    period_min: number | null;
                                    raan: number | null;
                                    reference_system: string | null;
                                    regime: string | null;
                                    semi_major_axis_km: number | null;
                                } | null;
                                payload_mass_kg: number | null;
                                payload_mass_lbs: number | null;
                                payload_type: string | null;
                                reused: boolean | null;
                            } | null)[] | null;
                        } | null;
                    } | null;
                    ships: ({
                        abs: number | null;
                        active: boolean | null;
                        attempted_landings: number | null;
                        class: number | null;
                        course_deg: number | null;
                        home_port: string | null;
                        id: string | null;
                        image: string | null;
                        imo: number | null;
                        missions: ({
                            flight: string | null;
                            name: string | null;
                        } | null)[] | null;
                        mmsi: number | null;
                        model: string | null;
                        name: string | null;
                        position: {
                            latitude: number | null;
                            longitude: number | null;
                        } | null;
                        roles: (string | null)[] | null;
                        speed_kn: number | null;
                        status: string | null;
                        successful_landings: number | null;
                        type: string | null;
                        url: string | null;
                        weight_kg: number | null;
                        weight_lbs: number | null;
                        year_built: number | null;
                    } | null)[] | null;
                    static_fire_date_unix: Date | null;
                    static_fire_date_utc: Date | null;
                    telemetry: {
                        flight_club: string | null;
                    } | null;
                    tentative_max_precision: string | null;
                    upcoming: boolean | null;
                } | null;
                id: string | null;
                links: {
                    article: string | null;
                    reddit: string | null;
                    wikipedia: string | null;
                } | null;
                title: string | null;
            } | null)[] | null;
            result: {
                totalCount: number | null;
            } | null;
        } | null;
        history: (p: {
            id: string;
        }) => {
            details: string | null;
            event_date_unix: Date | null;
            event_date_utc: Date | null;
            flight: {
                details: string | null;
                id: string | null;
                is_tentative: boolean | null;
                launch_date_local: Date | null;
                launch_date_unix: Date | null;
                launch_date_utc: Date | null;
                launch_site: {
                    site_id: string | null;
                    site_name: string | null;
                    site_name_long: string | null;
                } | null;
                launch_success: boolean | null;
                launch_year: string | null;
                links: {
                    article_link: string | null;
                    flickr_images: (string | null)[] | null;
                    mission_patch: string | null;
                    mission_patch_small: string | null;
                    presskit: string | null;
                    reddit_campaign: string | null;
                    reddit_launch: string | null;
                    reddit_media: string | null;
                    reddit_recovery: string | null;
                    video_link: string | null;
                    wikipedia: string | null;
                } | null;
                mission_id: (string | null)[] | null;
                mission_name: string | null;
                rocket: {
                    fairings: {
                        recovered: boolean | null;
                        recovery_attempt: boolean | null;
                        reused: boolean | null;
                        ship: string | null;
                    } | null;
                    first_stage: {
                        cores: ({
                            block: number | null;
                            core: {
                                asds_attempts: number | null;
                                asds_landings: number | null;
                                block: number | null;
                                id: string | null;
                                missions: ({
                                    flight: number | null;
                                    name: string | null;
                                } | null)[] | null;
                                original_launch: Date | null;
                                reuse_count: number | null;
                                rtls_attempts: number | null;
                                rtls_landings: number | null;
                                status: string | null;
                                water_landing: boolean | null;
                            } | null;
                            flight: number | null;
                            gridfins: boolean | null;
                            land_success: boolean | null;
                            landing_intent: boolean | null;
                            landing_type: string | null;
                            landing_vehicle: string | null;
                            legs: boolean | null;
                            reused: boolean | null;
                        } | null)[] | null;
                    } | null;
                    rocket: {
                        active: boolean | null;
                        boosters: number | null;
                        company: string | null;
                        cost_per_launch: number | null;
                        country: string | null;
                        description: string | null;
                        diameter: {
                            feet: number | null;
                            meters: number | null;
                        } | null;
                        engines: {
                            engine_loss_max: string | null;
                            layout: string | null;
                            number: number | null;
                            propellant_1: string | null;
                            propellant_2: string | null;
                            thrust_sea_level: {
                                kN: number | null;
                                lbf: number | null;
                            } | null;
                            thrust_to_weight: number | null;
                            thrust_vacuum: {
                                kN: number | null;
                                lbf: number | null;
                            } | null;
                            type: string | null;
                            version: string | null;
                        } | null;
                        first_flight: Date | null;
                        first_stage: {
                            burn_time_sec: number | null;
                            engines: number | null;
                            fuel_amount_tons: number | null;
                            reusable: boolean | null;
                            thrust_sea_level: {
                                kN: number | null;
                                lbf: number | null;
                            } | null;
                            thrust_vacuum: {
                                kN: number | null;
                                lbf: number | null;
                            } | null;
                        } | null;
                        height: {
                            feet: number | null;
                            meters: number | null;
                        } | null;
                        id: string | null;
                        landing_legs: {
                            material: string | null;
                            number: number | null;
                        } | null;
                        mass: {
                            kg: number | null;
                            lb: number | null;
                        } | null;
                        name: string | null;
                        payload_weights: ({
                            id: string | null;
                            kg: number | null;
                            lb: number | null;
                            name: string | null;
                        } | null)[] | null;
                        second_stage: {
                            burn_time_sec: number | null;
                            engines: number | null;
                            fuel_amount_tons: number | null;
                            payloads: {
                                composite_fairing: {
                                    diameter: {
                                        feet: number | null;
                                        meters: number | null;
                                    } | null;
                                    height: {
                                        feet: number | null;
                                        meters: number | null;
                                    } | null;
                                } | null;
                                option_1: string | null;
                            } | null;
                            thrust: {
                                kN: number | null;
                                lbf: number | null;
                            } | null;
                        } | null;
                        stages: number | null;
                        success_rate_pct: number | null;
                        type: string | null;
                        wikipedia: string | null;
                    } | null;
                    rocket_name: string | null;
                    rocket_type: string | null;
                    second_stage: {
                        block: number | null;
                        payloads: ({
                            customers: (string | null)[] | null;
                            id: string | null;
                            manufacturer: string | null;
                            nationality: string | null;
                            norad_id: (number | null)[] | null;
                            orbit: string | null;
                            orbit_params: {
                                apoapsis_km: number | null;
                                arg_of_pericenter: number | null;
                                eccentricity: number | null;
                                epoch: Date | null;
                                inclination_deg: number | null;
                                lifespan_years: number | null;
                                longitude: number | null;
                                mean_anomaly: number | null;
                                mean_motion: number | null;
                                periapsis_km: number | null;
                                period_min: number | null;
                                raan: number | null;
                                reference_system: string | null;
                                regime: string | null;
                                semi_major_axis_km: number | null;
                            } | null;
                            payload_mass_kg: number | null;
                            payload_mass_lbs: number | null;
                            payload_type: string | null;
                            reused: boolean | null;
                        } | null)[] | null;
                    } | null;
                } | null;
                ships: ({
                    abs: number | null;
                    active: boolean | null;
                    attempted_landings: number | null;
                    class: number | null;
                    course_deg: number | null;
                    home_port: string | null;
                    id: string | null;
                    image: string | null;
                    imo: number | null;
                    missions: ({
                        flight: string | null;
                        name: string | null;
                    } | null)[] | null;
                    mmsi: number | null;
                    model: string | null;
                    name: string | null;
                    position: {
                        latitude: number | null;
                        longitude: number | null;
                    } | null;
                    roles: (string | null)[] | null;
                    speed_kn: number | null;
                    status: string | null;
                    successful_landings: number | null;
                    type: string | null;
                    url: string | null;
                    weight_kg: number | null;
                    weight_lbs: number | null;
                    year_built: number | null;
                } | null)[] | null;
                static_fire_date_unix: Date | null;
                static_fire_date_utc: Date | null;
                telemetry: {
                    flight_club: string | null;
                } | null;
                tentative_max_precision: string | null;
                upcoming: boolean | null;
            } | null;
            id: string | null;
            links: {
                article: string | null;
                reddit: string | null;
                wikipedia: string | null;
            } | null;
            title: string | null;
        } | null;
        landpad: (p: {
            id: string;
        }) => {
            attempted_landings: string | null;
            details: string | null;
            full_name: string | null;
            id: string | null;
            landing_type: string | null;
            location: {
                latitude: number | null;
                longitude: number | null;
                name: string | null;
                region: string | null;
            } | null;
            status: string | null;
            successful_landings: string | null;
            wikipedia: string | null;
        } | null;
        landpads: (p?: {
            limit?: number | undefined;
            offset?: number | undefined;
        } | undefined) => ({
            attempted_landings: string | null;
            details: string | null;
            full_name: string | null;
            id: string | null;
            landing_type: string | null;
            location: {
                latitude: number | null;
                longitude: number | null;
                name: string | null;
                region: string | null;
            } | null;
            status: string | null;
            successful_landings: string | null;
            wikipedia: string | null;
        } | null)[] | null;
        launch: (p: {
            id: string;
        }) => {
            details: string | null;
            id: string | null;
            is_tentative: boolean | null;
            launch_date_local: Date | null;
            launch_date_unix: Date | null;
            launch_date_utc: Date | null;
            launch_site: {
                site_id: string | null;
                site_name: string | null;
                site_name_long: string | null;
            } | null;
            launch_success: boolean | null;
            launch_year: string | null;
            links: {
                article_link: string | null;
                flickr_images: (string | null)[] | null;
                mission_patch: string | null;
                mission_patch_small: string | null;
                presskit: string | null;
                reddit_campaign: string | null;
                reddit_launch: string | null;
                reddit_media: string | null;
                reddit_recovery: string | null;
                video_link: string | null;
                wikipedia: string | null;
            } | null;
            mission_id: (string | null)[] | null;
            mission_name: string | null;
            rocket: {
                fairings: {
                    recovered: boolean | null;
                    recovery_attempt: boolean | null;
                    reused: boolean | null;
                    ship: string | null;
                } | null;
                first_stage: {
                    cores: ({
                        block: number | null;
                        core: {
                            asds_attempts: number | null;
                            asds_landings: number | null;
                            block: number | null;
                            id: string | null;
                            missions: ({
                                flight: number | null;
                                name: string | null;
                            } | null)[] | null;
                            original_launch: Date | null;
                            reuse_count: number | null;
                            rtls_attempts: number | null;
                            rtls_landings: number | null;
                            status: string | null;
                            water_landing: boolean | null;
                        } | null;
                        flight: number | null;
                        gridfins: boolean | null;
                        land_success: boolean | null;
                        landing_intent: boolean | null;
                        landing_type: string | null;
                        landing_vehicle: string | null;
                        legs: boolean | null;
                        reused: boolean | null;
                    } | null)[] | null;
                } | null;
                rocket: {
                    active: boolean | null;
                    boosters: number | null;
                    company: string | null;
                    cost_per_launch: number | null;
                    country: string | null;
                    description: string | null;
                    diameter: {
                        feet: number | null;
                        meters: number | null;
                    } | null;
                    engines: {
                        engine_loss_max: string | null;
                        layout: string | null;
                        number: number | null;
                        propellant_1: string | null;
                        propellant_2: string | null;
                        thrust_sea_level: {
                            kN: number | null;
                            lbf: number | null;
                        } | null;
                        thrust_to_weight: number | null;
                        thrust_vacuum: {
                            kN: number | null;
                            lbf: number | null;
                        } | null;
                        type: string | null;
                        version: string | null;
                    } | null;
                    first_flight: Date | null;
                    first_stage: {
                        burn_time_sec: number | null;
                        engines: number | null;
                        fuel_amount_tons: number | null;
                        reusable: boolean | null;
                        thrust_sea_level: {
                            kN: number | null;
                            lbf: number | null;
                        } | null;
                        thrust_vacuum: {
                            kN: number | null;
                            lbf: number | null;
                        } | null;
                    } | null;
                    height: {
                        feet: number | null;
                        meters: number | null;
                    } | null;
                    id: string | null;
                    landing_legs: {
                        material: string | null;
                        number: number | null;
                    } | null;
                    mass: {
                        kg: number | null;
                        lb: number | null;
                    } | null;
                    name: string | null;
                    payload_weights: ({
                        id: string | null;
                        kg: number | null;
                        lb: number | null;
                        name: string | null;
                    } | null)[] | null;
                    second_stage: {
                        burn_time_sec: number | null;
                        engines: number | null;
                        fuel_amount_tons: number | null;
                        payloads: {
                            composite_fairing: {
                                diameter: {
                                    feet: number | null;
                                    meters: number | null;
                                } | null;
                                height: {
                                    feet: number | null;
                                    meters: number | null;
                                } | null;
                            } | null;
                            option_1: string | null;
                        } | null;
                        thrust: {
                            kN: number | null;
                            lbf: number | null;
                        } | null;
                    } | null;
                    stages: number | null;
                    success_rate_pct: number | null;
                    type: string | null;
                    wikipedia: string | null;
                } | null;
                rocket_name: string | null;
                rocket_type: string | null;
                second_stage: {
                    block: number | null;
                    payloads: ({
                        customers: (string | null)[] | null;
                        id: string | null;
                        manufacturer: string | null;
                        nationality: string | null;
                        norad_id: (number | null)[] | null;
                        orbit: string | null;
                        orbit_params: {
                            apoapsis_km: number | null;
                            arg_of_pericenter: number | null;
                            eccentricity: number | null;
                            epoch: Date | null;
                            inclination_deg: number | null;
                            lifespan_years: number | null;
                            longitude: number | null;
                            mean_anomaly: number | null;
                            mean_motion: number | null;
                            periapsis_km: number | null;
                            period_min: number | null;
                            raan: number | null;
                            reference_system: string | null;
                            regime: string | null;
                            semi_major_axis_km: number | null;
                        } | null;
                        payload_mass_kg: number | null;
                        payload_mass_lbs: number | null;
                        payload_type: string | null;
                        reused: boolean | null;
                    } | null)[] | null;
                } | null;
            } | null;
            ships: ({
                abs: number | null;
                active: boolean | null;
                attempted_landings: number | null;
                class: number | null;
                course_deg: number | null;
                home_port: string | null;
                id: string | null;
                image: string | null;
                imo: number | null;
                missions: ({
                    flight: string | null;
                    name: string | null;
                } | null)[] | null;
                mmsi: number | null;
                model: string | null;
                name: string | null;
                position: {
                    latitude: number | null;
                    longitude: number | null;
                } | null;
                roles: (string | null)[] | null;
                speed_kn: number | null;
                status: string | null;
                successful_landings: number | null;
                type: string | null;
                url: string | null;
                weight_kg: number | null;
                weight_lbs: number | null;
                year_built: number | null;
            } | null)[] | null;
            static_fire_date_unix: Date | null;
            static_fire_date_utc: Date | null;
            telemetry: {
                flight_club: string | null;
            } | null;
            tentative_max_precision: string | null;
            upcoming: boolean | null;
        } | null;
        launchLatest: (p?: {
            offset?: number | undefined;
        } | undefined) => {
            details: string | null;
            id: string | null;
            is_tentative: boolean | null;
            launch_date_local: Date | null;
            launch_date_unix: Date | null;
            launch_date_utc: Date | null;
            launch_site: {
                site_id: string | null;
                site_name: string | null;
                site_name_long: string | null;
            } | null;
            launch_success: boolean | null;
            launch_year: string | null;
            links: {
                article_link: string | null;
                flickr_images: (string | null)[] | null;
                mission_patch: string | null;
                mission_patch_small: string | null;
                presskit: string | null;
                reddit_campaign: string | null;
                reddit_launch: string | null;
                reddit_media: string | null;
                reddit_recovery: string | null;
                video_link: string | null;
                wikipedia: string | null;
            } | null;
            mission_id: (string | null)[] | null;
            mission_name: string | null;
            rocket: {
                fairings: {
                    recovered: boolean | null;
                    recovery_attempt: boolean | null;
                    reused: boolean | null;
                    ship: string | null;
                } | null;
                first_stage: {
                    cores: ({
                        block: number | null;
                        core: {
                            asds_attempts: number | null;
                            asds_landings: number | null;
                            block: number | null;
                            id: string | null;
                            missions: ({
                                flight: number | null;
                                name: string | null;
                            } | null)[] | null;
                            original_launch: Date | null;
                            reuse_count: number | null;
                            rtls_attempts: number | null;
                            rtls_landings: number | null;
                            status: string | null;
                            water_landing: boolean | null;
                        } | null;
                        flight: number | null;
                        gridfins: boolean | null;
                        land_success: boolean | null;
                        landing_intent: boolean | null;
                        landing_type: string | null;
                        landing_vehicle: string | null;
                        legs: boolean | null;
                        reused: boolean | null;
                    } | null)[] | null;
                } | null;
                rocket: {
                    active: boolean | null;
                    boosters: number | null;
                    company: string | null;
                    cost_per_launch: number | null;
                    country: string | null;
                    description: string | null;
                    diameter: {
                        feet: number | null;
                        meters: number | null;
                    } | null;
                    engines: {
                        engine_loss_max: string | null;
                        layout: string | null;
                        number: number | null;
                        propellant_1: string | null;
                        propellant_2: string | null;
                        thrust_sea_level: {
                            kN: number | null;
                            lbf: number | null;
                        } | null;
                        thrust_to_weight: number | null;
                        thrust_vacuum: {
                            kN: number | null;
                            lbf: number | null;
                        } | null;
                        type: string | null;
                        version: string | null;
                    } | null;
                    first_flight: Date | null;
                    first_stage: {
                        burn_time_sec: number | null;
                        engines: number | null;
                        fuel_amount_tons: number | null;
                        reusable: boolean | null;
                        thrust_sea_level: {
                            kN: number | null;
                            lbf: number | null;
                        } | null;
                        thrust_vacuum: {
                            kN: number | null;
                            lbf: number | null;
                        } | null;
                    } | null;
                    height: {
                        feet: number | null;
                        meters: number | null;
                    } | null;
                    id: string | null;
                    landing_legs: {
                        material: string | null;
                        number: number | null;
                    } | null;
                    mass: {
                        kg: number | null;
                        lb: number | null;
                    } | null;
                    name: string | null;
                    payload_weights: ({
                        id: string | null;
                        kg: number | null;
                        lb: number | null;
                        name: string | null;
                    } | null)[] | null;
                    second_stage: {
                        burn_time_sec: number | null;
                        engines: number | null;
                        fuel_amount_tons: number | null;
                        payloads: {
                            composite_fairing: {
                                diameter: {
                                    feet: number | null;
                                    meters: number | null;
                                } | null;
                                height: {
                                    feet: number | null;
                                    meters: number | null;
                                } | null;
                            } | null;
                            option_1: string | null;
                        } | null;
                        thrust: {
                            kN: number | null;
                            lbf: number | null;
                        } | null;
                    } | null;
                    stages: number | null;
                    success_rate_pct: number | null;
                    type: string | null;
                    wikipedia: string | null;
                } | null;
                rocket_name: string | null;
                rocket_type: string | null;
                second_stage: {
                    block: number | null;
                    payloads: ({
                        customers: (string | null)[] | null;
                        id: string | null;
                        manufacturer: string | null;
                        nationality: string | null;
                        norad_id: (number | null)[] | null;
                        orbit: string | null;
                        orbit_params: {
                            apoapsis_km: number | null;
                            arg_of_pericenter: number | null;
                            eccentricity: number | null;
                            epoch: Date | null;
                            inclination_deg: number | null;
                            lifespan_years: number | null;
                            longitude: number | null;
                            mean_anomaly: number | null;
                            mean_motion: number | null;
                            periapsis_km: number | null;
                            period_min: number | null;
                            raan: number | null;
                            reference_system: string | null;
                            regime: string | null;
                            semi_major_axis_km: number | null;
                        } | null;
                        payload_mass_kg: number | null;
                        payload_mass_lbs: number | null;
                        payload_type: string | null;
                        reused: boolean | null;
                    } | null)[] | null;
                } | null;
            } | null;
            ships: ({
                abs: number | null;
                active: boolean | null;
                attempted_landings: number | null;
                class: number | null;
                course_deg: number | null;
                home_port: string | null;
                id: string | null;
                image: string | null;
                imo: number | null;
                missions: ({
                    flight: string | null;
                    name: string | null;
                } | null)[] | null;
                mmsi: number | null;
                model: string | null;
                name: string | null;
                position: {
                    latitude: number | null;
                    longitude: number | null;
                } | null;
                roles: (string | null)[] | null;
                speed_kn: number | null;
                status: string | null;
                successful_landings: number | null;
                type: string | null;
                url: string | null;
                weight_kg: number | null;
                weight_lbs: number | null;
                year_built: number | null;
            } | null)[] | null;
            static_fire_date_unix: Date | null;
            static_fire_date_utc: Date | null;
            telemetry: {
                flight_club: string | null;
            } | null;
            tentative_max_precision: string | null;
            upcoming: boolean | null;
        } | null;
        launchNext: (p?: {
            offset?: number | undefined;
        } | undefined) => {
            details: string | null;
            id: string | null;
            is_tentative: boolean | null;
            launch_date_local: Date | null;
            launch_date_unix: Date | null;
            launch_date_utc: Date | null;
            launch_site: {
                site_id: string | null;
                site_name: string | null;
                site_name_long: string | null;
            } | null;
            launch_success: boolean | null;
            launch_year: string | null;
            links: {
                article_link: string | null;
                flickr_images: (string | null)[] | null;
                mission_patch: string | null;
                mission_patch_small: string | null;
                presskit: string | null;
                reddit_campaign: string | null;
                reddit_launch: string | null;
                reddit_media: string | null;
                reddit_recovery: string | null;
                video_link: string | null;
                wikipedia: string | null;
            } | null;
            mission_id: (string | null)[] | null;
            mission_name: string | null;
            rocket: {
                fairings: {
                    recovered: boolean | null;
                    recovery_attempt: boolean | null;
                    reused: boolean | null;
                    ship: string | null;
                } | null;
                first_stage: {
                    cores: ({
                        block: number | null;
                        core: {
                            asds_attempts: number | null;
                            asds_landings: number | null;
                            block: number | null;
                            id: string | null;
                            missions: ({
                                flight: number | null;
                                name: string | null;
                            } | null)[] | null;
                            original_launch: Date | null;
                            reuse_count: number | null;
                            rtls_attempts: number | null;
                            rtls_landings: number | null;
                            status: string | null;
                            water_landing: boolean | null;
                        } | null;
                        flight: number | null;
                        gridfins: boolean | null;
                        land_success: boolean | null;
                        landing_intent: boolean | null;
                        landing_type: string | null;
                        landing_vehicle: string | null;
                        legs: boolean | null;
                        reused: boolean | null;
                    } | null)[] | null;
                } | null;
                rocket: {
                    active: boolean | null;
                    boosters: number | null;
                    company: string | null;
                    cost_per_launch: number | null;
                    country: string | null;
                    description: string | null;
                    diameter: {
                        feet: number | null;
                        meters: number | null;
                    } | null;
                    engines: {
                        engine_loss_max: string | null;
                        layout: string | null;
                        number: number | null;
                        propellant_1: string | null;
                        propellant_2: string | null;
                        thrust_sea_level: {
                            kN: number | null;
                            lbf: number | null;
                        } | null;
                        thrust_to_weight: number | null;
                        thrust_vacuum: {
                            kN: number | null;
                            lbf: number | null;
                        } | null;
                        type: string | null;
                        version: string | null;
                    } | null;
                    first_flight: Date | null;
                    first_stage: {
                        burn_time_sec: number | null;
                        engines: number | null;
                        fuel_amount_tons: number | null;
                        reusable: boolean | null;
                        thrust_sea_level: {
                            kN: number | null;
                            lbf: number | null;
                        } | null;
                        thrust_vacuum: {
                            kN: number | null;
                            lbf: number | null;
                        } | null;
                    } | null;
                    height: {
                        feet: number | null;
                        meters: number | null;
                    } | null;
                    id: string | null;
                    landing_legs: {
                        material: string | null;
                        number: number | null;
                    } | null;
                    mass: {
                        kg: number | null;
                        lb: number | null;
                    } | null;
                    name: string | null;
                    payload_weights: ({
                        id: string | null;
                        kg: number | null;
                        lb: number | null;
                        name: string | null;
                    } | null)[] | null;
                    second_stage: {
                        burn_time_sec: number | null;
                        engines: number | null;
                        fuel_amount_tons: number | null;
                        payloads: {
                            composite_fairing: {
                                diameter: {
                                    feet: number | null;
                                    meters: number | null;
                                } | null;
                                height: {
                                    feet: number | null;
                                    meters: number | null;
                                } | null;
                            } | null;
                            option_1: string | null;
                        } | null;
                        thrust: {
                            kN: number | null;
                            lbf: number | null;
                        } | null;
                    } | null;
                    stages: number | null;
                    success_rate_pct: number | null;
                    type: string | null;
                    wikipedia: string | null;
                } | null;
                rocket_name: string | null;
                rocket_type: string | null;
                second_stage: {
                    block: number | null;
                    payloads: ({
                        customers: (string | null)[] | null;
                        id: string | null;
                        manufacturer: string | null;
                        nationality: string | null;
                        norad_id: (number | null)[] | null;
                        orbit: string | null;
                        orbit_params: {
                            apoapsis_km: number | null;
                            arg_of_pericenter: number | null;
                            eccentricity: number | null;
                            epoch: Date | null;
                            inclination_deg: number | null;
                            lifespan_years: number | null;
                            longitude: number | null;
                            mean_anomaly: number | null;
                            mean_motion: number | null;
                            periapsis_km: number | null;
                            period_min: number | null;
                            raan: number | null;
                            reference_system: string | null;
                            regime: string | null;
                            semi_major_axis_km: number | null;
                        } | null;
                        payload_mass_kg: number | null;
                        payload_mass_lbs: number | null;
                        payload_type: string | null;
                        reused: boolean | null;
                    } | null)[] | null;
                } | null;
            } | null;
            ships: ({
                abs: number | null;
                active: boolean | null;
                attempted_landings: number | null;
                class: number | null;
                course_deg: number | null;
                home_port: string | null;
                id: string | null;
                image: string | null;
                imo: number | null;
                missions: ({
                    flight: string | null;
                    name: string | null;
                } | null)[] | null;
                mmsi: number | null;
                model: string | null;
                name: string | null;
                position: {
                    latitude: number | null;
                    longitude: number | null;
                } | null;
                roles: (string | null)[] | null;
                speed_kn: number | null;
                status: string | null;
                successful_landings: number | null;
                type: string | null;
                url: string | null;
                weight_kg: number | null;
                weight_lbs: number | null;
                year_built: number | null;
            } | null)[] | null;
            static_fire_date_unix: Date | null;
            static_fire_date_utc: Date | null;
            telemetry: {
                flight_club: string | null;
            } | null;
            tentative_max_precision: string | null;
            upcoming: boolean | null;
        } | null;
        launches: (p?: {
            find?: {
                [x: string]: any;
            } | undefined;
            limit?: number | undefined;
            offset?: number | undefined;
            order?: string | undefined;
            sort?: string | undefined;
        } | undefined) => ({
            details: string | null;
            id: string | null;
            is_tentative: boolean | null;
            launch_date_local: Date | null;
            launch_date_unix: Date | null;
            launch_date_utc: Date | null;
            launch_site: {
                site_id: string | null;
                site_name: string | null;
                site_name_long: string | null;
            } | null;
            launch_success: boolean | null;
            launch_year: string | null;
            links: {
                article_link: string | null;
                flickr_images: (string | null)[] | null;
                mission_patch: string | null;
                mission_patch_small: string | null;
                presskit: string | null;
                reddit_campaign: string | null;
                reddit_launch: string | null;
                reddit_media: string | null;
                reddit_recovery: string | null;
                video_link: string | null;
                wikipedia: string | null;
            } | null;
            mission_id: (string | null)[] | null;
            mission_name: string | null;
            rocket: {
                fairings: {
                    recovered: boolean | null;
                    recovery_attempt: boolean | null;
                    reused: boolean | null;
                    ship: string | null;
                } | null;
                first_stage: {
                    cores: ({
                        block: number | null;
                        core: {
                            asds_attempts: number | null;
                            asds_landings: number | null;
                            block: number | null;
                            id: string | null;
                            missions: ({
                                flight: number | null;
                                name: string | null;
                            } | null)[] | null;
                            original_launch: Date | null;
                            reuse_count: number | null;
                            rtls_attempts: number | null;
                            rtls_landings: number | null;
                            status: string | null;
                            water_landing: boolean | null;
                        } | null;
                        flight: number | null;
                        gridfins: boolean | null;
                        land_success: boolean | null;
                        landing_intent: boolean | null;
                        landing_type: string | null;
                        landing_vehicle: string | null;
                        legs: boolean | null;
                        reused: boolean | null;
                    } | null)[] | null;
                } | null;
                rocket: {
                    active: boolean | null;
                    boosters: number | null;
                    company: string | null;
                    cost_per_launch: number | null;
                    country: string | null;
                    description: string | null;
                    diameter: {
                        feet: number | null;
                        meters: number | null;
                    } | null;
                    engines: {
                        engine_loss_max: string | null;
                        layout: string | null;
                        number: number | null;
                        propellant_1: string | null;
                        propellant_2: string | null;
                        thrust_sea_level: {
                            kN: number | null;
                            lbf: number | null;
                        } | null;
                        thrust_to_weight: number | null;
                        thrust_vacuum: {
                            kN: number | null;
                            lbf: number | null;
                        } | null;
                        type: string | null;
                        version: string | null;
                    } | null;
                    first_flight: Date | null;
                    first_stage: {
                        burn_time_sec: number | null;
                        engines: number | null;
                        fuel_amount_tons: number | null;
                        reusable: boolean | null;
                        thrust_sea_level: {
                            kN: number | null;
                            lbf: number | null;
                        } | null;
                        thrust_vacuum: {
                            kN: number | null;
                            lbf: number | null;
                        } | null;
                    } | null;
                    height: {
                        feet: number | null;
                        meters: number | null;
                    } | null;
                    id: string | null;
                    landing_legs: {
                        material: string | null;
                        number: number | null;
                    } | null;
                    mass: {
                        kg: number | null;
                        lb: number | null;
                    } | null;
                    name: string | null;
                    payload_weights: ({
                        id: string | null;
                        kg: number | null;
                        lb: number | null;
                        name: string | null;
                    } | null)[] | null;
                    second_stage: {
                        burn_time_sec: number | null;
                        engines: number | null;
                        fuel_amount_tons: number | null;
                        payloads: {
                            composite_fairing: {
                                diameter: {
                                    feet: number | null;
                                    meters: number | null;
                                } | null;
                                height: {
                                    feet: number | null;
                                    meters: number | null;
                                } | null;
                            } | null;
                            option_1: string | null;
                        } | null;
                        thrust: {
                            kN: number | null;
                            lbf: number | null;
                        } | null;
                    } | null;
                    stages: number | null;
                    success_rate_pct: number | null;
                    type: string | null;
                    wikipedia: string | null;
                } | null;
                rocket_name: string | null;
                rocket_type: string | null;
                second_stage: {
                    block: number | null;
                    payloads: ({
                        customers: (string | null)[] | null;
                        id: string | null;
                        manufacturer: string | null;
                        nationality: string | null;
                        norad_id: (number | null)[] | null;
                        orbit: string | null;
                        orbit_params: {
                            apoapsis_km: number | null;
                            arg_of_pericenter: number | null;
                            eccentricity: number | null;
                            epoch: Date | null;
                            inclination_deg: number | null;
                            lifespan_years: number | null;
                            longitude: number | null;
                            mean_anomaly: number | null;
                            mean_motion: number | null;
                            periapsis_km: number | null;
                            period_min: number | null;
                            raan: number | null;
                            reference_system: string | null;
                            regime: string | null;
                            semi_major_axis_km: number | null;
                        } | null;
                        payload_mass_kg: number | null;
                        payload_mass_lbs: number | null;
                        payload_type: string | null;
                        reused: boolean | null;
                    } | null)[] | null;
                } | null;
            } | null;
            ships: ({
                abs: number | null;
                active: boolean | null;
                attempted_landings: number | null;
                class: number | null;
                course_deg: number | null;
                home_port: string | null;
                id: string | null;
                image: string | null;
                imo: number | null;
                missions: ({
                    flight: string | null;
                    name: string | null;
                } | null)[] | null;
                mmsi: number | null;
                model: string | null;
                name: string | null;
                position: {
                    latitude: number | null;
                    longitude: number | null;
                } | null;
                roles: (string | null)[] | null;
                speed_kn: number | null;
                status: string | null;
                successful_landings: number | null;
                type: string | null;
                url: string | null;
                weight_kg: number | null;
                weight_lbs: number | null;
                year_built: number | null;
            } | null)[] | null;
            static_fire_date_unix: Date | null;
            static_fire_date_utc: Date | null;
            telemetry: {
                flight_club: string | null;
            } | null;
            tentative_max_precision: string | null;
            upcoming: boolean | null;
        } | null)[] | null;
        launchesPast: (p?: {
            find?: {
                [x: string]: any;
            } | undefined;
            limit?: number | undefined;
            offset?: number | undefined;
            order?: string | undefined;
            sort?: string | undefined;
        } | undefined) => ({
            details: string | null;
            id: string | null;
            is_tentative: boolean | null;
            launch_date_local: Date | null;
            launch_date_unix: Date | null;
            launch_date_utc: Date | null;
            launch_site: {
                site_id: string | null;
                site_name: string | null;
                site_name_long: string | null;
            } | null;
            launch_success: boolean | null;
            launch_year: string | null;
            links: {
                article_link: string | null;
                flickr_images: (string | null)[] | null;
                mission_patch: string | null;
                mission_patch_small: string | null;
                presskit: string | null;
                reddit_campaign: string | null;
                reddit_launch: string | null;
                reddit_media: string | null;
                reddit_recovery: string | null;
                video_link: string | null;
                wikipedia: string | null;
            } | null;
            mission_id: (string | null)[] | null;
            mission_name: string | null;
            rocket: {
                fairings: {
                    recovered: boolean | null;
                    recovery_attempt: boolean | null;
                    reused: boolean | null;
                    ship: string | null;
                } | null;
                first_stage: {
                    cores: ({
                        block: number | null;
                        core: {
                            asds_attempts: number | null;
                            asds_landings: number | null;
                            block: number | null;
                            id: string | null;
                            missions: ({
                                flight: number | null;
                                name: string | null;
                            } | null)[] | null;
                            original_launch: Date | null;
                            reuse_count: number | null;
                            rtls_attempts: number | null;
                            rtls_landings: number | null;
                            status: string | null;
                            water_landing: boolean | null;
                        } | null;
                        flight: number | null;
                        gridfins: boolean | null;
                        land_success: boolean | null;
                        landing_intent: boolean | null;
                        landing_type: string | null;
                        landing_vehicle: string | null;
                        legs: boolean | null;
                        reused: boolean | null;
                    } | null)[] | null;
                } | null;
                rocket: {
                    active: boolean | null;
                    boosters: number | null;
                    company: string | null;
                    cost_per_launch: number | null;
                    country: string | null;
                    description: string | null;
                    diameter: {
                        feet: number | null;
                        meters: number | null;
                    } | null;
                    engines: {
                        engine_loss_max: string | null;
                        layout: string | null;
                        number: number | null;
                        propellant_1: string | null;
                        propellant_2: string | null;
                        thrust_sea_level: {
                            kN: number | null;
                            lbf: number | null;
                        } | null;
                        thrust_to_weight: number | null;
                        thrust_vacuum: {
                            kN: number | null;
                            lbf: number | null;
                        } | null;
                        type: string | null;
                        version: string | null;
                    } | null;
                    first_flight: Date | null;
                    first_stage: {
                        burn_time_sec: number | null;
                        engines: number | null;
                        fuel_amount_tons: number | null;
                        reusable: boolean | null;
                        thrust_sea_level: {
                            kN: number | null;
                            lbf: number | null;
                        } | null;
                        thrust_vacuum: {
                            kN: number | null;
                            lbf: number | null;
                        } | null;
                    } | null;
                    height: {
                        feet: number | null;
                        meters: number | null;
                    } | null;
                    id: string | null;
                    landing_legs: {
                        material: string | null;
                        number: number | null;
                    } | null;
                    mass: {
                        kg: number | null;
                        lb: number | null;
                    } | null;
                    name: string | null;
                    payload_weights: ({
                        id: string | null;
                        kg: number | null;
                        lb: number | null;
                        name: string | null;
                    } | null)[] | null;
                    second_stage: {
                        burn_time_sec: number | null;
                        engines: number | null;
                        fuel_amount_tons: number | null;
                        payloads: {
                            composite_fairing: {
                                diameter: {
                                    feet: number | null;
                                    meters: number | null;
                                } | null;
                                height: {
                                    feet: number | null;
                                    meters: number | null;
                                } | null;
                            } | null;
                            option_1: string | null;
                        } | null;
                        thrust: {
                            kN: number | null;
                            lbf: number | null;
                        } | null;
                    } | null;
                    stages: number | null;
                    success_rate_pct: number | null;
                    type: string | null;
                    wikipedia: string | null;
                } | null;
                rocket_name: string | null;
                rocket_type: string | null;
                second_stage: {
                    block: number | null;
                    payloads: ({
                        customers: (string | null)[] | null;
                        id: string | null;
                        manufacturer: string | null;
                        nationality: string | null;
                        norad_id: (number | null)[] | null;
                        orbit: string | null;
                        orbit_params: {
                            apoapsis_km: number | null;
                            arg_of_pericenter: number | null;
                            eccentricity: number | null;
                            epoch: Date | null;
                            inclination_deg: number | null;
                            lifespan_years: number | null;
                            longitude: number | null;
                            mean_anomaly: number | null;
                            mean_motion: number | null;
                            periapsis_km: number | null;
                            period_min: number | null;
                            raan: number | null;
                            reference_system: string | null;
                            regime: string | null;
                            semi_major_axis_km: number | null;
                        } | null;
                        payload_mass_kg: number | null;
                        payload_mass_lbs: number | null;
                        payload_type: string | null;
                        reused: boolean | null;
                    } | null)[] | null;
                } | null;
            } | null;
            ships: ({
                abs: number | null;
                active: boolean | null;
                attempted_landings: number | null;
                class: number | null;
                course_deg: number | null;
                home_port: string | null;
                id: string | null;
                image: string | null;
                imo: number | null;
                missions: ({
                    flight: string | null;
                    name: string | null;
                } | null)[] | null;
                mmsi: number | null;
                model: string | null;
                name: string | null;
                position: {
                    latitude: number | null;
                    longitude: number | null;
                } | null;
                roles: (string | null)[] | null;
                speed_kn: number | null;
                status: string | null;
                successful_landings: number | null;
                type: string | null;
                url: string | null;
                weight_kg: number | null;
                weight_lbs: number | null;
                year_built: number | null;
            } | null)[] | null;
            static_fire_date_unix: Date | null;
            static_fire_date_utc: Date | null;
            telemetry: {
                flight_club: string | null;
            } | null;
            tentative_max_precision: string | null;
            upcoming: boolean | null;
        } | null)[] | null;
        launchesPastResult: (p?: {
            find?: {
                [x: string]: any;
            } | undefined;
            limit?: number | undefined;
            offset?: number | undefined;
            order?: string | undefined;
            sort?: string | undefined;
        } | undefined) => {
            data: ({
                details: string | null;
                id: string | null;
                is_tentative: boolean | null;
                launch_date_local: Date | null;
                launch_date_unix: Date | null;
                launch_date_utc: Date | null;
                launch_site: {
                    site_id: string | null;
                    site_name: string | null;
                    site_name_long: string | null;
                } | null;
                launch_success: boolean | null;
                launch_year: string | null;
                links: {
                    article_link: string | null;
                    flickr_images: (string | null)[] | null;
                    mission_patch: string | null;
                    mission_patch_small: string | null;
                    presskit: string | null;
                    reddit_campaign: string | null;
                    reddit_launch: string | null;
                    reddit_media: string | null;
                    reddit_recovery: string | null;
                    video_link: string | null;
                    wikipedia: string | null;
                } | null;
                mission_id: (string | null)[] | null;
                mission_name: string | null;
                rocket: {
                    fairings: {
                        recovered: boolean | null;
                        recovery_attempt: boolean | null;
                        reused: boolean | null;
                        ship: string | null;
                    } | null;
                    first_stage: {
                        cores: ({
                            block: number | null;
                            core: {
                                asds_attempts: number | null;
                                asds_landings: number | null;
                                block: number | null;
                                id: string | null;
                                missions: ({
                                    flight: number | null;
                                    name: string | null;
                                } | null)[] | null;
                                original_launch: Date | null;
                                reuse_count: number | null;
                                rtls_attempts: number | null;
                                rtls_landings: number | null;
                                status: string | null;
                                water_landing: boolean | null;
                            } | null;
                            flight: number | null;
                            gridfins: boolean | null;
                            land_success: boolean | null;
                            landing_intent: boolean | null;
                            landing_type: string | null;
                            landing_vehicle: string | null;
                            legs: boolean | null;
                            reused: boolean | null;
                        } | null)[] | null;
                    } | null;
                    rocket: {
                        active: boolean | null;
                        boosters: number | null;
                        company: string | null;
                        cost_per_launch: number | null;
                        country: string | null;
                        description: string | null;
                        diameter: {
                            feet: number | null;
                            meters: number | null;
                        } | null;
                        engines: {
                            engine_loss_max: string | null;
                            layout: string | null;
                            number: number | null;
                            propellant_1: string | null;
                            propellant_2: string | null;
                            thrust_sea_level: {
                                kN: number | null;
                                lbf: number | null;
                            } | null;
                            thrust_to_weight: number | null;
                            thrust_vacuum: {
                                kN: number | null;
                                lbf: number | null;
                            } | null;
                            type: string | null;
                            version: string | null;
                        } | null;
                        first_flight: Date | null;
                        first_stage: {
                            burn_time_sec: number | null;
                            engines: number | null;
                            fuel_amount_tons: number | null;
                            reusable: boolean | null;
                            thrust_sea_level: {
                                kN: number | null;
                                lbf: number | null;
                            } | null;
                            thrust_vacuum: {
                                kN: number | null;
                                lbf: number | null;
                            } | null;
                        } | null;
                        height: {
                            feet: number | null;
                            meters: number | null;
                        } | null;
                        id: string | null;
                        landing_legs: {
                            material: string | null;
                            number: number | null;
                        } | null;
                        mass: {
                            kg: number | null;
                            lb: number | null;
                        } | null;
                        name: string | null;
                        payload_weights: ({
                            id: string | null;
                            kg: number | null;
                            lb: number | null;
                            name: string | null;
                        } | null)[] | null;
                        second_stage: {
                            burn_time_sec: number | null;
                            engines: number | null;
                            fuel_amount_tons: number | null;
                            payloads: {
                                composite_fairing: {
                                    diameter: {
                                        feet: number | null;
                                        meters: number | null;
                                    } | null;
                                    height: {
                                        feet: number | null;
                                        meters: number | null;
                                    } | null;
                                } | null;
                                option_1: string | null;
                            } | null;
                            thrust: {
                                kN: number | null;
                                lbf: number | null;
                            } | null;
                        } | null;
                        stages: number | null;
                        success_rate_pct: number | null;
                        type: string | null;
                        wikipedia: string | null;
                    } | null;
                    rocket_name: string | null;
                    rocket_type: string | null;
                    second_stage: {
                        block: number | null;
                        payloads: ({
                            customers: (string | null)[] | null;
                            id: string | null;
                            manufacturer: string | null;
                            nationality: string | null;
                            norad_id: (number | null)[] | null;
                            orbit: string | null;
                            orbit_params: {
                                apoapsis_km: number | null;
                                arg_of_pericenter: number | null;
                                eccentricity: number | null;
                                epoch: Date | null;
                                inclination_deg: number | null;
                                lifespan_years: number | null;
                                longitude: number | null;
                                mean_anomaly: number | null;
                                mean_motion: number | null;
                                periapsis_km: number | null;
                                period_min: number | null;
                                raan: number | null;
                                reference_system: string | null;
                                regime: string | null;
                                semi_major_axis_km: number | null;
                            } | null;
                            payload_mass_kg: number | null;
                            payload_mass_lbs: number | null;
                            payload_type: string | null;
                            reused: boolean | null;
                        } | null)[] | null;
                    } | null;
                } | null;
                ships: ({
                    abs: number | null;
                    active: boolean | null;
                    attempted_landings: number | null;
                    class: number | null;
                    course_deg: number | null;
                    home_port: string | null;
                    id: string | null;
                    image: string | null;
                    imo: number | null;
                    missions: ({
                        flight: string | null;
                        name: string | null;
                    } | null)[] | null;
                    mmsi: number | null;
                    model: string | null;
                    name: string | null;
                    position: {
                        latitude: number | null;
                        longitude: number | null;
                    } | null;
                    roles: (string | null)[] | null;
                    speed_kn: number | null;
                    status: string | null;
                    successful_landings: number | null;
                    type: string | null;
                    url: string | null;
                    weight_kg: number | null;
                    weight_lbs: number | null;
                    year_built: number | null;
                } | null)[] | null;
                static_fire_date_unix: Date | null;
                static_fire_date_utc: Date | null;
                telemetry: {
                    flight_club: string | null;
                } | null;
                tentative_max_precision: string | null;
                upcoming: boolean | null;
            } | null)[] | null;
            result: {
                totalCount: number | null;
            } | null;
        } | null;
        launchesUpcoming: (p?: {
            find?: {
                [x: string]: any;
            } | undefined;
            limit?: number | undefined;
            offset?: number | undefined;
            order?: string | undefined;
            sort?: string | undefined;
        } | undefined) => ({
            details: string | null;
            id: string | null;
            is_tentative: boolean | null;
            launch_date_local: Date | null;
            launch_date_unix: Date | null;
            launch_date_utc: Date | null;
            launch_site: {
                site_id: string | null;
                site_name: string | null;
                site_name_long: string | null;
            } | null;
            launch_success: boolean | null;
            launch_year: string | null;
            links: {
                article_link: string | null;
                flickr_images: (string | null)[] | null;
                mission_patch: string | null;
                mission_patch_small: string | null;
                presskit: string | null;
                reddit_campaign: string | null;
                reddit_launch: string | null;
                reddit_media: string | null;
                reddit_recovery: string | null;
                video_link: string | null;
                wikipedia: string | null;
            } | null;
            mission_id: (string | null)[] | null;
            mission_name: string | null;
            rocket: {
                fairings: {
                    recovered: boolean | null;
                    recovery_attempt: boolean | null;
                    reused: boolean | null;
                    ship: string | null;
                } | null;
                first_stage: {
                    cores: ({
                        block: number | null;
                        core: {
                            asds_attempts: number | null;
                            asds_landings: number | null;
                            block: number | null;
                            id: string | null;
                            missions: ({
                                flight: number | null;
                                name: string | null;
                            } | null)[] | null;
                            original_launch: Date | null;
                            reuse_count: number | null;
                            rtls_attempts: number | null;
                            rtls_landings: number | null;
                            status: string | null;
                            water_landing: boolean | null;
                        } | null;
                        flight: number | null;
                        gridfins: boolean | null;
                        land_success: boolean | null;
                        landing_intent: boolean | null;
                        landing_type: string | null;
                        landing_vehicle: string | null;
                        legs: boolean | null;
                        reused: boolean | null;
                    } | null)[] | null;
                } | null;
                rocket: {
                    active: boolean | null;
                    boosters: number | null;
                    company: string | null;
                    cost_per_launch: number | null;
                    country: string | null;
                    description: string | null;
                    diameter: {
                        feet: number | null;
                        meters: number | null;
                    } | null;
                    engines: {
                        engine_loss_max: string | null;
                        layout: string | null;
                        number: number | null;
                        propellant_1: string | null;
                        propellant_2: string | null;
                        thrust_sea_level: {
                            kN: number | null;
                            lbf: number | null;
                        } | null;
                        thrust_to_weight: number | null;
                        thrust_vacuum: {
                            kN: number | null;
                            lbf: number | null;
                        } | null;
                        type: string | null;
                        version: string | null;
                    } | null;
                    first_flight: Date | null;
                    first_stage: {
                        burn_time_sec: number | null;
                        engines: number | null;
                        fuel_amount_tons: number | null;
                        reusable: boolean | null;
                        thrust_sea_level: {
                            kN: number | null;
                            lbf: number | null;
                        } | null;
                        thrust_vacuum: {
                            kN: number | null;
                            lbf: number | null;
                        } | null;
                    } | null;
                    height: {
                        feet: number | null;
                        meters: number | null;
                    } | null;
                    id: string | null;
                    landing_legs: {
                        material: string | null;
                        number: number | null;
                    } | null;
                    mass: {
                        kg: number | null;
                        lb: number | null;
                    } | null;
                    name: string | null;
                    payload_weights: ({
                        id: string | null;
                        kg: number | null;
                        lb: number | null;
                        name: string | null;
                    } | null)[] | null;
                    second_stage: {
                        burn_time_sec: number | null;
                        engines: number | null;
                        fuel_amount_tons: number | null;
                        payloads: {
                            composite_fairing: {
                                diameter: {
                                    feet: number | null;
                                    meters: number | null;
                                } | null;
                                height: {
                                    feet: number | null;
                                    meters: number | null;
                                } | null;
                            } | null;
                            option_1: string | null;
                        } | null;
                        thrust: {
                            kN: number | null;
                            lbf: number | null;
                        } | null;
                    } | null;
                    stages: number | null;
                    success_rate_pct: number | null;
                    type: string | null;
                    wikipedia: string | null;
                } | null;
                rocket_name: string | null;
                rocket_type: string | null;
                second_stage: {
                    block: number | null;
                    payloads: ({
                        customers: (string | null)[] | null;
                        id: string | null;
                        manufacturer: string | null;
                        nationality: string | null;
                        norad_id: (number | null)[] | null;
                        orbit: string | null;
                        orbit_params: {
                            apoapsis_km: number | null;
                            arg_of_pericenter: number | null;
                            eccentricity: number | null;
                            epoch: Date | null;
                            inclination_deg: number | null;
                            lifespan_years: number | null;
                            longitude: number | null;
                            mean_anomaly: number | null;
                            mean_motion: number | null;
                            periapsis_km: number | null;
                            period_min: number | null;
                            raan: number | null;
                            reference_system: string | null;
                            regime: string | null;
                            semi_major_axis_km: number | null;
                        } | null;
                        payload_mass_kg: number | null;
                        payload_mass_lbs: number | null;
                        payload_type: string | null;
                        reused: boolean | null;
                    } | null)[] | null;
                } | null;
            } | null;
            ships: ({
                abs: number | null;
                active: boolean | null;
                attempted_landings: number | null;
                class: number | null;
                course_deg: number | null;
                home_port: string | null;
                id: string | null;
                image: string | null;
                imo: number | null;
                missions: ({
                    flight: string | null;
                    name: string | null;
                } | null)[] | null;
                mmsi: number | null;
                model: string | null;
                name: string | null;
                position: {
                    latitude: number | null;
                    longitude: number | null;
                } | null;
                roles: (string | null)[] | null;
                speed_kn: number | null;
                status: string | null;
                successful_landings: number | null;
                type: string | null;
                url: string | null;
                weight_kg: number | null;
                weight_lbs: number | null;
                year_built: number | null;
            } | null)[] | null;
            static_fire_date_unix: Date | null;
            static_fire_date_utc: Date | null;
            telemetry: {
                flight_club: string | null;
            } | null;
            tentative_max_precision: string | null;
            upcoming: boolean | null;
        } | null)[] | null;
        launchpad: (p: {
            id: string;
        }) => {
            attempted_launches: number | null;
            details: string | null;
            id: string | null;
            location: {
                latitude: number | null;
                longitude: number | null;
                name: string | null;
                region: string | null;
            } | null;
            name: string | null;
            status: string | null;
            successful_launches: number | null;
            vehicles_launched: ({
                active: boolean | null;
                boosters: number | null;
                company: string | null;
                cost_per_launch: number | null;
                country: string | null;
                description: string | null;
                diameter: {
                    feet: number | null;
                    meters: number | null;
                } | null;
                engines: {
                    engine_loss_max: string | null;
                    layout: string | null;
                    number: number | null;
                    propellant_1: string | null;
                    propellant_2: string | null;
                    thrust_sea_level: {
                        kN: number | null;
                        lbf: number | null;
                    } | null;
                    thrust_to_weight: number | null;
                    thrust_vacuum: {
                        kN: number | null;
                        lbf: number | null;
                    } | null;
                    type: string | null;
                    version: string | null;
                } | null;
                first_flight: Date | null;
                first_stage: {
                    burn_time_sec: number | null;
                    engines: number | null;
                    fuel_amount_tons: number | null;
                    reusable: boolean | null;
                    thrust_sea_level: {
                        kN: number | null;
                        lbf: number | null;
                    } | null;
                    thrust_vacuum: {
                        kN: number | null;
                        lbf: number | null;
                    } | null;
                } | null;
                height: {
                    feet: number | null;
                    meters: number | null;
                } | null;
                id: string | null;
                landing_legs: {
                    material: string | null;
                    number: number | null;
                } | null;
                mass: {
                    kg: number | null;
                    lb: number | null;
                } | null;
                name: string | null;
                payload_weights: ({
                    id: string | null;
                    kg: number | null;
                    lb: number | null;
                    name: string | null;
                } | null)[] | null;
                second_stage: {
                    burn_time_sec: number | null;
                    engines: number | null;
                    fuel_amount_tons: number | null;
                    payloads: {
                        composite_fairing: {
                            diameter: {
                                feet: number | null;
                                meters: number | null;
                            } | null;
                            height: {
                                feet: number | null;
                                meters: number | null;
                            } | null;
                        } | null;
                        option_1: string | null;
                    } | null;
                    thrust: {
                        kN: number | null;
                        lbf: number | null;
                    } | null;
                } | null;
                stages: number | null;
                success_rate_pct: number | null;
                type: string | null;
                wikipedia: string | null;
            } | null)[] | null;
            wikipedia: string | null;
        } | null;
        launchpads: (p?: {
            limit?: number | undefined;
            offset?: number | undefined;
        } | undefined) => ({
            attempted_launches: number | null;
            details: string | null;
            id: string | null;
            location: {
                latitude: number | null;
                longitude: number | null;
                name: string | null;
                region: string | null;
            } | null;
            name: string | null;
            status: string | null;
            successful_launches: number | null;
            vehicles_launched: ({
                active: boolean | null;
                boosters: number | null;
                company: string | null;
                cost_per_launch: number | null;
                country: string | null;
                description: string | null;
                diameter: {
                    feet: number | null;
                    meters: number | null;
                } | null;
                engines: {
                    engine_loss_max: string | null;
                    layout: string | null;
                    number: number | null;
                    propellant_1: string | null;
                    propellant_2: string | null;
                    thrust_sea_level: {
                        kN: number | null;
                        lbf: number | null;
                    } | null;
                    thrust_to_weight: number | null;
                    thrust_vacuum: {
                        kN: number | null;
                        lbf: number | null;
                    } | null;
                    type: string | null;
                    version: string | null;
                } | null;
                first_flight: Date | null;
                first_stage: {
                    burn_time_sec: number | null;
                    engines: number | null;
                    fuel_amount_tons: number | null;
                    reusable: boolean | null;
                    thrust_sea_level: {
                        kN: number | null;
                        lbf: number | null;
                    } | null;
                    thrust_vacuum: {
                        kN: number | null;
                        lbf: number | null;
                    } | null;
                } | null;
                height: {
                    feet: number | null;
                    meters: number | null;
                } | null;
                id: string | null;
                landing_legs: {
                    material: string | null;
                    number: number | null;
                } | null;
                mass: {
                    kg: number | null;
                    lb: number | null;
                } | null;
                name: string | null;
                payload_weights: ({
                    id: string | null;
                    kg: number | null;
                    lb: number | null;
                    name: string | null;
                } | null)[] | null;
                second_stage: {
                    burn_time_sec: number | null;
                    engines: number | null;
                    fuel_amount_tons: number | null;
                    payloads: {
                        composite_fairing: {
                            diameter: {
                                feet: number | null;
                                meters: number | null;
                            } | null;
                            height: {
                                feet: number | null;
                                meters: number | null;
                            } | null;
                        } | null;
                        option_1: string | null;
                    } | null;
                    thrust: {
                        kN: number | null;
                        lbf: number | null;
                    } | null;
                } | null;
                stages: number | null;
                success_rate_pct: number | null;
                type: string | null;
                wikipedia: string | null;
            } | null)[] | null;
            wikipedia: string | null;
        } | null)[] | null;
        mission: (p: {
            id: string;
        }) => {
            description: string | null;
            id: string | null;
            manufacturers: (string | null)[] | null;
            name: string | null;
            payloads: ({
                customers: (string | null)[] | null;
                id: string | null;
                manufacturer: string | null;
                nationality: string | null;
                norad_id: (number | null)[] | null;
                orbit: string | null;
                orbit_params: {
                    apoapsis_km: number | null;
                    arg_of_pericenter: number | null;
                    eccentricity: number | null;
                    epoch: Date | null;
                    inclination_deg: number | null;
                    lifespan_years: number | null;
                    longitude: number | null;
                    mean_anomaly: number | null;
                    mean_motion: number | null;
                    periapsis_km: number | null;
                    period_min: number | null;
                    raan: number | null;
                    reference_system: string | null;
                    regime: string | null;
                    semi_major_axis_km: number | null;
                } | null;
                payload_mass_kg: number | null;
                payload_mass_lbs: number | null;
                payload_type: string | null;
                reused: boolean | null;
            } | null)[] | null;
            twitter: string | null;
            website: string | null;
            wikipedia: string | null;
        } | null;
        "@deprecated": (p: {
            reason?: unknown;
            ")\n        payload(id": string;
        }) => {
            customers: (string | null)[] | null;
            id: string | null;
            manufacturer: string | null;
            nationality: string | null;
            norad_id: (number | null)[] | null;
            orbit: string | null;
            orbit_params: {
                apoapsis_km: number | null;
                arg_of_pericenter: number | null;
                eccentricity: number | null;
                epoch: Date | null;
                inclination_deg: number | null;
                lifespan_years: number | null;
                longitude: number | null;
                mean_anomaly: number | null;
                mean_motion: number | null;
                periapsis_km: number | null;
                period_min: number | null;
                raan: number | null;
                reference_system: string | null;
                regime: string | null;
                semi_major_axis_km: number | null;
            } | null;
            payload_mass_kg: number | null;
            payload_mass_lbs: number | null;
            payload_type: string | null;
            reused: boolean | null;
        } | null;
        payloads: (p?: {
            find?: {
                apoapsis_km: number | null;
                customer: string | null;
                eccentricity: number | null;
                epoch: Date | null;
                inclination_deg: number | null;
                lifespan_years: number | null;
                longitude: number | null;
                manufacturer: string | null;
                mean_motion: number | null;
                nationality: string | null;
                norad_id: number | null;
                orbit: string | null;
                payload_id: string | null;
                payload_type: string | null;
                periapsis_km: number | null;
                period_min: number | null;
                raan: number | null;
                reference_system: string | null;
                regime: string | null;
                reused: boolean | null;
                semi_major_axis_km: number | null;
            } | undefined;
            limit?: number | undefined;
            offset?: number | undefined;
            order?: string | undefined;
            sort?: string | undefined;
        } | undefined) => ({
            customers: (string | null)[] | null;
            id: string | null;
            manufacturer: string | null;
            nationality: string | null;
            norad_id: (number | null)[] | null;
            orbit: string | null;
            orbit_params: {
                apoapsis_km: number | null;
                arg_of_pericenter: number | null;
                eccentricity: number | null;
                epoch: Date | null;
                inclination_deg: number | null;
                lifespan_years: number | null;
                longitude: number | null;
                mean_anomaly: number | null;
                mean_motion: number | null;
                periapsis_km: number | null;
                period_min: number | null;
                raan: number | null;
                reference_system: string | null;
                regime: string | null;
                semi_major_axis_km: number | null;
            } | null;
            payload_mass_kg: number | null;
            payload_mass_lbs: number | null;
            payload_type: string | null;
            reused: boolean | null;
        } | null)[] | null;
        roadster: {
            apoapsis_au: number | null;
            details: string | null;
            earth_distance_km: number | null;
            earth_distance_mi: number | null;
            eccentricity: number | null;
            epoch_jd: number | null;
            inclination: number | null;
            launch_date_unix: Date | null;
            launch_date_utc: Date | null;
            launch_mass_kg: number | null;
            launch_mass_lbs: number | null;
            longitude: number | null;
            mars_distance_km: number | null;
            mars_distance_mi: number | null;
            name: string | null;
            norad_id: number | null;
            orbit_type: number | null;
            periapsis_arg: number | null;
            periapsis_au: number | null;
            period_days: number | null;
            semi_major_axis_au: number | null;
            speed_kph: number | null;
            speed_mph: number | null;
            wikipedia: string | null;
        } | null;
        rocket: (p: {
            id: string;
        }) => {
            active: boolean | null;
            boosters: number | null;
            company: string | null;
            cost_per_launch: number | null;
            country: string | null;
            description: string | null;
            diameter: {
                feet: number | null;
                meters: number | null;
            } | null;
            engines: {
                engine_loss_max: string | null;
                layout: string | null;
                number: number | null;
                propellant_1: string | null;
                propellant_2: string | null;
                thrust_sea_level: {
                    kN: number | null;
                    lbf: number | null;
                } | null;
                thrust_to_weight: number | null;
                thrust_vacuum: {
                    kN: number | null;
                    lbf: number | null;
                } | null;
                type: string | null;
                version: string | null;
            } | null;
            first_flight: Date | null;
            first_stage: {
                burn_time_sec: number | null;
                engines: number | null;
                fuel_amount_tons: number | null;
                reusable: boolean | null;
                thrust_sea_level: {
                    kN: number | null;
                    lbf: number | null;
                } | null;
                thrust_vacuum: {
                    kN: number | null;
                    lbf: number | null;
                } | null;
            } | null;
            height: {
                feet: number | null;
                meters: number | null;
            } | null;
            id: string | null;
            landing_legs: {
                material: string | null;
                number: number | null;
            } | null;
            mass: {
                kg: number | null;
                lb: number | null;
            } | null;
            name: string | null;
            payload_weights: ({
                id: string | null;
                kg: number | null;
                lb: number | null;
                name: string | null;
            } | null)[] | null;
            second_stage: {
                burn_time_sec: number | null;
                engines: number | null;
                fuel_amount_tons: number | null;
                payloads: {
                    composite_fairing: {
                        diameter: {
                            feet: number | null;
                            meters: number | null;
                        } | null;
                        height: {
                            feet: number | null;
                            meters: number | null;
                        } | null;
                    } | null;
                    option_1: string | null;
                } | null;
                thrust: {
                    kN: number | null;
                    lbf: number | null;
                } | null;
            } | null;
            stages: number | null;
            success_rate_pct: number | null;
            type: string | null;
            wikipedia: string | null;
        } | null;
        rockets: (p?: {
            limit?: number | undefined;
            offset?: number | undefined;
        } | undefined) => ({
            active: boolean | null;
            boosters: number | null;
            company: string | null;
            cost_per_launch: number | null;
            country: string | null;
            description: string | null;
            diameter: {
                feet: number | null;
                meters: number | null;
            } | null;
            engines: {
                engine_loss_max: string | null;
                layout: string | null;
                number: number | null;
                propellant_1: string | null;
                propellant_2: string | null;
                thrust_sea_level: {
                    kN: number | null;
                    lbf: number | null;
                } | null;
                thrust_to_weight: number | null;
                thrust_vacuum: {
                    kN: number | null;
                    lbf: number | null;
                } | null;
                type: string | null;
                version: string | null;
            } | null;
            first_flight: Date | null;
            first_stage: {
                burn_time_sec: number | null;
                engines: number | null;
                fuel_amount_tons: number | null;
                reusable: boolean | null;
                thrust_sea_level: {
                    kN: number | null;
                    lbf: number | null;
                } | null;
                thrust_vacuum: {
                    kN: number | null;
                    lbf: number | null;
                } | null;
            } | null;
            height: {
                feet: number | null;
                meters: number | null;
            } | null;
            id: string | null;
            landing_legs: {
                material: string | null;
                number: number | null;
            } | null;
            mass: {
                kg: number | null;
                lb: number | null;
            } | null;
            name: string | null;
            payload_weights: ({
                id: string | null;
                kg: number | null;
                lb: number | null;
                name: string | null;
            } | null)[] | null;
            second_stage: {
                burn_time_sec: number | null;
                engines: number | null;
                fuel_amount_tons: number | null;
                payloads: {
                    composite_fairing: {
                        diameter: {
                            feet: number | null;
                            meters: number | null;
                        } | null;
                        height: {
                            feet: number | null;
                            meters: number | null;
                        } | null;
                    } | null;
                    option_1: string | null;
                } | null;
                thrust: {
                    kN: number | null;
                    lbf: number | null;
                } | null;
            } | null;
            stages: number | null;
            success_rate_pct: number | null;
            type: string | null;
            wikipedia: string | null;
        } | null)[] | null;
        rocketsResult: (p?: {
            limit?: number | undefined;
            offset?: number | undefined;
        } | undefined) => {
            data: ({
                active: boolean | null;
                boosters: number | null;
                company: string | null;
                cost_per_launch: number | null;
                country: string | null;
                description: string | null;
                diameter: {
                    feet: number | null;
                    meters: number | null;
                } | null;
                engines: {
                    engine_loss_max: string | null;
                    layout: string | null;
                    number: number | null;
                    propellant_1: string | null;
                    propellant_2: string | null;
                    thrust_sea_level: {
                        kN: number | null;
                        lbf: number | null;
                    } | null;
                    thrust_to_weight: number | null;
                    thrust_vacuum: {
                        kN: number | null;
                        lbf: number | null;
                    } | null;
                    type: string | null;
                    version: string | null;
                } | null;
                first_flight: Date | null;
                first_stage: {
                    burn_time_sec: number | null;
                    engines: number | null;
                    fuel_amount_tons: number | null;
                    reusable: boolean | null;
                    thrust_sea_level: {
                        kN: number | null;
                        lbf: number | null;
                    } | null;
                    thrust_vacuum: {
                        kN: number | null;
                        lbf: number | null;
                    } | null;
                } | null;
                height: {
                    feet: number | null;
                    meters: number | null;
                } | null;
                id: string | null;
                landing_legs: {
                    material: string | null;
                    number: number | null;
                } | null;
                mass: {
                    kg: number | null;
                    lb: number | null;
                } | null;
                name: string | null;
                payload_weights: ({
                    id: string | null;
                    kg: number | null;
                    lb: number | null;
                    name: string | null;
                } | null)[] | null;
                second_stage: {
                    burn_time_sec: number | null;
                    engines: number | null;
                    fuel_amount_tons: number | null;
                    payloads: {
                        composite_fairing: {
                            diameter: {
                                feet: number | null;
                                meters: number | null;
                            } | null;
                            height: {
                                feet: number | null;
                                meters: number | null;
                            } | null;
                        } | null;
                        option_1: string | null;
                    } | null;
                    thrust: {
                        kN: number | null;
                        lbf: number | null;
                    } | null;
                } | null;
                stages: number | null;
                success_rate_pct: number | null;
                type: string | null;
                wikipedia: string | null;
            } | null)[] | null;
            result: {
                totalCount: number | null;
            } | null;
        } | null;
        ship: (p: {
            id: string;
        }) => {
            abs: number | null;
            active: boolean | null;
            attempted_landings: number | null;
            class: number | null;
            course_deg: number | null;
            home_port: string | null;
            id: string | null;
            image: string | null;
            imo: number | null;
            missions: ({
                flight: string | null;
                name: string | null;
            } | null)[] | null;
            mmsi: number | null;
            model: string | null;
            name: string | null;
            position: {
                latitude: number | null;
                longitude: number | null;
            } | null;
            roles: (string | null)[] | null;
            speed_kn: number | null;
            status: string | null;
            successful_landings: number | null;
            type: string | null;
            url: string | null;
            weight_kg: number | null;
            weight_lbs: number | null;
            year_built: number | null;
        } | null;
        ships: (p?: {
            find?: {
                id: string | null;
                name: string | null;
                model: string | null;
                type: string | null;
                role: string | null;
                active: boolean | null;
                imo: number | null;
                mmsi: number | null;
                abs: number | null;
                class: number | null;
                weight_lbs: number | null;
                weight_kg: number | null;
                year_built: number | null;
                home_port: string | null;
                status: string | null;
                speed_kn: number | null;
                course_deg: number | null;
                latitude: number | null;
                longitude: number | null;
                successful_landings: number | null;
                attempted_landings: number | null;
                mission: string | null;
            } | undefined;
            limit?: number | undefined;
            offset?: number | undefined;
            order?: string | undefined;
            sort?: string | undefined;
        } | undefined) => ({
            abs: number | null;
            active: boolean | null;
            attempted_landings: number | null;
            class: number | null;
            course_deg: number | null;
            home_port: string | null;
            id: string | null;
            image: string | null;
            imo: number | null;
            missions: ({
                flight: string | null;
                name: string | null;
            } | null)[] | null;
            mmsi: number | null;
            model: string | null;
            name: string | null;
            position: {
                latitude: number | null;
                longitude: number | null;
            } | null;
            roles: (string | null)[] | null;
            speed_kn: number | null;
            status: string | null;
            successful_landings: number | null;
            type: string | null;
            url: string | null;
            weight_kg: number | null;
            weight_lbs: number | null;
            year_built: number | null;
        } | null)[] | null;
        shipsResult: (p?: {
            find?: {
                id: string | null;
                name: string | null;
                model: string | null;
                type: string | null;
                role: string | null;
                active: boolean | null;
                imo: number | null;
                mmsi: number | null;
                abs: number | null;
                class: number | null;
                weight_lbs: number | null;
                weight_kg: number | null;
                year_built: number | null;
                home_port: string | null;
                status: string | null;
                speed_kn: number | null;
                course_deg: number | null;
                latitude: number | null;
                longitude: number | null;
                successful_landings: number | null;
                attempted_landings: number | null;
                mission: string | null;
            } | undefined;
            limit?: number | undefined;
            offset?: number | undefined;
            order?: string | undefined;
            sort?: string | undefined;
        } | undefined) => {
            data: ({
                abs: number | null;
                active: boolean | null;
                attempted_landings: number | null;
                class: number | null;
                course_deg: number | null;
                home_port: string | null;
                id: string | null;
                image: string | null;
                imo: number | null;
                missions: ({
                    flight: string | null;
                    name: string | null;
                } | null)[] | null;
                mmsi: number | null;
                model: string | null;
                name: string | null;
                position: {
                    latitude: number | null;
                    longitude: number | null;
                } | null;
                roles: (string | null)[] | null;
                speed_kn: number | null;
                status: string | null;
                successful_landings: number | null;
                type: string | null;
                url: string | null;
                weight_kg: number | null;
                weight_lbs: number | null;
                year_built: number | null;
            } | null)[] | null;
            result: {
                totalCount: number | null;
            } | null;
        } | null;
        users: (p: {
            distinct_on: ("name" | "id" | "rocket" | "twitter" | "timestamp" | "column")[];
            limit?: number | undefined;
            offset?: number | undefined;
            order_by: {
                id: "asc" | "asc_nulls_first" | "asc_nulls_last" | "desc" | "desc_nulls_first" | "desc_nulls_last" | null;
                name: "asc" | "asc_nulls_first" | "asc_nulls_last" | "desc" | "desc_nulls_first" | "desc_nulls_last" | null;
                rocket: "asc" | "asc_nulls_first" | "asc_nulls_last" | "desc" | "desc_nulls_first" | "desc_nulls_last" | null;
                timestamp: "asc" | "asc_nulls_first" | "asc_nulls_last" | "desc" | "desc_nulls_first" | "desc_nulls_last" | null;
                twitter: "asc" | "asc_nulls_first" | "asc_nulls_last" | "desc" | "desc_nulls_first" | "desc_nulls_last" | null;
            }[];
            where?: {
                _and: (any | null)[] | null;
                _not: any | null;
                _or: (any | null)[] | null;
                id: {
                    _eq: string | null;
                    _gt: string | null;
                    _gte: string | null;
                    _in: string[] | null;
                    _is_null: boolean | null;
                    _lt: string | null;
                    _lte: string | null;
                    _neq: string | null;
                    _nin: string[] | null;
                } | null;
                name: {
                    _eq: string | null;
                    _gt: string | null;
                    _gte: string | null;
                    _ilike: string | null;
                    _in: string[] | null;
                    _is_null: boolean | null;
                    _like: string | null;
                    _lt: string | null;
                    _lte: string | null;
                    _neq: string | null;
                    _nilike: string | null;
                    _nin: string[] | null;
                    _nlike: string | null;
                    _nsimilar: string | null;
                    _similar: string | null;
                } | null;
                rocket: {
                    _eq: string | null;
                    _gt: string | null;
                    _gte: string | null;
                    _ilike: string | null;
                    _in: string[] | null;
                    _is_null: boolean | null;
                    _like: string | null;
                    _lt: string | null;
                    _lte: string | null;
                    _neq: string | null;
                    _nilike: string | null;
                    _nin: string[] | null;
                    _nlike: string | null;
                    _nsimilar: string | null;
                    _similar: string | null;
                } | null;
                timestamp: {
                    _eq: string | null;
                    _gt: string | null;
                    _gte: string | null;
                    _in: string[] | null;
                    _is_null: boolean | null;
                    _lt: string | null;
                    _lte: string | null;
                    _neq: string | null;
                    _nin: string[] | null;
                } | null;
                twitter: {
                    _eq: string | null;
                    _gt: string | null;
                    _gte: string | null;
                    _ilike: string | null;
                    _in: string[] | null;
                    _is_null: boolean | null;
                    _like: string | null;
                    _lt: string | null;
                    _lte: string | null;
                    _neq: string | null;
                    _nilike: string | null;
                    _nin: string[] | null;
                    _nlike: string | null;
                    _nsimilar: string | null;
                    _similar: string | null;
                } | null;
            } | undefined;
        }) => {
            id: string;
            name: string | null;
            rocket: string | null;
            timestamp: string;
            twitter: string | null;
        }[];
        users_aggregate: (p: {
            distinct_on: ("name" | "id" | "rocket" | "twitter" | "timestamp" | "column")[];
            limit?: number | undefined;
            offset?: number | undefined;
            order_by: {
                id: "asc" | "asc_nulls_first" | "asc_nulls_last" | "desc" | "desc_nulls_first" | "desc_nulls_last" | null;
                name: "asc" | "asc_nulls_first" | "asc_nulls_last" | "desc" | "desc_nulls_first" | "desc_nulls_last" | null;
                rocket: "asc" | "asc_nulls_first" | "asc_nulls_last" | "desc" | "desc_nulls_first" | "desc_nulls_last" | null;
                timestamp: "asc" | "asc_nulls_first" | "asc_nulls_last" | "desc" | "desc_nulls_first" | "desc_nulls_last" | null;
                twitter: "asc" | "asc_nulls_first" | "asc_nulls_last" | "desc" | "desc_nulls_first" | "desc_nulls_last" | null;
            }[];
            where?: {
                _and: (any | null)[] | null;
                _not: any | null;
                _or: (any | null)[] | null;
                id: {
                    _eq: string | null;
                    _gt: string | null;
                    _gte: string | null;
                    _in: string[] | null;
                    _is_null: boolean | null;
                    _lt: string | null;
                    _lte: string | null;
                    _neq: string | null;
                    _nin: string[] | null;
                } | null;
                name: {
                    _eq: string | null;
                    _gt: string | null;
                    _gte: string | null;
                    _ilike: string | null;
                    _in: string[] | null;
                    _is_null: boolean | null;
                    _like: string | null;
                    _lt: string | null;
                    _lte: string | null;
                    _neq: string | null;
                    _nilike: string | null;
                    _nin: string[] | null;
                    _nlike: string | null;
                    _nsimilar: string | null;
                    _similar: string | null;
                } | null;
                rocket: {
                    _eq: string | null;
                    _gt: string | null;
                    _gte: string | null;
                    _ilike: string | null;
                    _in: string[] | null;
                    _is_null: boolean | null;
                    _like: string | null;
                    _lt: string | null;
                    _lte: string | null;
                    _neq: string | null;
                    _nilike: string | null;
                    _nin: string[] | null;
                    _nlike: string | null;
                    _nsimilar: string | null;
                    _similar: string | null;
                } | null;
                timestamp: {
                    _eq: string | null;
                    _gt: string | null;
                    _gte: string | null;
                    _in: string[] | null;
                    _is_null: boolean | null;
                    _lt: string | null;
                    _lte: string | null;
                    _neq: string | null;
                    _nin: string[] | null;
                } | null;
                twitter: {
                    _eq: string | null;
                    _gt: string | null;
                    _gte: string | null;
                    _ilike: string | null;
                    _in: string[] | null;
                    _is_null: boolean | null;
                    _like: string | null;
                    _lt: string | null;
                    _lte: string | null;
                    _neq: string | null;
                    _nilike: string | null;
                    _nin: string[] | null;
                    _nlike: string | null;
                    _nsimilar: string | null;
                    _similar: string | null;
                } | null;
            } | undefined;
        }) => {
            aggregate: {
                count: (p: {
                    columns: ("name" | "id" | "rocket" | "twitter" | "timestamp" | "column")[];
                    distinct?: boolean | undefined;
                }) => number | null;
                max: {
                    name: string | null;
                    rocket: string | null;
                    timestamp: string | null;
                    twitter: string | null;
                } | null;
                min: {
                    name: string | null;
                    rocket: string | null;
                    timestamp: string | null;
                    twitter: string | null;
                } | null;
            } | null;
            nodes: {
                id: string;
                name: string | null;
                rocket: string | null;
                timestamp: string;
                twitter: string | null;
            }[];
        };
        users_by_pk: (p: {
            id: string;
        }) => {
            id: string;
            name: string | null;
            rocket: string | null;
            timestamp: string;
            twitter: string | null;
        } | null;
        _service: {
            sdl: string | null;
        };
    };
    Result: {
        totalCount: number | null;
    };
    Roadster: {
        apoapsis_au: number | null;
        details: string | null;
        earth_distance_km: number | null;
        earth_distance_mi: number | null;
        eccentricity: number | null;
        epoch_jd: number | null;
        inclination: number | null;
        launch_date_unix: Date | null;
        launch_date_utc: Date | null;
        launch_mass_kg: number | null;
        launch_mass_lbs: number | null;
        longitude: number | null;
        mars_distance_km: number | null;
        mars_distance_mi: number | null;
        name: string | null;
        norad_id: number | null;
        orbit_type: number | null;
        periapsis_arg: number | null;
        periapsis_au: number | null;
        period_days: number | null;
        semi_major_axis_au: number | null;
        speed_kph: number | null;
        speed_mph: number | null;
        wikipedia: string | null;
    };
    Rocket: {
        active: boolean | null;
        boosters: number | null;
        company: string | null;
        cost_per_launch: number | null;
        country: string | null;
        description: string | null;
        diameter: {
            feet: number | null;
            meters: number | null;
        } | null;
        engines: {
            engine_loss_max: string | null;
            layout: string | null;
            number: number | null;
            propellant_1: string | null;
            propellant_2: string | null;
            thrust_sea_level: {
                kN: number | null;
                lbf: number | null;
            } | null;
            thrust_to_weight: number | null;
            thrust_vacuum: {
                kN: number | null;
                lbf: number | null;
            } | null;
            type: string | null;
            version: string | null;
        } | null;
        first_flight: Date | null;
        first_stage: {
            burn_time_sec: number | null;
            engines: number | null;
            fuel_amount_tons: number | null;
            reusable: boolean | null;
            thrust_sea_level: {
                kN: number | null;
                lbf: number | null;
            } | null;
            thrust_vacuum: {
                kN: number | null;
                lbf: number | null;
            } | null;
        } | null;
        height: {
            feet: number | null;
            meters: number | null;
        } | null;
        id: string | null;
        landing_legs: {
            material: string | null;
            number: number | null;
        } | null;
        mass: {
            kg: number | null;
            lb: number | null;
        } | null;
        name: string | null;
        payload_weights: ({
            id: string | null;
            kg: number | null;
            lb: number | null;
            name: string | null;
        } | null)[] | null;
        second_stage: {
            burn_time_sec: number | null;
            engines: number | null;
            fuel_amount_tons: number | null;
            payloads: {
                composite_fairing: {
                    diameter: {
                        feet: number | null;
                        meters: number | null;
                    } | null;
                    height: {
                        feet: number | null;
                        meters: number | null;
                    } | null;
                } | null;
                option_1: string | null;
            } | null;
            thrust: {
                kN: number | null;
                lbf: number | null;
            } | null;
        } | null;
        stages: number | null;
        success_rate_pct: number | null;
        type: string | null;
        wikipedia: string | null;
    };
    RocketEngines: {
        engine_loss_max: string | null;
        layout: string | null;
        number: number | null;
        propellant_1: string | null;
        propellant_2: string | null;
        thrust_sea_level: {
            kN: number | null;
            lbf: number | null;
        } | null;
        thrust_to_weight: number | null;
        thrust_vacuum: {
            kN: number | null;
            lbf: number | null;
        } | null;
        type: string | null;
        version: string | null;
    };
    RocketFirstStage: {
        burn_time_sec: number | null;
        engines: number | null;
        fuel_amount_tons: number | null;
        reusable: boolean | null;
        thrust_sea_level: {
            kN: number | null;
            lbf: number | null;
        } | null;
        thrust_vacuum: {
            kN: number | null;
            lbf: number | null;
        } | null;
    };
    RocketLandingLegs: {
        material: string | null;
        number: number | null;
    };
    RocketPayloadWeight: {
        id: string | null;
        kg: number | null;
        lb: number | null;
        name: string | null;
    };
    RocketSecondStage: {
        burn_time_sec: number | null;
        engines: number | null;
        fuel_amount_tons: number | null;
        payloads: {
            composite_fairing: {
                diameter: {
                    feet: number | null;
                    meters: number | null;
                } | null;
                height: {
                    feet: number | null;
                    meters: number | null;
                } | null;
            } | null;
            option_1: string | null;
        } | null;
        thrust: {
            kN: number | null;
            lbf: number | null;
        } | null;
    };
    RocketSecondStagePayloadCompositeFairing: {
        diameter: {
            feet: number | null;
            meters: number | null;
        } | null;
        height: {
            feet: number | null;
            meters: number | null;
        } | null;
    };
    RocketSecondStagePayloads: {
        composite_fairing: {
            diameter: {
                feet: number | null;
                meters: number | null;
            } | null;
            height: {
                feet: number | null;
                meters: number | null;
            } | null;
        } | null;
        option_1: string | null;
    };
    RocketsResult: {
        data: ({
            active: boolean | null;
            boosters: number | null;
            company: string | null;
            cost_per_launch: number | null;
            country: string | null;
            description: string | null;
            diameter: {
                feet: number | null;
                meters: number | null;
            } | null;
            engines: {
                engine_loss_max: string | null;
                layout: string | null;
                number: number | null;
                propellant_1: string | null;
                propellant_2: string | null;
                thrust_sea_level: {
                    kN: number | null;
                    lbf: number | null;
                } | null;
                thrust_to_weight: number | null;
                thrust_vacuum: {
                    kN: number | null;
                    lbf: number | null;
                } | null;
                type: string | null;
                version: string | null;
            } | null;
            first_flight: Date | null;
            first_stage: {
                burn_time_sec: number | null;
                engines: number | null;
                fuel_amount_tons: number | null;
                reusable: boolean | null;
                thrust_sea_level: {
                    kN: number | null;
                    lbf: number | null;
                } | null;
                thrust_vacuum: {
                    kN: number | null;
                    lbf: number | null;
                } | null;
            } | null;
            height: {
                feet: number | null;
                meters: number | null;
            } | null;
            id: string | null;
            landing_legs: {
                material: string | null;
                number: number | null;
            } | null;
            mass: {
                kg: number | null;
                lb: number | null;
            } | null;
            name: string | null;
            payload_weights: ({
                id: string | null;
                kg: number | null;
                lb: number | null;
                name: string | null;
            } | null)[] | null;
            second_stage: {
                burn_time_sec: number | null;
                engines: number | null;
                fuel_amount_tons: number | null;
                payloads: {
                    composite_fairing: {
                        diameter: {
                            feet: number | null;
                            meters: number | null;
                        } | null;
                        height: {
                            feet: number | null;
                            meters: number | null;
                        } | null;
                    } | null;
                    option_1: string | null;
                } | null;
                thrust: {
                    kN: number | null;
                    lbf: number | null;
                } | null;
            } | null;
            stages: number | null;
            success_rate_pct: number | null;
            type: string | null;
            wikipedia: string | null;
        } | null)[] | null;
        result: {
            totalCount: number | null;
        } | null;
    };
    Ship: {
        abs: number | null;
        active: boolean | null;
        attempted_landings: number | null;
        class: number | null;
        course_deg: number | null;
        home_port: string | null;
        id: string | null;
        image: string | null;
        imo: number | null;
        missions: ({
            flight: string | null;
            name: string | null;
        } | null)[] | null;
        mmsi: number | null;
        model: string | null;
        name: string | null;
        position: {
            latitude: number | null;
            longitude: number | null;
        } | null;
        roles: (string | null)[] | null;
        speed_kn: number | null;
        status: string | null;
        successful_landings: number | null;
        type: string | null;
        url: string | null;
        weight_kg: number | null;
        weight_lbs: number | null;
        year_built: number | null;
    };
    ShipLocation: {
        latitude: number | null;
        longitude: number | null;
    };
    ShipMission: {
        flight: string | null;
        name: string | null;
    };
    ShipsFind: {
        id: string | null;
        name: string | null;
        model: string | null;
        type: string | null;
        role: string | null;
        active: boolean | null;
        imo: number | null;
        mmsi: number | null;
        abs: number | null;
        class: number | null;
        weight_lbs: number | null;
        weight_kg: number | null;
        year_built: number | null;
        home_port: string | null;
        status: string | null;
        speed_kn: number | null;
        course_deg: number | null;
        latitude: number | null;
        longitude: number | null;
        successful_landings: number | null;
        attempted_landings: number | null;
        mission: string | null;
    };
    ShipsResult: {
        data: ({
            abs: number | null;
            active: boolean | null;
            attempted_landings: number | null;
            class: number | null;
            course_deg: number | null;
            home_port: string | null;
            id: string | null;
            image: string | null;
            imo: number | null;
            missions: ({
                flight: string | null;
                name: string | null;
            } | null)[] | null;
            mmsi: number | null;
            model: string | null;
            name: string | null;
            position: {
                latitude: number | null;
                longitude: number | null;
            } | null;
            roles: (string | null)[] | null;
            speed_kn: number | null;
            status: string | null;
            successful_landings: number | null;
            type: string | null;
            url: string | null;
            weight_kg: number | null;
            weight_lbs: number | null;
            year_built: number | null;
        } | null)[] | null;
        result: {
            totalCount: number | null;
        } | null;
    };
    String_comparison_exp: {
        _eq: string | null;
        _gt: string | null;
        _gte: string | null;
        _ilike: string | null;
        _in: string[] | null;
        _is_null: boolean | null;
        _like: string | null;
        _lt: string | null;
        _lte: string | null;
        _neq: string | null;
        _nilike: string | null;
        _nin: string[] | null;
        _nlike: string | null;
        _nsimilar: string | null;
        _similar: string | null;
    };
    Subscription: {
        users: (p: {
            distinct_on: ("name" | "id" | "rocket" | "twitter" | "timestamp" | "column")[];
            limit?: number | undefined;
            offset?: number | undefined;
            order_by: {
                id: "asc" | "asc_nulls_first" | "asc_nulls_last" | "desc" | "desc_nulls_first" | "desc_nulls_last" | null;
                name: "asc" | "asc_nulls_first" | "asc_nulls_last" | "desc" | "desc_nulls_first" | "desc_nulls_last" | null;
                rocket: "asc" | "asc_nulls_first" | "asc_nulls_last" | "desc" | "desc_nulls_first" | "desc_nulls_last" | null;
                timestamp: "asc" | "asc_nulls_first" | "asc_nulls_last" | "desc" | "desc_nulls_first" | "desc_nulls_last" | null;
                twitter: "asc" | "asc_nulls_first" | "asc_nulls_last" | "desc" | "desc_nulls_first" | "desc_nulls_last" | null;
            }[];
            where?: {
                _and: (any | null)[] | null;
                _not: any | null;
                _or: (any | null)[] | null;
                id: {
                    _eq: string | null;
                    _gt: string | null;
                    _gte: string | null;
                    _in: string[] | null;
                    _is_null: boolean | null;
                    _lt: string | null;
                    _lte: string | null;
                    _neq: string | null;
                    _nin: string[] | null;
                } | null;
                name: {
                    _eq: string | null;
                    _gt: string | null;
                    _gte: string | null;
                    _ilike: string | null;
                    _in: string[] | null;
                    _is_null: boolean | null;
                    _like: string | null;
                    _lt: string | null;
                    _lte: string | null;
                    _neq: string | null;
                    _nilike: string | null;
                    _nin: string[] | null;
                    _nlike: string | null;
                    _nsimilar: string | null;
                    _similar: string | null;
                } | null;
                rocket: {
                    _eq: string | null;
                    _gt: string | null;
                    _gte: string | null;
                    _ilike: string | null;
                    _in: string[] | null;
                    _is_null: boolean | null;
                    _like: string | null;
                    _lt: string | null;
                    _lte: string | null;
                    _neq: string | null;
                    _nilike: string | null;
                    _nin: string[] | null;
                    _nlike: string | null;
                    _nsimilar: string | null;
                    _similar: string | null;
                } | null;
                timestamp: {
                    _eq: string | null;
                    _gt: string | null;
                    _gte: string | null;
                    _in: string[] | null;
                    _is_null: boolean | null;
                    _lt: string | null;
                    _lte: string | null;
                    _neq: string | null;
                    _nin: string[] | null;
                } | null;
                twitter: {
                    _eq: string | null;
                    _gt: string | null;
                    _gte: string | null;
                    _ilike: string | null;
                    _in: string[] | null;
                    _is_null: boolean | null;
                    _like: string | null;
                    _lt: string | null;
                    _lte: string | null;
                    _neq: string | null;
                    _nilike: string | null;
                    _nin: string[] | null;
                    _nlike: string | null;
                    _nsimilar: string | null;
                    _similar: string | null;
                } | null;
            } | undefined;
        }) => {
            id: string;
            name: string | null;
            rocket: string | null;
            timestamp: string;
            twitter: string | null;
        }[];
        users_aggregate: (p: {
            distinct_on: ("name" | "id" | "rocket" | "twitter" | "timestamp" | "column")[];
            limit?: number | undefined;
            offset?: number | undefined;
            order_by: {
                id: "asc" | "asc_nulls_first" | "asc_nulls_last" | "desc" | "desc_nulls_first" | "desc_nulls_last" | null;
                name: "asc" | "asc_nulls_first" | "asc_nulls_last" | "desc" | "desc_nulls_first" | "desc_nulls_last" | null;
                rocket: "asc" | "asc_nulls_first" | "asc_nulls_last" | "desc" | "desc_nulls_first" | "desc_nulls_last" | null;
                timestamp: "asc" | "asc_nulls_first" | "asc_nulls_last" | "desc" | "desc_nulls_first" | "desc_nulls_last" | null;
                twitter: "asc" | "asc_nulls_first" | "asc_nulls_last" | "desc" | "desc_nulls_first" | "desc_nulls_last" | null;
            }[];
            where?: {
                _and: (any | null)[] | null;
                _not: any | null;
                _or: (any | null)[] | null;
                id: {
                    _eq: string | null;
                    _gt: string | null;
                    _gte: string | null;
                    _in: string[] | null;
                    _is_null: boolean | null;
                    _lt: string | null;
                    _lte: string | null;
                    _neq: string | null;
                    _nin: string[] | null;
                } | null;
                name: {
                    _eq: string | null;
                    _gt: string | null;
                    _gte: string | null;
                    _ilike: string | null;
                    _in: string[] | null;
                    _is_null: boolean | null;
                    _like: string | null;
                    _lt: string | null;
                    _lte: string | null;
                    _neq: string | null;
                    _nilike: string | null;
                    _nin: string[] | null;
                    _nlike: string | null;
                    _nsimilar: string | null;
                    _similar: string | null;
                } | null;
                rocket: {
                    _eq: string | null;
                    _gt: string | null;
                    _gte: string | null;
                    _ilike: string | null;
                    _in: string[] | null;
                    _is_null: boolean | null;
                    _like: string | null;
                    _lt: string | null;
                    _lte: string | null;
                    _neq: string | null;
                    _nilike: string | null;
                    _nin: string[] | null;
                    _nlike: string | null;
                    _nsimilar: string | null;
                    _similar: string | null;
                } | null;
                timestamp: {
                    _eq: string | null;
                    _gt: string | null;
                    _gte: string | null;
                    _in: string[] | null;
                    _is_null: boolean | null;
                    _lt: string | null;
                    _lte: string | null;
                    _neq: string | null;
                    _nin: string[] | null;
                } | null;
                twitter: {
                    _eq: string | null;
                    _gt: string | null;
                    _gte: string | null;
                    _ilike: string | null;
                    _in: string[] | null;
                    _is_null: boolean | null;
                    _like: string | null;
                    _lt: string | null;
                    _lte: string | null;
                    _neq: string | null;
                    _nilike: string | null;
                    _nin: string[] | null;
                    _nlike: string | null;
                    _nsimilar: string | null;
                    _similar: string | null;
                } | null;
            } | undefined;
        }) => {
            aggregate: {
                count: (p: {
                    columns: ("name" | "id" | "rocket" | "twitter" | "timestamp" | "column")[];
                    distinct?: boolean | undefined;
                }) => number | null;
                max: {
                    name: string | null;
                    rocket: string | null;
                    timestamp: string | null;
                    twitter: string | null;
                } | null;
                min: {
                    name: string | null;
                    rocket: string | null;
                    timestamp: string | null;
                    twitter: string | null;
                } | null;
            } | null;
            nodes: {
                id: string;
                name: string | null;
                rocket: string | null;
                timestamp: string;
                twitter: string | null;
            }[];
        };
        users_by_pk: (p: {
            id: string;
        }) => {
            id: string;
            name: string | null;
            rocket: string | null;
            timestamp: string;
            twitter: string | null;
        } | null;
    };
    Volume: {
        cubic_feet: number | null;
        cubic_meters: number | null;
    };
    conflict_action: "ignore" | "update";
    order_by: "asc" | "asc_nulls_first" | "asc_nulls_last" | "desc" | "desc_nulls_first" | "desc_nulls_last";
    timestamptz_comparison_exp: {
        _eq: string | null;
        _gt: string | null;
        _gte: string | null;
        _in: string[] | null;
        _is_null: boolean | null;
        _lt: string | null;
        _lte: string | null;
        _neq: string | null;
        _nin: string[] | null;
    };
    users: {
        id: string;
        name: string | null;
        rocket: string | null;
        timestamp: string;
        twitter: string | null;
    };
    users_aggregate: {
        aggregate: {
            count: (p: {
                columns: ("name" | "id" | "rocket" | "twitter" | "timestamp" | "column")[];
                distinct?: boolean | undefined;
            }) => number | null;
            max: {
                name: string | null;
                rocket: string | null;
                timestamp: string | null;
                twitter: string | null;
            } | null;
            min: {
                name: string | null;
                rocket: string | null;
                timestamp: string | null;
                twitter: string | null;
            } | null;
        } | null;
        nodes: {
            id: string;
            name: string | null;
            rocket: string | null;
            timestamp: string;
            twitter: string | null;
        }[];
    };
    users_aggregate_fields: {
        count: (p: {
            columns: ("name" | "id" | "rocket" | "twitter" | "timestamp" | "column")[];
            distinct?: boolean | undefined;
        }) => number | null;
        max: {
            name: string | null;
            rocket: string | null;
            timestamp: string | null;
            twitter: string | null;
        } | null;
        min: {
            name: string | null;
            rocket: string | null;
            timestamp: string | null;
            twitter: string | null;
        } | null;
    };
    users_aggregate_order_by: {
        count: "asc" | "asc_nulls_first" | "asc_nulls_last" | "desc" | "desc_nulls_first" | "desc_nulls_last" | null;
        max: {
            name: "asc" | "asc_nulls_first" | "asc_nulls_last" | "desc" | "desc_nulls_first" | "desc_nulls_last" | null;
            rocket: "asc" | "asc_nulls_first" | "asc_nulls_last" | "desc" | "desc_nulls_first" | "desc_nulls_last" | null;
            timestamp: "asc" | "asc_nulls_first" | "asc_nulls_last" | "desc" | "desc_nulls_first" | "desc_nulls_last" | null;
            twitter: "asc" | "asc_nulls_first" | "asc_nulls_last" | "desc" | "desc_nulls_first" | "desc_nulls_last" | null;
        } | null;
        min: {
            name: "asc" | "asc_nulls_first" | "asc_nulls_last" | "desc" | "desc_nulls_first" | "desc_nulls_last" | null;
            rocket: "asc" | "asc_nulls_first" | "asc_nulls_last" | "desc" | "desc_nulls_first" | "desc_nulls_last" | null;
            timestamp: "asc" | "asc_nulls_first" | "asc_nulls_last" | "desc" | "desc_nulls_first" | "desc_nulls_last" | null;
            twitter: "asc" | "asc_nulls_first" | "asc_nulls_last" | "desc" | "desc_nulls_first" | "desc_nulls_last" | null;
        } | null;
    };
    users_arr_rel_insert_input: {
        data: {
            id: string | null;
            name: string | null;
            rocket: string | null;
            timestamp: string | null;
            twitter: string | null;
        }[];
        on_conflict: {
            constraint: "key" | "constraint" | "unique" | "or" | "primary" | "users_pkey";
            update_columns: ("name" | "id" | "rocket" | "twitter" | "timestamp" | "column")[];
        } | null;
    };
    users_bool_exp: {
        _and: (any | null)[] | null;
        _not: any | null;
        _or: (any | null)[] | null;
        id: {
            _eq: string | null;
            _gt: string | null;
            _gte: string | null;
            _in: string[] | null;
            _is_null: boolean | null;
            _lt: string | null;
            _lte: string | null;
            _neq: string | null;
            _nin: string[] | null;
        } | null;
        name: {
            _eq: string | null;
            _gt: string | null;
            _gte: string | null;
            _ilike: string | null;
            _in: string[] | null;
            _is_null: boolean | null;
            _like: string | null;
            _lt: string | null;
            _lte: string | null;
            _neq: string | null;
            _nilike: string | null;
            _nin: string[] | null;
            _nlike: string | null;
            _nsimilar: string | null;
            _similar: string | null;
        } | null;
        rocket: {
            _eq: string | null;
            _gt: string | null;
            _gte: string | null;
            _ilike: string | null;
            _in: string[] | null;
            _is_null: boolean | null;
            _like: string | null;
            _lt: string | null;
            _lte: string | null;
            _neq: string | null;
            _nilike: string | null;
            _nin: string[] | null;
            _nlike: string | null;
            _nsimilar: string | null;
            _similar: string | null;
        } | null;
        timestamp: {
            _eq: string | null;
            _gt: string | null;
            _gte: string | null;
            _in: string[] | null;
            _is_null: boolean | null;
            _lt: string | null;
            _lte: string | null;
            _neq: string | null;
            _nin: string[] | null;
        } | null;
        twitter: {
            _eq: string | null;
            _gt: string | null;
            _gte: string | null;
            _ilike: string | null;
            _in: string[] | null;
            _is_null: boolean | null;
            _like: string | null;
            _lt: string | null;
            _lte: string | null;
            _neq: string | null;
            _nilike: string | null;
            _nin: string[] | null;
            _nlike: string | null;
            _nsimilar: string | null;
            _similar: string | null;
        } | null;
    };
    users_constraint: "key" | "constraint" | "unique" | "or" | "primary" | "users_pkey";
    users_insert_input: {
        id: string | null;
        name: string | null;
        rocket: string | null;
        timestamp: string | null;
        twitter: string | null;
    };
    users_max_fields: {
        name: string | null;
        rocket: string | null;
        timestamp: string | null;
        twitter: string | null;
    };
    users_max_order_by: {
        name: "asc" | "asc_nulls_first" | "asc_nulls_last" | "desc" | "desc_nulls_first" | "desc_nulls_last" | null;
        rocket: "asc" | "asc_nulls_first" | "asc_nulls_last" | "desc" | "desc_nulls_first" | "desc_nulls_last" | null;
        timestamp: "asc" | "asc_nulls_first" | "asc_nulls_last" | "desc" | "desc_nulls_first" | "desc_nulls_last" | null;
        twitter: "asc" | "asc_nulls_first" | "asc_nulls_last" | "desc" | "desc_nulls_first" | "desc_nulls_last" | null;
    };
    users_min_fields: {
        name: string | null;
        rocket: string | null;
        timestamp: string | null;
        twitter: string | null;
    };
    users_min_order_by: {
        name: "asc" | "asc_nulls_first" | "asc_nulls_last" | "desc" | "desc_nulls_first" | "desc_nulls_last" | null;
        rocket: "asc" | "asc_nulls_first" | "asc_nulls_last" | "desc" | "desc_nulls_first" | "desc_nulls_last" | null;
        timestamp: "asc" | "asc_nulls_first" | "asc_nulls_last" | "desc" | "desc_nulls_first" | "desc_nulls_last" | null;
        twitter: "asc" | "asc_nulls_first" | "asc_nulls_last" | "desc" | "desc_nulls_first" | "desc_nulls_last" | null;
    };
    users_mutation_response: {
        affected_rows: number;
        returning: {
            id: string;
            name: string | null;
            rocket: string | null;
            timestamp: string;
            twitter: string | null;
        }[];
    };
    users_obj_rel_insert_input: {
        data: {
            id: string | null;
            name: string | null;
            rocket: string | null;
            timestamp: string | null;
            twitter: string | null;
        };
        on_conflict: {
            constraint: "key" | "constraint" | "unique" | "or" | "primary" | "users_pkey";
            update_columns: ("name" | "id" | "rocket" | "twitter" | "timestamp" | "column")[];
        } | null;
    };
    users_on_conflict: {
        constraint: "key" | "constraint" | "unique" | "or" | "primary" | "users_pkey";
        update_columns: ("name" | "id" | "rocket" | "twitter" | "timestamp" | "column")[];
    };
    users_order_by: {
        id: "asc" | "asc_nulls_first" | "asc_nulls_last" | "desc" | "desc_nulls_first" | "desc_nulls_last" | null;
        name: "asc" | "asc_nulls_first" | "asc_nulls_last" | "desc" | "desc_nulls_first" | "desc_nulls_last" | null;
        rocket: "asc" | "asc_nulls_first" | "asc_nulls_last" | "desc" | "desc_nulls_first" | "desc_nulls_last" | null;
        timestamp: "asc" | "asc_nulls_first" | "asc_nulls_last" | "desc" | "desc_nulls_first" | "desc_nulls_last" | null;
        twitter: "asc" | "asc_nulls_first" | "asc_nulls_last" | "desc" | "desc_nulls_first" | "desc_nulls_last" | null;
    };
    users_select_column: "name" | "id" | "rocket" | "twitter" | "timestamp" | "column";
    users_set_input: {
        id: string | null;
        name: string | null;
        rocket: string | null;
        timestamp: string | null;
        twitter: string | null;
    };
    users_update_column: "name" | "id" | "rocket" | "twitter" | "timestamp" | "column";
    uuid_comparison_exp: {
        _eq: string | null;
        _gt: string | null;
        _gte: string | null;
        _in: string[] | null;
        _is_null: boolean | null;
        _lt: string | null;
        _lte: string | null;
        _neq: string | null;
        _nin: string[] | null;
    };
    link__Purpose: "SECURITY" | "EXECUTION";
    _Service: {
        sdl: string | null;
    };
    Fragment: {};
    Date: Date;
    ObjectID: string;
    timestamptz: string;
    uuid: string;
    link__Import: string;
    federation__FieldSet: string;
    _Any: unknown;
}>;
export type Klein = typeof mobius.klein;
export {};
